## Issues
- [ ] With audio + vido combined YT sends max qualit as 360p
- [ ] For format higher then 360p 720, 4k YT sends video and audio seperately 
- [x] Time start and end 




## Product info
-> Audio download working
-> Audio only => direct, less then 360p -> direct else use ffmpeg
-> FROM FE i will get the quality like:     
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
-> FFMPEG is working fine.

# Product Price Tracker


For web scraping or monitoring applications, you'll likely want to implement:

Retry logic with exponential backoff
Request throttling to avoid rate limits
Error handling to gracefully manage different types of failures
Logging to track failure patterns
Proxy rotation for high-volume applications

# Product Tracker - YouTube Video Service

A Node.js application that provides YouTube video downloading and streaming capabilities with both direct streaming and FFmpeg-based conversion options.

## Features

- 📹 **Download YouTube Videos** - Save videos to local storage
- 🎬 **Stream Videos Directly** - Stream without FFmpeg conversion
- 🔄 **Stream with FFmpeg** - Convert and stream with consistent format
- 📊 **Video Information** - Get metadata without downloading
- 🎯 **Quality Selection** - Choose video quality for streaming/downloading
- 🔗 **RESTful API** - Easy-to-use HTTP endpoints

## Prerequisites

### Required Dependencies
```bash
npm install ytdl-core fluent-ffmpeg fs
```

### System Requirements
- **Node.js** v14+ 
- **FFmpeg** (for conversion-based streaming)

#### Install FFmpeg on Linux:
```bash
sudo apt update
sudo apt install ffmpeg
```

#### Verify FFmpeg Installation:
```bash
ffmpeg -version
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd product-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Install FFmpeg (if using conversion streaming):
```bash
sudo apt install ffmpeg
```

## API Endpoints

### Stream/Download Video
```
GET /api/download?url=<youtube_url>&method=<method>&quality=<quality>
```

**Parameters:**
- `url` (required): YouTube video URL
- `method` (optional): 
  - `direct` - Direct streaming without conversion
  - `ffmpeg` - Stream with FFmpeg conversion (default)
- `quality` (optional): Video quality (`highest`, `lowest`, `720p`, `480p`, etc.)

**Examples:**
```bash
# Direct streaming (faster, original format)
curl "http://localhost:3000/api/download?url=https://www.youtube.com/watch?v=jNQXAC9IVRw&method=direct"

# FFmpeg streaming (standardized MP4 output)
curl "http://localhost:3000/api/download?url=https://www.youtube.com/watch?v=jNQXAC9IVRw&method=ffmpeg&quality=720p"

# Default streaming (uses FFmpeg)
curl "http://localhost:3000/api/download?url=https://www.youtube.com/watch?v=jNQXAC9IVRw"
```

## Service Functions

### 1. `downloadYouTubeVideo(url, outputPath)`
Downloads and saves video to local storage.

```javascript
import { downloadYouTubeVideo } from './services/download-item-service.js';

const outputPath = await downloadYouTubeVideo(
  'https://www.youtube.com/watch?v=jNQXAC9IVRw',
  './downloads'
);
console.log(`Video saved to: ${outputPath}`);
```

### 2. `streamYouTubeVideo(url, res, quality)`
Streams video with FFmpeg conversion for consistent format.

**Features:**
- ✅ Consistent MP4 output with H.264/AAC
- ✅ Better browser compatibility
- ✅ Standardized quality
- ❌ Higher CPU usage
- ❌ Conversion overhead

### 3. `streamYouTubeVideoDirect(url, res, quality)`
Streams video directly without conversion.

**Features:**
- ✅ Faster streaming
- ✅ Lower CPU usage
- ✅ Original quality preserved
- ❌ Inconsistent formats (WebM, MP4, etc.)
- ❌ May lack audio in high-quality streams

### 4. `getYouTubeVideoInfo(url)`
Retrieves video metadata without downloading.

```javascript
import { getYouTubeVideoInfo } from './services/download-item-service.js';

