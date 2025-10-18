# WebCrawler 

A web-based application that scrapes and filters news from [Hacker News](https://news.ycombinator.com/), built with Node.js, Express, and TypeScript.

**Deployed Application:** [WebCrawler by Alejandra Colcha](https://dacolcha.github.io/web-crawler/) *(wait for 10 seconds on your first request)*

**Docker Image:** `docker pull dacolcha/web-crawler-api:latest`

This web crawler extracts the first 30 entries from Hacker News and provides:

- Scrapes entry number, title, points, and number of comments
-**Filtering:**
  - Filter entries with **more than 5 words** in the title (sorting by comments)
  - Filter entries with **5 or fewer words** in the title (sorting by points)

## 🛠️ Stack
- **Backend**: Node.js, Express.js, TypeScript
- **Web Scraping**: Axios, Cheerio
- **Testing**: Jest, ts-jest
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Code Quality**: SonarCloud

## 📦 Installation & Usage

### Using Docker
#### Pull and run the Docker image:

```bash
docker pull dacolcha/web-crawler-api:latest
docker run -p 3000:3000 dacolcha/web-crawler-api:latest
```

Then open your browser at `http://localhost:3000`

#### Or build from source:

```bash
# Clone the repository
git clone https://github.com/DaColcha/web-crawler.git
cd web-crawler

# Build the Docker image
docker build -t web-crawler .

# Run the container
docker run -p 3000:3000 web-crawler
```

### Local Development

#### Prerequisites
- Node.js 22.x or higher
- npm or yarn

#### Setup

```bash
# Clone the repository
git clone https://github.com/DaColcha/web-crawler.git
cd web-crawler

# Install dependencies
npm install
# or
yarn install

# Build the TypeScript code
npm run build
# or
yarn build

# Start the server
npm start
# or
yarn start
```

Open your browser at `http://localhost:3000`

## 🧪 Running Tests

```bash
# Run all tests
npm test
# or
yarn test
```
