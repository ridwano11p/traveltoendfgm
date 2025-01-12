import { db } from "@/lib/firebase/config";
import { collection, getDocs, query, where, DocumentData } from "firebase/firestore";
import WhoWeAreClient from "./WhoWeAreClient";
import { TeamMember } from "./TeamMemberModal";
import { useSearchParams } from 'next/navigation'; // Importing useSearchParams hook

interface FirestoreTeamMember extends DocumentData {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  linkedin?: string;
  facebook?: string;
  youtube?: string;
  twitter?: string;
  createdAt?: { seconds: number; nanoseconds: number };
  updatedAt?: { seconds: number; nanoseconds: number };
}

// Fetch team members with optional search term
async function getTeamMembers(searchTerm?: string | null) {
  try {
    let q;
    if (searchTerm) {
      q = query(
        collection(db, 'team_members'),
        where('name', '>=', searchTerm.toLowerCase()),
        where('name', '<=', searchTerm.toLowerCase() + '\uf8ff')
      );
    } else {
      q = collection(db, 'team_members');
    }

    const querySnapshot = await getDocs(q);
    let members = querySnapshot.docs.map(doc => {
      const data = doc.data() as FirestoreTeamMember;

      // Convert Firestore timestamps to ISO strings
      const createdAt = data.createdAt
        ? new Date(data.createdAt.seconds * 1000).toISOString()
        : undefined;

      const updatedAt = data.updatedAt
        ? new Date(data.updatedAt.seconds * 1000).toISOString()
        : undefined;

      // Create a new object with serializable data
      return {
        id: doc.id,
        name: data.name,
        role: data.role,
        bio: data.bio,
        imageUrl: data.imageUrl,
        linkedin: data.linkedin,
        facebook: data.facebook,
        youtube: data.youtube,
        twitter: data.twitter,
        createdAt,
        updatedAt
      };
    });

    if (searchTerm) {
      const normalizedSearchTerm = searchTerm.toLowerCase().replace(/\s+/g, ' ').trim();
      members = members.filter(member =>
        member.name.toLowerCase().replace(/\s+/g, ' ').trim().includes(normalizedSearchTerm)
      );
    }

    return members as TeamMember[];
  } catch (error) {
    console.error("Error fetching team members:", error);
    throw new Error("Failed to fetch team members");
  }
}

// The main page component
export default async function WhoWeArePage() {
  const searchParams = useSearchParams(); // Using the hook to extract query params
  const searchQuery = searchParams.get('q'); // Extract the `q` parameter from the URL

  // Fetch team members based on the search query
  const members = await getTeamMembers(searchQuery);

  return <WhoWeAreClient teamMembers={members} />;
}
