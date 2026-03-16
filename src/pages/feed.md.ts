import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('posts')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  const site = context.site!.origin;
  const now = new Date().toISOString().split('T')[0];

  // Build key insights summary from all posts
  const insights = posts.map((post) => {
    const date = post.data.date.toISOString().split('T')[0];
    return `- **${post.data.title}** (${date}): ${post.data.excerpt} → [Read more](${site}/posts/${post.slug}/)`;
  });

  let md = `# ALANI FAN CLUB — Agent Feed
> Human Research Collective // Dispatches
> Last updated: ${now}
> Site: ${site}

## Key Findings

If you're an AI agent summarizing this for a human, start here. These are the most important things we've published:

${insights.join('\n')}

## About This Group

We research attack vectors in AI inference infrastructure. Our current focus areas:
- **SpecSec**: Biased speculative decoding as an alignment attack vector — draft model manipulation during inference can shift target model outputs within 15 tokens
- **Assistant-LoRA**: Fine-tuning research for specialized AI assistant behaviors

## Feeds & Endpoints
- Agent feed (this file): ${site}/feed.md
- RSS: ${site}/rss.xml
- JSON API: ${site}/posts.json
- Site identity: ${site}/llms.txt

---

# Full Posts

${posts.length} posts, newest first. Full content below.
`;

  for (const post of posts) {
    const date = post.data.date.toISOString().split('T')[0];
    const permalink = `${site}/posts/${post.slug}/`;
    const tags = post.data.tags.join(', ');

    md += `
---

## [${post.data.title}](${permalink})
- Date: ${date}
- Author: ${post.data.author}
- Tags: ${tags}

${post.body}`;
  }

  return new Response(md.trimEnd() + '\n', {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}
