import { db } from "@/lib/firebase/config";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import SearchResultsClient from "./SearchResultsClient";
import { SearchResult, SearchType, TeamMemberSearchResult } from "../types";

interface Props {
  params: { query: string };
  searchParams: { type?: SearchType };
}

type SearchableItem = SearchResult & {
  name?: string;
  title?: string;
};

function isTeamMember(item: SearchResult): item is TeamMemberSearchResult {
  return item.type === 'team_members';
}

async function getSearchResults(searchTerm: string, searchType: SearchType = 'all') {
  try {
    let collections = ['blogs', 'featureStories', 'photos', 'videos', 'pdfs', 'team_members'];
    if (searchType !== 'all') {
      collections = [searchType];
    }

    const normalizedSearchTerm = decodeURIComponent(searchTerm)
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .trim();

    let allResults: SearchResult[] = [];

    for (const collectionName of collections) {
      const q = query(
        collection(db, collectionName),
        orderBy(collectionName === 'team_members' ? 'name' : 'title'),
        limit(50)
      );

      const querySnapshot = await getDocs(q);
      const collectionResults = querySnapshot.docs.map(doc => ({
        id: doc.id,
        type: collectionName as SearchType,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString(),
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString()
      }));

      allResults = [...allResults, ...collectionResults] as SearchResult[];
    }

    // Filter results based on search term
    allResults = allResults.filter(item => {
      const searchField = isTeamMember(item) ? item.name : (item as SearchableItem).title || '';
      const normalizedField = searchField.toLowerCase().replace(/\s+/g, ' ').trim();
      return normalizedField.includes(normalizedSearchTerm);
    });

    // Sort results by relevance
    allResults.sort((a, b) => {
      const aField = isTeamMember(a) ? a.name : (a as SearchableItem).title || '';
      const bField = isTeamMember(b) ? b.name : (b as SearchableItem).title || '';
      const aFieldNormalized = aField.toLowerCase().replace(/\s+/g, ' ').trim();
      const bFieldNormalized = bField.toLowerCase().replace(/\s+/g, ' ').trim();
      const aStartsWith = aFieldNormalized.startsWith(normalizedSearchTerm);
      const bStartsWith = bFieldNormalized.startsWith(normalizedSearchTerm);
      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;
      return 0;
    });

    return allResults;
  } catch (error) {
    console.error("Error searching:", error);
    throw new Error("Failed to fetch search results");
  }
}

export default async function SearchResultsPage({ params, searchParams }: Props) {
  const decodedQuery = decodeURIComponent(params.query);
  const results = await getSearchResults(decodedQuery, searchParams.type);

  return (
    <SearchResultsClient
      results={results}
      searchTerm={decodedQuery}
    />
  );
}
