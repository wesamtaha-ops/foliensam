// YouTube API service using PHP backend to avoid CORS and API key exposure
const PHP_YOUTUBE_URL = 'https://files.foliensam.de/youtube.php';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration?: string;
  isShort?: boolean;
}

// Removed YouTubeApiResponse interface - now handled by PHP backend

export const fetchChannelShorts = async (
  maxResults: number = 50,
  pageToken?: string
): Promise<{ videos: YouTubeVideo[]; nextPageToken?: string }> => {
  // Build URL with query parameters
  const params = new URLSearchParams({
    maxResults: maxResults.toString(),
  });
  
  if (pageToken) {
    params.append('pageToken', pageToken);
  }

  const apiUrl = `${PHP_YOUTUBE_URL}?${params.toString()}`;

  console.log('🔗 Fetching from PHP backend:', apiUrl);

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      console.error('❌ PHP backend error:', errorData);
      throw new Error(errorData.error || `Request failed with status ${response.status}`);
    }

    const result = await response.json();
    console.log('📊 PHP backend response:', result);
    
    if (!result.success) {
      console.warn('⚠️ Request was not successful');
      return { videos: [], nextPageToken: undefined };
    }
    
    const { videos, nextPageToken: newPageToken } = result.data;
    
    if (!videos || videos.length === 0) {
      console.warn('⚠️ No videos returned from PHP backend');
      return { videos: [], nextPageToken: undefined };
    }

    console.log(`🎬 Processed ${videos.length} videos from PHP backend`);

    return {
      videos,
      nextPageToken: newPageToken
    };
  } catch (error) {
    console.error('❌ Error fetching YouTube videos via PHP backend:', error);
    throw error;
  }
};

// Alternative method: Fetch multiple pages to get more shorts
export const fetchAllChannelShorts = async (): Promise<YouTubeVideo[]> => {
  let allVideos: YouTubeVideo[] = [];
  let pageToken: string | undefined;
  let pageCount = 0;
  const maxPages = 2; // Reduced from 5 to 2 to save quota (200 units instead of 500)

  try {
    while (pageCount < maxPages) {
      const { videos, nextPageToken } = await fetchChannelShorts(25, pageToken); // Reduced from 50 to 25
      allVideos = [...allVideos, ...videos];
      
      if (!nextPageToken) break;
      
      pageToken = nextPageToken;
      pageCount++;
      
      // Small delay to respect API rate limits
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return allVideos;
  } catch (error) {
    console.error('❌ Error fetching all shorts:', error);
    throw error;
  }
};

export const getVideoThumbnail = (videoId: string, quality: 'maxres' | 'high' | 'medium' = 'maxres') => {
  const qualities = {
    maxres: 'maxresdefault.jpg',
    high: 'hqdefault.jpg',
    medium: 'mqdefault.jpg'
  };
  
  return `https://i3.ytimg.com/vi/${videoId}/${qualities[quality]}`;
};
