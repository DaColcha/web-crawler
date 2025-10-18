import type HackerNewsItem from "../types/index.js";

export interface CrawlWebsiteDto {
    url: string;
}

export interface FilterByWordsDto {
    news: Array<HackerNewsItem>;
    numWords?: number;
}
