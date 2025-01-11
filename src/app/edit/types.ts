// Component Props Types
export interface EditOptionProps {
  title: string;
  description: string;
  link: string;
  disabled?: boolean;
}

// Content Existence Types
export interface ContentExistence {
  'What We Do'?: boolean;
  'Banner'?: boolean;
  [key: string]: boolean | undefined;
}

// Edit Dashboard Types
export interface EditDashboardProps {
  contentExists: ContentExistence;
  isDark: boolean;
}

// Edit Options Data Type
export interface EditOptionData {
  title: string;
  description: string;
  link: string;
  checkKey?: keyof ContentExistence;
}

// Component Props with Theme
export interface ThemedComponentProps {
  isDark: boolean;
}