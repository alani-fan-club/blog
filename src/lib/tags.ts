interface Post {
  slug: string;
  data: {
    title: string;
    date: Date;
    tags: string[];
    [key: string]: unknown;
  };
}

/** Count occurrences of each tag across all posts, sorted alphabetically. */
export function buildTagCounts(posts: Post[]): [tag: string, count: number][] {
  const tagMap = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1);
    }
  }
  return [...tagMap.entries()].sort((a, b) => a[0].localeCompare(b[0]));
}

/** Get unique tags across all posts. */
export function getUniqueTags(posts: Post[]): string[] {
  return [...new Set(posts.flatMap((p) => p.data.tags))];
}

/** Filter posts by tag, sorted newest-first. */
export function filterPostsByTag(posts: Post[], tag: string): Post[] {
  return posts
    .filter((p) => p.data.tags.includes(tag))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
