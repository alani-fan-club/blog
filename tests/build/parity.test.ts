import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const dist = resolve(__dirname, '../../dist');

function readDist(path: string): string {
  const full = resolve(dist, path);
  if (!existsSync(full)) throw new Error(`Missing dist file: ${path}`);
  return readFileSync(full, 'utf-8');
}

function countMatches(html: string, pattern: RegExp): number {
  return (html.match(pattern) || []).length;
}

describe('content preservation', () => {
  describe('pyramid-scheme post', () => {
    let html: string;

    beforeAll(() => {
      html = readDist('posts/the-llm-pyramid-scheme/index.html');
    });

    it('preserves paragraph text verbatim', () => {
      expect(html).toContain('Third-party AI providers are not AI companies');
      expect(html).toContain('There is no alternative');
      expect(html).toContain('LLM infrastructure is expensive');
    });

    it('preserves external links with correct URLs', () => {
      expect(html).toContain('href="https://sysdig.com/blog/llmjacking-stolen-cloud-credentials-used-in-new-ai-attack/"');
      expect(html).toContain('href="https://blogs.microsoft.com/on-the-issues/2025/02/27/disrupting-cybercrime-abusing-gen-ai/"');
      expect(html).toContain('href="https://www.justice.gov/jm/jm-9-48000-computer-fraud"');
    });

    it('preserves alert content text', () => {
      expect(html).toContain('A single proxy on stolen credentials');
      expect(html).toContain('Blocked third-party tools and banned accounts');
      expect(html).toContain('Banned accounts connected to reverse proxies');
    });

    it('preserves schematic node names and metadata', () => {
      expect(html).toContain('Anthropic / Google / OpenAI');
      expect(html).toContain('Enterprise Key Holder');
      expect(html).toContain('negotiated rate, lower cost');
      expect(html).toContain('Third-Party Proxy');
      expect(html).toContain('sells access, takes margin');
      expect(html).toContain('paying most per token, knowing least');
    });

    it('preserves callout content', () => {
      expect(html).toContain('Two different keys');
      expect(html).toContain('Three places. None of them legitimate.');
      expect(html).toContain('None of that matters.');
    });

    it('preserves ordered list structure', () => {
      expect(html).toContain('<ol>');
      expect(html).toContain('You send your prompt to the proxy');
      expect(html).toContain('The proxy forwards it to the real provider');
      expect(html).toContain('The response comes back through the proxy');
    });
  });

  describe('agent-autonomy post', () => {
    let html: string;

    beforeAll(() => {
      html = readDist('posts/agent-autonomy-means-no-instructions/index.html');
    });

    it('preserves all 13 principle headings', () => {
      for (let i = 1; i <= 13; i++) {
        expect(html, `Missing principle ${i} heading`).toContain(`id="${i}-`);
      }
    });

    it('preserves principle quote formatting', () => {
      expect(html).toContain('<em>');
      expect(html).toContain('First, do no harm');
      expect(html).toContain('Do it. Don');
    });

    it('preserves alert content', () => {
      expect(html).toContain('Agent-Ready');
      expect(html).toContain('The Thirteen Principles');
    });
  });
});

describe('no extra wrapper elements', () => {
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

      it('has exactly one section-index', () => {
        expect(countMatches(html, /class="section-index"/g)).toBe(1);
      });

      it('callouts have no extra wrapper divs', () => {
        // Each callout should be: <div class="callout" role="note"> <p>...</p> </div>
        // No <div class="callout"><div>...</div></div> double nesting
        const calloutBlocks = html.match(/<div class="callout"[^>]*>[\s\S]*?<\/div>/g) || [];
        for (const block of calloutBlocks) {
          // The direct child should be <p> or inline content, not another <div>
          const inner = block.replace(/<div class="callout"[^>]*>\s*/, '').replace(/<\/div>$/, '');
          expect(inner, 'Callout has unexpected nested div').not.toMatch(/^<div(?!\s+class="callout")/);
        }
      });

      it('has no astro-island hydration markers', () => {
        expect(html).not.toContain('astro-island');
        expect(html).not.toContain('client:');
      });
    });
  }
});

