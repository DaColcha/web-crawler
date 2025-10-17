import axios from 'axios';
import { load } from 'cheerio';
import type HackerNewsItem from '../types/index.ts';

async function getSite(url: string): Promise<string> {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching the URL: ${url}. ${error}`);
    }
}

function scrapeNews(html: string): HackerNewsItem[] {
    const HackerNews: HackerNewsItem[] = [];

    const $ = load(html);

    $('tr.athing').each((index, element) => {
        const rank = $(element).find('span.rank').text().replace('.', '').trim();
        const title = $(element).find('span.titleline > a').text();
        const points = $(element).next().find('span.score').text().replace(' points', '').trim();
        const comments = $(element).next().find('a').last().text().replace('comments', '').trim();

        HackerNews.push({ 
            rank: +rank, 
            title: title, 
            points: Number.isNaN(+points) ? 0 : +points, 
            comments:  Number.isNaN(+comments) ? 0 : +comments });
    });

    return HackerNews;
}

export { getSite, scrapeNews };