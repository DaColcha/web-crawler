import { getSite, scrapeNews } from "./utils/scraper.ts";

const url = 'https://news.ycombinator.com/';
const news = scrapeNews(await getSite(url));

console.log(news);
