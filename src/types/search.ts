export interface BaseSearchResult {
  id: string;
  type: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TeamMemberResult extends BaseSearchResult {
  type: 'team_members';
  name: string;
  role?: string;
  bio?: string;
  imageUrl?: string;
  linkedin?: string;
  facebook?: string;
  youtube?: string;
  twitter?: string;
}

export interface ContentResult extends BaseSearchResult {
  title: string;
  description?: string;
  content?: string;
  author?: string;
  date?: string;
  imageUrl?: string;
  videoUrl?: string;
  isYouTube?: boolean;
  pdfUrl?: string;
  photoUrl?: string;
  tags?: string[];
}

export type SearchResult = TeamMemberResult | ContentResult;
