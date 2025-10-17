import { describe, expect, test } from '@jest/globals';
import { countWords, wordsLessThan, wordsMoreThan } from '../src/utils/filters.ts';
import data, { TestItem } from './test-data.ts';

describe('countWords', () => {
    test.each(data.testData)('title: "$object.title" should have $assert words', ({ object, assert }: TestItem) => {
        expect(countWords(object.title)).toBe(assert);
    });
});

describe('wordsLessThan', () => {
    test('should return items with titles having less than or equal to 5 words', () => {
        const result = wordsLessThan(data.testData.map(item => item.object), 5);
        const expected = [
            { rank: 1, title: "Apple M5 chip", points: 964, comments: 1051 },
            { rank: 2, title: "Claude Haiku 4.5", points: 448, comments: 183 },
            { rank: 5, title: "Next Steps: Caddy Project Maintainership", points: 109, comments: 25 },
            { rank: 9, title: "ImapGoose new version", points: 33, comments: 6 }
        ];
        expect(result).toEqual(expected);
    });
});

describe('wordsMoreThan', () => {
    test('should return items with titles having more than 5 words', () => {
        const result = wordsMoreThan(data.testData.map(item => item.object), 5);
        const expected = [
            { rank: 3, title: "I'm recomming my customers switch to Linux rather that Upgrade to Windows 11", points: 83, comments: 53 },
            { rank: 4, title: "IRS open sources its fact graph", points: 157, comments: 45 },
            { rank: 6, title: "Writing an LLM from scratch, part 22 – training our LLM", points: 68, comments: 0 },
            { rank: 7, title: "Gerald Sussman - An Electrical Engineering View of a Mechanical Watch (2003)", points: 47, comments: 10 },
            { rank: 8, title: "I almost got hacked by a 'job interview'", points: 740, comments: 392 },
            { rank: 10, title: "Zed is now available on Windows", points: 192, comments: 67 }
        ];
        expect(result).toEqual(expected);
    });
});

