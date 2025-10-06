const express = require('express');
const axios = require('axios');
const router = express.Router();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

router.get('/search', async (req, res) => {
  const query = req.query.query;

  try {
    const response = await axios.get(
      'https://www.googleapis.com/youtube/v3/search',
      {
        params: {
          part: 'snippet',
          maxResults: 15,
          q: query,
          key: YOUTUBE_API_KEY,
          type: 'video',
          videoDuration: 'long'
        },
      }
    );

    const videos = response.data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default.url,
    }));

    res.json({ videos });
  } catch (error) {
  console.error('YouTube API error:', error.response?.data || error.message);
  res.status(500).json({ error: 'Failed to fetch videos from YouTube API' });
}
});

module.exports = router;