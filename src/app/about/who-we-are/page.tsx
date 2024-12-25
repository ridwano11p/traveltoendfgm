import { Metadata } from "next";
import { collection, query, where, getDocs, orderBy, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import WhoWeAreClient from "./WhoWeAreClient";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  linkedin?: string;
  facebook?: string;
  youtube?: string;
  twitter?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface FirestoreTeamMember extends Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'> {
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const convertTimestampToString = (timestamp: Timestamp | undefined): string => {
  if (!timestamp) return "";
  return timestamp.toDate().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  // Properly handle searchParams in Next.js 14
  const searchQuery = searchParams?.q ?? undefined;
  const searchTerm = typeof searchQuery === 'string' ? searchQuery : undefined;

  try {
    const snapshot = await getDocs(collection(db, "team_members"));
    const totalMembers = snapshot.size;

    const title = searchTerm
      ? `Search Results for "${searchTerm}" | Who We Are`
      : "Who We Are | Travel to End FGM";

    const description = searchTerm
      ? `Search results for team members matching "${searchTerm}"`
      : `Meet our team of ${totalMembers} dedicated members working to end FGM.`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Who We Are | Travel to End FGM",
      description: "Meet our dedicated team working to end FGM.",
    };
  }
}

async function getTeamMembers(searchTerm?: string): Promise<TeamMember[]> {
  try {
    let q;
    if (searchTerm) {
      // Create a normalized version of the search term for comparison
      const normalizedSearchTerm = searchTerm.toLowerCase().trim();
      
      // Query with a range to allow for partial matches
      q = query(
        collection(db, "team_members"),
        where("name", ">=", normalizedSearchTerm),
        where("name", "<=", normalizedSearchTerm + "\uf8ff"),
        orderBy("name")
      );
    } else {
      q = query(collection(db, "team_members"), orderBy("name"));
    }

    const querySnapshot = await getDocs(q);
    let members = querySnapshot.docs.map(doc => {
      const data = doc.data() as FirestoreTeamMember;
      // Construct the member object without spreading to avoid id duplication
      const member: TeamMember = {
        id: doc.id,
        name: data.name,
        role: data.role,
        bio: data.bio,
        imageUrl: data.imageUrl,
        linkedin: data.linkedin,
        facebook: data.facebook,
        youtube: data.youtube,
        twitter: data.twitter,
        createdAt: data.createdAt ? convertTimestampToString(data.createdAt) : undefined,
        updatedAt: data.updatedAt ? convertTimestampToString(data.updatedAt) : undefined,
      };
      return member;
    });

    if (searchTerm) {
      // Additional filtering for more flexible matching
      const normalizedSearchTerm = searchTerm.toLowerCase().replace(/\s+/g, " ").trim();
      members = members.filter(member => 
        member.name.toLowerCase().replace(/\s+/g, " ").trim().includes(normalizedSearchTerm)
      );
    }

    return members;
  } catch (error) {
    console.error("Error fetching team members:", error);
    throw new Error("Failed to fetch team members");
  }
}

export default async function WhoWeArePage({ searchParams }: PageProps) {
  // Properly handle searchParams in Next.js 14
  const searchQuery = searchParams?.q ?? undefined;
  const searchTerm = typeof searchQuery === 'string' ? searchQuery : undefined;
  
  const teamMembers = await getTeamMembers(searchTerm);

  return <WhoWeAreClient teamMembers={teamMembers} />;
}