import { metadata } from './metadata';

// Server Component to handle metadata
export { metadata };

// Template component to handle any server-side concerns
export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}