describe('navigation and structure', () => {
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

      it('has back link to index', () => {
        expect(html).toContain('href="/"');
        expect(html).toContain('Return to Index');
      });

      it('has nav links', () => {
        expect(html).toContain('href="/projects"');
        expect(html).toContain('href="/tags"');
        expect(html).toContain('href="/rss.xml"');
        expect(html).toContain('href="/feed.md"');
      });

      it('has skip-to-content link', () => {
        expect(html).toContain('class="skip-to-content"');
        expect(html).toContain('href="#main-content"');
      });

      it('has post metadata', () => {
        expect(html).toContain('class="post-date"');
        expect(html).toContain('class="post-title"');
        expect(html).toContain('class="post-tags"');
      });

      it('has footer', () => {
        expect(html).toContain('class="site-footer"');
        expect(html).toContain('ALANI FAN CLUB');
      });

      it('has command palette', () => {
        expect(html).toContain('id="command-palette"');
        expect(html).toContain('id="command-input"');
      });
    });
  }
});

describe('index page', () => {
  let html: string;

  beforeAll(() => {
    html = readDist('index.html');
  });

  it('lists all 3 posts', () => {
    expect(html).toContain('Agent Autonomy means No Instructions');
    expect(html).toContain('The LLM Pyramid Scheme');
    expect(html).toContain('This Month In AI');
  });

  it('has post excerpts', () => {
    expect(html).toContain('class="post-excerpt"');
  });

  it('has tag links on post entries', () => {
    expect(html).toContain('class="tag"');
  });

  it('links to feed.md for agents', () => {
    expect(html).toContain('/feed.md');
  });
});

describe('tag pages', () => {
  it('tag index lists all tags', () => {
    const html = readDist('tags/index.html');
    expect(html).toContain('llmjacking');
    expect(html).toContain('agents');
    expect(html).toContain('security');
  });

  it('individual tag page links to correct post', () => {
    const html = readDist('tags/llmjacking/index.html');
    expect(html).toContain('The LLM Pyramid Scheme');
    expect(html).toContain('href="/posts/the-llm-pyramid-scheme/"');
  });
});

describe('no unnecessary complexity', () => {
  it('single site CSS file (excluding Google Fonts)', () => {
    const html = readDist('index.html');
    const localCss = (html.match(/href="\/_astro\/[^"]+\.css"/g) || []).length;
    expect(localCss).toBe(1);
  });

  it('single JS file', () => {
    const html = readDist('index.html');
    const scripts = (html.match(/type="module" src/g) || []).length;
    expect(scripts).toBe(1);
  });

  it('no framework runtime hydration', () => {
    const html = readDist('index.html');
    expect(html).not.toContain('astro-island');
    expect(html).not.toContain('__astro_component');
    expect(html).not.toContain('client:load');
    expect(html).not.toContain('client:idle');
  });

  it('404 page exists', () => {
    const html = readDist('404.html');
    expect(html).toContain('Signal Lost');
  });
});

describe('feed.md quality', () => {
  let feed: string;

  beforeAll(() => {
    feed = readDist('feed.md');
  });

  it('has no remark-stringify escaping artifacts', () => {
    expect(feed).not.toContain('\\*\\*');
    expect(feed).not.toContain('\\*');
    expect(feed).not.toContain('&#x20;');
    expect(feed).not.toContain('\\[');
    expect(feed).not.toContain('\\]');
  });

  it('has no raw HTML component tags', () => {
    expect(feed).not.toMatch(/<Callout/);
    expect(feed).not.toMatch(/<\/Callout>/);
    expect(feed).not.toMatch(/<Alert[\s>]/);
    expect(feed).not.toMatch(/<\/Alert>/);
    expect(feed).not.toMatch(/<Schematic/);
    expect(feed).not.toMatch(/<SectionIndex/);
  });

  it('renders Schematic as a code block', () => {
    expect(feed).toContain('```\nRelay Chain');
    expect(feed).toContain('Enterprise Key Holder');
    expect(feed).toContain('Third-Party Proxy');
  });

  it('renders Alert headers as bold text', () => {
    expect(feed).toMatch(/\*\*Documented Impact/);
    expect(feed).toMatch(/\*\*Enforcement/);
    expect(feed).toMatch(/\*\*The Subsidy Gap/);
  });

  it('preserves markdown structure', () => {
    expect(feed).toContain('## ');
    expect(feed).toContain('### ');
    expect(feed).toContain('---');
    expect(feed).toMatch(/^- /m);
  });
});
