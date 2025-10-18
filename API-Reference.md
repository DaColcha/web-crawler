
## 🔧 API Endpoints

### Scrape Hacker News
```http
POST /api/crawl
Content-Type: application/json

{
  "url": "https://news.ycombinator.com/"
}
```

**Response**: Array of news items with rank, title, points, and comments

### Filter by Word Count (Less Than or Equal)
```http
POST /api/filter/less-than
Content-Type: application/json

{
  "news": [...],
  "numWords": 5
}
```

**Response**: Filtered array sorted by points (ascending)

### Filter by Word Count (More Than)
```http
POST /api/filter/more-than
Content-Type: application/json

{
  "news": [...],
  "numWords": 5
}
```

**Response**: Filtered array sorted by comments (ascending)
