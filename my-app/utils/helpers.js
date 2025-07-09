// Helper function to parse time strings to seconds
function parseTimeToSeconds(timeStr) {
  if (typeof timeStr === 'number') {
    return timeStr;
  }

  if (typeof timeStr === 'string') {
    // Handle formats like "1m30s", "90s", "1:30", "90"

    const decodedTime = decodeURIComponent(timeStr);

    const colonRegex = /^(\d+):(\d+)(?::(\d+))?$/;
    const timeRegex = /(?:(\d+)h)?(?:(\d+)m)?(?:(\d+(?:\.\d+)?)s?)?$/;

    // Try colon format first (1:30 or 1:30:45)
    const colonMatch = decodedTime.match(colonRegex);
    if (colonMatch) {
      const hours = parseInt(colonMatch[1]) || 0;
      const minutes = parseInt(colonMatch[2]) || 0;
      const seconds = parseInt(colonMatch[3]) || 0;

      if (!colonMatch[3] && hours < 60) {
        // Format is likely M:SS (minutes:seconds)
        return hours * 60 + minutes;
      }
      return hours * 3600 + minutes * 60 + seconds;
    }

    // Try standard format (1h30m45s)
    const match = decodedTime.match(timeRegex);
    if (match) {
      const hours = parseInt(match[1]) || 0;
      const minutes = parseInt(match[2]) || 0;
      const seconds = parseInt(match[3]) || 0;
      return hours * 3600 + minutes * 60 + seconds;
    }

    // Try as plain number
    const num = parseInt(timeStr);
    if (!isNaN(num)) {
      return num;
    }
  }

  return 0;
}

function fixFileName(filename, maxLength = 100) {
  return filename
    .replace(/[<>:"/\\|?*]/g, '')
    .replace(/\s+/g, '_')
    .substring(0, maxLength);
}

function getQualityLevel(quality) {
  const qualityMap = {
    'lowest': 1,
    'low': 2,
    '144p': 1,
    '240p': 2,
    '360p': 3,
    '480p': 4,
    'medium': 4,
    '720p': 5,
    'high': 5,
    '1080p': 6,
    '1440p': 7,
    '2160p': 8,
    '4320p': 9,
    'highest': 10
  };

  return qualityMap[quality] || 5; // Default to 720p level
}

export {
  parseTimeToSeconds,
  fixFileName,
  getQualityLevel
};