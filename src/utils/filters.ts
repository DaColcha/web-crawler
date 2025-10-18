import type HackerNewsItem  from '../types/index.js';

function countWords(text: string): number {
    const words = text.match(/\b[0-9A-Za-z]+(?:['-.][0-9A-Za-z]+)*\b/g);
    return words ? words.length : 0;
}

function wordsLessThan(items: HackerNewsItem[], limit: number): HackerNewsItem[] {
    return items.filter(item => countWords(item.title) <= limit);
}

function wordsMoreThan(items: HackerNewsItem[], limit: number): HackerNewsItem[] {
    return items.filter(item => countWords(item.title) > limit);
}

export { wordsLessThan, wordsMoreThan, countWords };

