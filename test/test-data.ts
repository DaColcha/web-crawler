import HackerNewsItem  from '../src/types/index.ts';

export interface TestItem {
    object: HackerNewsItem;
    assert: number;
}

const testData: TestItem[] =[
  {
    object: { rank: 1, title: "Apple M5 chip", points: 964, comments: 1051 },
    assert: 3
  },
  {
    object: { rank: 2, title: "Claude Haiku 4.5", points: 448, comments: 183 },
    assert: 3
  },
  {
    object: { rank: 3, title: "I'm recomming my customers switch to Linux rather that Upgrade to Windows 11", points: 83, comments: 53 },
    assert: 13
  },
  {
    object: { rank: 4, title: "IRS open sources its fact graph", points: 157, comments: 45 },
    assert: 6
  },
  {
    object: { rank: 5, title: "Next Steps: Caddy Project Maintainership", points: 109, comments: 25 },
    assert: 5
  },
  {
    object: { rank: 6, title: "Writing an LLM from scratch, part 22 – training our LLM", points: 68, comments: 0 },
    assert: 10
  },
  {
    object: { rank: 7, title: "Gerald Sussman - An Electrical Engineering View of a Mechanical Watch (2003)", points: 47, comments: 10 },
    assert: 11
  },
  {
    object: { rank: 8, title: "I almost got hacked by a 'job interview'", points: 740, comments: 392 },
    assert: 8
  },
  {
    object: { rank: 9, title: "ImapGoose new version", points: 33, comments: 6 },
    assert: 3
  },
  {
    object: { rank: 10, title: "Zed is now available on Windows", points: 192, comments: 67 },
    assert: 6
  }
]

export default { testData };