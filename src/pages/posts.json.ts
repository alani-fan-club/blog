import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(_context: APIContext) {
  const posts = (await getCollection('posts')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  const data = posts.map((post) => ({
    title: post.data.title,
    date: post.data.date.toISOString().split('T')[0],
    slug: post.slug,
    excerpt: post.data.excerpt,
    tags: post.data.tags,
    author: post.data.author,
    url: `/posts/${post.slug}/`,
  }));

  return new Response(JSON.stringify(data, null, 2), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
