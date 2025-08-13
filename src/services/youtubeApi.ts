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

  try {
    // First, get all videos from the channel
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?` +
      `key=${YOUTUBE_API_KEY}&` +
      `channelId=${CHANNEL_ID}&` +
      `part=snippet,id&` +
      `order=date&` +
      `maxResults=${maxResults}&` +
      `type=video&` +
      `${pageToken ? `pageToken=${pageToken}` : ''}`
    );

    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data: YouTubeApiResponse = await response.json();
    
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

    return {
      videos,
      nextPageToken: data.nextPageToken
    };
  } catch (error) {
    console.error('Error fetching YouTube shorts:', error);
    throw error;
  }
};

// Alternative method: Fetch multiple pages to get more shorts
export const fetchAllChannelShorts = async (): Promise<YouTubeVideo[]> => {
  let allVideos: YouTubeVideo[] = [];
  let pageToken: string | undefined;
  let pageCount = 0;
  const maxPages = 5; // Limit to prevent excessive API calls

  try {
    while (pageCount < maxPages) {
      const { videos, nextPageToken } = await fetchChannelShorts(50, pageToken);
      allVideos = [...allVideos, ...videos];
      
      if (!nextPageToken) break;
      
      pageToken = nextPageToken;
      pageCount++;
      
      // Small delay to respect API rate limits
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return allVideos;
  } catch (error) {
    console.error('Error fetching all shorts:', error);
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
