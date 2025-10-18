import express from "express";
import { getSite, scrapeNews } from "../utils/scraper.js";
import { wordsLessThan, wordsMoreThan} from "../utils/filters.js";
import { CrawlWebsiteDto, FilterByWordsDto } from "../dto/crawler.dto.js";

export const crawlWebsite = async (req: express.Request<CrawlWebsiteDto>, res: express.Response) => {
    try {
        const { url } = req.body;
        const news = scrapeNews(await getSite(url));

        res.status(200).json(news);
    } catch (error) {
        res.status(500).json(
            { message: 'Error crawling the website', error: (error as Error).message }
        );
    }
}

export const filterByLessThanWords = (req: express.Request<FilterByWordsDto>, res: express.Response) => {
    try {
        const { news, numWords } = req.body;
        const filteredNews = wordsLessThan(news, numWords!);

        res.status(200).json(filteredNews);
    } catch (error) {
        res.status(500).json(
            { message: 'Error filtering news by word count', error: (error as Error).message }
        );
    }
}

export const filterByMoreThanWords = (req: express.Request<FilterByWordsDto>, res: express.Response) => {
    try {
        const { news, numWords } = req.body;
        const filteredNews = wordsMoreThan(news, numWords!);

        res.status(200).json(filteredNews);
    } catch (error) {
        res.status(500).json(
            { message: 'Error filtering news by word count', error: (error as Error).message }
        );
    }
}
