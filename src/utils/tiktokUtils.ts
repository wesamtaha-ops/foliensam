export const extractTikTokUsername = (input: string): string => {
  const trimmed = input.trim();

  if (!trimmed) return '';

  const urlMatch = trimmed.match(/tiktok\.com\/@([^/?]+)/i);
  if (urlMatch) {
    return urlMatch[1];
  }

  return trimmed.replace(/^@/, '');
};
