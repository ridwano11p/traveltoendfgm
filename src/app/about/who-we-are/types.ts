export interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
    linkedin?: string;
    facebook?: string;
    youtube?: string;
    twitter?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface SocialMediaButtonProps {
    icon: React.ReactNode;
    link?: string;
    isDark: boolean;
  }
  
  export interface TeamMemberModalProps {
    member: TeamMember;
    isDark: boolean;
    onClose: () => void;
  }
  
  export interface TeamMemberCardProps {
    member: TeamMember;
    isDark: boolean;
    onOpenModal: (member: TeamMember) => void;
  }
  
  export interface TeamMembersResponse {
    success: boolean;
    data?: TeamMember[];
    error?: string;
  }
  