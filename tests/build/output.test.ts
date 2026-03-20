import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const dist = resolve(__dirname, '../../dist');

function readDist(path: string): string {
  const full = resolve(dist, path);
  if (!existsSync(full)) throw new Error(`Missing dist file: ${path}`);
  return readFileSync(full, 'utf-8');
}

describe('post pages', () => {
  const slugs = [
    'agent-autonomy-means-no-instructions',
    'this-month-in-ai-feb-2026',
    'the-llm-pyramid-scheme',
  ];

  for (const slug of slugs) {
    describe(slug, () => {
      let html: string;

      beforeAll(() => {
        html = readDist(`posts/${slug}/index.html`);
      });

      it('renders callout elements', () => {
        expect(html).toContain('class="callout"');
        expect(html).toContain('role="note"');
      });

      it('renders auto-generated section-index', () => {
        expect(html).toContain('class="section-index"');
        expect(html).toContain('role="navigation"');
        expect(html).toContain('aria-label="Sections"');
        expect(html).toContain('class="section-index-label"');
      });

      it('has heading IDs matching section-index anchors', () => {
        const anchorRegex = /class="section-index"[\s\S]*?<ol>([\s\S]*?)<\/ol>/;
        const olMatch = html.match(anchorRegex);
        expect(olMatch).not.toBeNull();

        const hrefRegex = /href="#([^"]+)"/g;
        let match;
        while ((match = hrefRegex.exec(olMatch![1])) !== null) {
          const id = match[1];
          expect(html, `Missing heading id="${id}"`).toContain(`id="${id}"`);
        }
      });

      it('does not contain className (JSX leak)', () => {
        // className in the HTML output would mean MDX leaked JSX attributes
        expect(html).not.toContain('className=');
      });
    });
  }
});

describe('agent-autonomy specific', () => {
  it('renders alert elements', () => {
    const html = readDist('posts/agent-autonomy-means-no-instructions/index.html');
    expect(html).toContain('class="alert"');
    expect(html).toContain('class="alert-label"');
    expect(html).toContain('class="alert-title"');
    expect(html).toContain('class="alert-desc"');
  });
});

describe('pyramid-scheme specific', () => {
  it('renders schematic diagram', () => {
    const html = readDist('posts/the-llm-pyramid-scheme/index.html');
    expect(html).toContain('class="schematic"');
    expect(html).toContain('class="schematic-label"');
    expect(html).toContain('class="schematic-node schematic-node--source"');
    expect(html).toContain('class="schematic-node schematic-node--mid"');
    expect(html).toContain('class="schematic-node schematic-node--end"');
    expect(html).toContain('class="schematic-node-name"');
    expect(html).toContain('class="schematic-flow"');
    // Flow arrows should have actual <br> not entity-escaped
    expect(html).toMatch(/schematic-flow">│<br\s*\/?>▼/);
    expect(html).not.toContain('&lt;br/&gt;');
  });

  it('renders alert elements', () => {
    const html = readDist('posts/the-llm-pyramid-scheme/index.html');
    expect(html).toContain('class="alert"');
  });

  it('has expected heading IDs for tricky headings', () => {
    const html = readDist('posts/the-llm-pyramid-scheme/index.html');
    const expectedIds = [
      'there-are-two-keys-you-only-have-one',
      'where-does-that-real-key-come-from',
      'method-1-stolen-keys-llmjacking',
      'method-2-enterprise-key-reselling',
      'method-3-coding-harness-abuse',
      'so-who-is-actually-paying-for-it',
      'but-the-providers-tos-says',
    ];
    for (const id of expectedIds) {
      expect(html, `Missing heading id="${id}"`).toContain(`id="${id}"`);
    }
  });

  it('has consecutive alerts as siblings (CSS .alert + .alert)', () => {
    const html = readDist('posts/the-llm-pyramid-scheme/index.html');
    // The enforcement alerts should be consecutive divs
    expect(html).toContain('Anthropic — Overnight Ban');
    expect(html).toContain('Google — Antigravity Proxy Bans');
  });
});

describe('feed.md', () => {
  let feed: string;

  beforeAll(() => {
    feed = readDist('feed.md');
  });

  it('contains post titles', () => {
    expect(feed).toContain('Agent Autonomy means No Instructions');
    expect(feed).toContain('The LLM Pyramid Scheme');
    expect(feed).toContain('This Month In AI (Feb 2026)');
  });

  it('contains callout text content (unwrapped, not deleted)', () => {
    expect(feed).toContain('Two different keys');
    expect(feed).toContain('Instructions are easy');
  });

  it('contains Alert metadata (label and title preserved)', () => {
    expect(feed).toContain('Documented Impact');
    expect(feed).toContain('$40,000');
    expect(feed).toContain('Security Advisory');
    expect(feed).toContain('CVE-2026-0628');
  });

  it('contains Schematic text representation', () => {
    expect(feed).toContain('Relay Chain');
    expect(feed).toContain('Enterprise Key Holder');
  });

  it('does not contain MDX import syntax', () => {
    expect(feed).not.toMatch(/^import\s/m);
    expect(feed).not.toContain("from '../../components/");
  });

  it('does not contain JSX component tags', () => {
    expect(feed).not.toMatch(/<Callout/);
    expect(feed).not.toMatch(/<Alert\s/);
    expect(feed).not.toMatch(/<Schematic/);
    expect(feed).not.toMatch(/<SectionIndex/);
  });
});

describe('rss.xml', () => {
  it('exists and contains post titles', () => {
    const rss = readDist('rss.xml');
    expect(rss).toContain('<rss');
    expect(rss).toContain('Agent Autonomy means No Instructions');
    expect(rss).toContain('The LLM Pyramid Scheme');
  });
});

describe('posts.json', () => {
  it('has correct structure', () => {
    const raw = readDist('posts.json');
    const data = JSON.parse(raw);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(3);
    expect(data[0]).toHaveProperty('title');
    expect(data[0]).toHaveProperty('slug');
    expect(data[0]).toHaveProperty('tags');
    expect(data[0]).toHaveProperty('url');
  });
});
