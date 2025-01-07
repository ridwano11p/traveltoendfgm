// Search Types
export type SearchType = 'all' | 'blogs' | 'featureStories' | 'photos' | 'videos' | 'pdfs' | 'team_members';

export interface SearchFormData {
  searchTerm: string;
  searchType: SearchType;
}

export interface SearchProps {
  searchTerm?: string;
  searchType?: SearchType;
}

// Base Content Types
export interface BaseContent {
  id: string;
  createdAt?: string;
  updatedAt?: string;
}

// Content Types
export interface Blog extends BaseContent {
  title: string;
  content: string;
  author: string;
  date: string;
  imageUrl?: string;
  videoUrl?: string;
  isYouTubeVideo?: boolean;
  tags?: string[];
}

export interface Video extends BaseContent {
  title: string;
  description: string;
  videoUrl: string;
  isYouTube: boolean;
  youtubeId?: string;
}

export interface Photo extends BaseContent {
  title: string;
  description: string;
  photoUrl: string;
}

export interface PDF extends BaseContent {
  title: string;
  description: string;
  pdfUrl: string;
}

export interface TeamMember extends BaseContent {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  linkedin?: string;
  facebook?: string;
  youtube?: string;
  twitter?: string;
}

// Search Result Types
export type SearchResultBase = {
  id: string;
  type: SearchType;
  title?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type BlogSearchResult = SearchResultBase & Blog;
export type VideoSearchResult = SearchResultBase & Video;
export type PhotoSearchResult = SearchResultBase & Photo;
export type PDFSearchResult = SearchResultBase & PDF;
export type TeamMemberSearchResult = SearchResultBase & TeamMember;

export type SearchResult =
  | BlogSearchResult
  | VideoSearchResult
  | PhotoSearchResult
  | PDFSearchResult
  | TeamMemberSearchResult;

// Component Props Types
export interface BlogCardProps {
  blog: Blog;
  isDark: boolean;
  onTagClick: (tag: string) => void;
}

export interface VideoCardProps {
  video: Video;
  isDark: boolean;
}

export interface PhotoCardProps {
  photo: Photo;
  isDark: boolean;
  onClick: (photo: Photo) => void;
}

export interface PDFCardProps {
  pdf: PDF;
  isDark: boolean;
}

export interface TeamMemberCardProps {
  member: TeamMember;
  isDark: boolean;
  onOpenModal: (member: TeamMember) => void;
}

export interface PhotoModalProps {
  photo: Photo;
  isDark: boolean;
  onClose: () => void;
}

export interface TeamMemberModalProps {
  member: TeamMember;
  isDark: boolean;
  onClose: () => void;
}

export interface MediaContentProps {
  imageUrl?: string;
  videoUrl?: string;
  isYouTubeVideo?: boolean;
  title: string;
}

export interface SocialMediaButtonProps {
  icon: React.ReactNode;
  link: string;
  isDark: boolean;
}

// Search Results Props
export interface SearchResultsProps {
  results: SearchResult[];
  searchTerm: string;
  error?: string;
}
