import axios from 'axios';
import { jest, describe, it, expect } from '@jest/globals';
import { getSite, scrapeNews } from '../src/utils/scraper.ts';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getSite', () => {

    it('should throw an error when fetch fails', async () => {
        const mockError = new Error('Network error');
        mockedAxios.get.mockRejectedValue(mockError);

        await expect(getSite('https://example.com')).rejects.toThrow(
            'Error fetching the URL: https://example.com. Error: Network error'
        );
    });
});

describe('scrapeNews', () => {
    const exampleHtml = `
        <table>
            <tr class="athing" id="1">
                <td><span class="rank">1.</span></td>
                <td class="title">
                    <span class="titleline">
                        <a href="https://example.com">Test HackerNews</a>
                    </span>
                </td>
            </tr>
            <tr>
                <td colspan="2"></td>
                <td>
                    <span class="score">150 points</span>
                    <a href="#">75 comments</a>
                </td>
            </tr>
            <tr class="athing" id="2">
                <td><span class="rank">2.</span></td>
                <td class="title">
                    <span class="titleline">
                        <a href="https://example.com">Test 2 HackerNews</a>
                    </span>
                </td>
            </tr>
            <tr>
                <td colspan="2"></td>
                <td>
                    <span class="score">200 points</span>
                    <a href="#">4&nbsp;comments</a>
                </td>
            </tr>
        </table>
    `;

    it('should scrape Hacker News items correctly', () => {
        const result = scrapeNews(exampleHtml);

        expect(result).toHaveLength(2);
        expect(result[0]).toEqual({
            rank: 1,
            title: 'Test HackerNews',
            points: 150,
            comments: 75
        });
        expect(result[1]).toEqual({
            rank: 2,
            title: 'Test 2 HackerNews',
            points: 200,
            comments: 4
        });
    });

    it('should return an empty array when no news items are found', () => {
        const mockHtml = '<html><body><p>No news here</p></body></html>';

        const result = scrapeNews(mockHtml);

        expect(result).toEqual([]);
        expect(result).toHaveLength(0);
    });

    it('should handle missing points and comments gracefully', () => {
        const mockHtml = `
            <table>
                <tr class="athing" id="1">
                    <td><span class="rank">1.</span></td>
                    <td class="title">
                        <span class="titleline">
                            <a href="https://example.com">Test HackerNews</a>
                        </span>
                    </td>
                </tr>
                <tr>
                    <td colspan="2"></td>
                    <td>
                        <span class="score">rate</span>
                        <a href="#">discuss</a>
                    </td>
                </tr>
            </table>
        `;

        const result = scrapeNews(mockHtml);

        expect(result).toHaveLength(1);
        expect(result[0]).toEqual({
            rank: 1,
            title: 'Test HackerNews',
            points: 0,
            comments: 0
        });
    });
});