const info = await getYouTubeVideoInfo('https://www.youtube.com/watch?v=jNQXAC9IVRw');
console.log(info);
// Output:
// {
//   title: "Video Title",
//   description: "Video description...",
//   duration: "180",
//   thumbnail: "https://...",
//   author: "Channel Name",
//   viewCount: "1000000",
//   uploadDate: "2023-01-01"
// }
```

## Usage Examples

### Express Route Implementation
```javascript
import express from 'express';
import { streamYouTubeVideo, streamYouTubeVideoDirect } from './services/download-item-service.js';

const app = express();

app.get('/stream', async (req, res) => {
  try {
    const { url, method, quality } = req.query;
    
    if (!url) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }

    if (method === 'direct') {
      await streamYouTubeVideoDirect(url, res, quality);
    } else {
      await streamYouTubeVideo(url, res, quality);
    }
  } catch (error) {
    console.error('Streaming error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to stream video' });
    }
  }
});
```

### Frontend Integration
```html
<!-- Direct video streaming -->
<video controls width="800">
  <source src="/api/download?url=https://www.youtube.com/watch?v=jNQXAC9IVRw&method=direct" type="video/mp4">
  Your browser does not support the video tag.
</video>

<!-- Download link -->
<a href="/api/download?url=https://www.youtube.com/watch?v=jNQXAC9IVRw&method=ffmpeg" download>
  Download Video
</a>
```

### JavaScript Fetch Example
```javascript
// Stream video info
const response = await fetch('/api/download?url=https://www.youtube.com/watch?v=jNQXAC9IVRw&method=direct');
const videoBlob = await response.blob();
const videoUrl = URL.createObjectURL(videoBlob);

// Set video source
document.getElementById('video-player').src = videoUrl;
```

## Streaming Methods Comparison

| Feature | Direct Streaming | FFmpeg Streaming |
|---------|------------------|------------------|
| **Speed** | ⚡ Fast | 🐢 Slower |
| **CPU Usage** | 💚 Low | 🟡 High |
| **Quality** | 📹 Original | 🔄 Re-encoded |
| **Format** | 🎲 Variable | 📱 Consistent MP4 |
| **Browser Support** | 🎯 Limited | ✅ Universal |
| **Audio** | ⚠️ May be missing | ✅ Always included |
| **Use Case** | Quick preview | Production use |

## Error Handling

The service includes comprehensive error handling:

```javascript
try {
  await streamYouTubeVideo(url, res, quality);
} catch (error) {
  console.error('Streaming failed:', error.message);
  // Possible errors:
  // - Invalid YouTube URL
  // - Video not available
  // - Network connectivity issues
  // - FFmpeg conversion errors
  // - Insufficient disk space (for downloads)
}
```

## Common Issues & Solutions

### 1. FFmpeg Not Found
```bash
Error: Cannot find ffmpeg
```
**Solution:** Install FFmpeg system-wide
```bash
sudo apt install ffmpeg
```

### 2. "Could not extract functions" Error
**Cause:** Outdated `ytdl-core` version
**Solution:** Update dependencies
```bash
npm update ytdl-core
```

### 3. Video Stream Errors
**Cause:** YouTube format changes or restricted videos
**Solution:** Try different quality settings or use direct streaming

### 4. High CPU Usage
**Cause:** FFmpeg conversion for large videos
**Solution:** Use direct streaming or implement video quality limits

## Configuration

### Quality Options
- `highest` - Best available quality
- `lowest` - Lowest available quality  
- `720p`, `480p`, `360p` - Specific resolutions
- `highestaudio` - Audio only
- `highestvideo` - Video only

### Output Options (FFmpeg)
```javascript
.outputOptions([
  '-movflags frag_keyframe+empty_moov', // Enable streaming
  '-f mp4',                             // Force MP4 format
  '-preset fast',                       // Encoding speed
  '-crf 23'                            // Quality level (18-28)
])
```

## Performance Tips

1. **Use Direct Streaming** for faster response times
2. **Implement Caching** for frequently accessed videos
3. **Add Rate Limiting** to prevent abuse
4. **Monitor CPU Usage** when using FFmpeg
5. **Set Quality Limits** to control bandwidth usage

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Check the error logs for detailed error messages
- Ensure FFmpeg is properly installed
- Verify YouTube URL validity
- Check network connectivity

---

**Note:** This service is for educational purposes. Ensure you comply with YouTube's Terms of Service and applicable laws when downloading or streaming content.