import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import HomeContent from '@/components/shared/HomeContent';
import { getBannerContent } from '@/components/server/BannerData';

// Helper function to serialize Firestore data
function serializeData(doc: any) {
  const data = doc.data();
  return {
    id: doc.id,
    ...Object.entries(data).reduce((acc: any, [key, value]) => {
      // Convert Timestamp to ISO string
      if (value && typeof value === 'object' && 'toDate' in value) {
        acc[key] = value.toDate().toISOString();
      } 
      // Handle arrays (like tags)
      else if (Array.isArray(value)) {
        acc[key] = [...value];
      }
      // Handle regular objects
      else if (value && typeof value === 'object') {
        acc[key] = { ...value };
      }
      // Handle primitive values
      else {
        acc[key] = value;
      }
      return acc;
    }, {}),
  };
}

async function getHomePageData() {
  try {
    // Fetch latest blogs
    const blogsQuery = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'), limit(5));
    const blogsSnapshot = await getDocs(blogsQuery);
    const blogs = blogsSnapshot.docs.map(doc => serializeData(doc));

    // Fetch feature story
    const featureQuery = query(collection(db, 'featureStories'), orderBy('createdAt', 'desc'), limit(1));
    const featureSnapshot = await getDocs(featureQuery);
    let featureStory = null;
    if (!featureSnapshot.empty) {
      featureStory = serializeData(featureSnapshot.docs[0]);
    }

    // Get banner content
    const bannerResult = await getBannerContent();
    const bannerContent = bannerResult.success ? 
      (bannerResult.data ? serializeData({ id: 'banner', data: () => bannerResult.data }) : null) 
      : null;

    return {
      success: true,
      data: {
        latestBlogs: blogs,
        featureStory,
        bannerContent: bannerContent ? bannerContent : null
      }
    };
  } catch (error) {
    console.error('Error fetching home page data:', error);
    return {
      success: false,
      error: 'Failed to load home page data'
    };
  }
}

export default async function HomePage() {
  const result = await getHomePageData();

  if (!result.success) {
    return <HomeContent 
      latestBlogs={[]}
      featureStory={null}
      bannerContent={null}
      error={result.error}
    />;
  }

  const { latestBlogs, featureStory, bannerContent } = result.data;

  return (
    <HomeContent
      latestBlogs={latestBlogs}
      featureStory={featureStory}
      bannerContent={bannerContent}
    />
  );
}