import { getContactInfo } from '../server/FooterData';
import Footer from './Footer';

export default async function FooterWrapper() {
  const result = await getContactInfo();
  // Explicitly handle all possible cases to satisfy TypeScript
  const contactInfo = result.success && result.data ? result.data : null;

  return <Footer contactInfo={contactInfo} />;
}