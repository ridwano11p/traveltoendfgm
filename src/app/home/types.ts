import { Timestamp } from "firebase/firestore";

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  isYouTubeVideo?: boolean;
  tags: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface FeatureStory {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  isYouTubeVideo?: boolean;
  tags: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface FirestoreData {
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  isYouTubeVideo?: boolean;
  tags: string[];
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

export interface HomeClientProps {
  initialData: {
    blogs: BlogPost[];
    featureStory: FeatureStory | null;
  };
}
