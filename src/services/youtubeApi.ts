const YOUTUBE_API_KEY = 'AIzaSyD_CSCL18alWYzaYgiL9IJn-TAQ1UaVK9I';
const CHANNEL_ID = 'UCSe_xvuLLefPse0WqiBuOAw';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration?: string;
  isShort?: boolean;
}

export interface YouTubeApiResponse {
  items: Array<{
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
      description: string;
      thumbnails: {
        maxres?: { url: string };
        high?: { url: string };
        medium?: { url: string };
      };
      publishedAt: string;
    };
  }>;
  nextPageToken?: string;
}

export const fetchChannelShorts = async (
  maxResults: number = 50,
  pageToken?: string
): Promise<{ videos: YouTubeVideo[]; nextPageToken?: string }> => {
  if (!YOUTUBE_API_KEY) {
    throw new Error('YouTube API key not found. Please set VITE_YOUTUBE_API_KEY in your environment variables.');
  }

  const apiUrl = `https://www.googleapis.com/youtube/v3/search?` +
    `key=${YOUTUBE_API_KEY}&` +
    `channelId=${CHANNEL_ID}&` +
    `part=snippet,id&` +
    `order=date&` +
    `maxResults=${maxResults}&` +
    `type=video&` +
    `${pageToken ? `pageToken=${pageToken}` : ''}`;

  console.log('🔗 API URL:', apiUrl);
  console.log('🔑 Using API Key:', YOUTUBE_API_KEY.substring(0, 10) + '...');
  console.log('📺 Channel ID:', CHANNEL_ID);

  try {
    // First, get all videos from the channel
    const response = await fetch(apiUrl);

    console.log('📡 Response status:', response.status);
    console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API Response error text:', errorText);
      throw new Error(`YouTube API error: ${response.status} - ${errorText}`);
    }

    const data: YouTubeApiResponse = await response.json();
    console.log('📊 API Response data:', data);
    
    if (!data.items || data.items.length === 0) {
      console.warn('⚠️ No items returned from API');
      return { videos: [], nextPageToken: undefined };
    }
    
    // Filter for shorts (videos with duration < 60 seconds)
    // Note: YouTube doesn't have a direct "shorts" filter, so we'll get all videos
    // and you can identify shorts by their aspect ratio or duration
    const videos: YouTubeVideo[] = data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.maxres?.url || 
                 item.snippet.thumbnails.high?.url || 
                 item.snippet.thumbnails.medium?.url || '',
      publishedAt: item.snippet.publishedAt,
      isShort: true // Assuming most recent videos are shorts
    }));

    console.log('🎬 Processed videos:', videos);

    return {
      videos,
      nextPageToken: data.nextPageToken
    };
  } catch (error) {
    console.error('❌ Error fetching YouTube shorts:', error);
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
