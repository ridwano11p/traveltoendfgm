import { db } from "@/lib/firebase/config";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { TeamMember } from './types';
import WhoWeAreClient from './WhoWeAreClient';
import { Metadata } from 'next';

// Update the Props interface to include all required Next.js page props
type Props = {
  params: { [key: string]: string | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const metadata: Metadata = {
  title: 'Who We Are | Travel to End FGM',
  description: 'Meet our dedicated team working to end FGM through education and advocacy.',
};

async function getTeamMembers(searchTerm?: string) {
  try {
    let firestoreQuery;

    if (searchTerm) {
      const normalizedSearchTerm = searchTerm.toLowerCase();
      firestoreQuery = query(
        collection(db, 'team_members'),
        where('name', '>=', normalizedSearchTerm),
        where('name', '<=', normalizedSearchTerm + '\uf8ff')
      );
    } else {
      firestoreQuery = query(
        collection(db, 'team_members'),
        orderBy('createdAt', 'desc')
      );
    }

    const querySnapshot = await getDocs(firestoreQuery);
    let members = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.()?.toISOString(),
      updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString(),
    })) as TeamMember[];

    if (searchTerm) {
      const normalizedSearchTerm = searchTerm.toLowerCase().trim();
      members = members.filter(member =>
        member.name.toLowerCase().includes(normalizedSearchTerm)
      );
    }

    return members;
  } catch (error) {
    console.error("Error fetching team members:", error);
    throw new Error("Failed to fetch team members");
  }
}

export default async function WhoWeArePage({ searchParams }: Props) {
  const searchQuery = typeof searchParams.q === 'string' ? searchParams.q : undefined;
  const teamMembers = await getTeamMembers(searchQuery);
  return <WhoWeAreClient teamMembers={teamMembers} />;
}
