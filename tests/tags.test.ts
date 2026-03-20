import { describe, it, expect } from 'vitest';
import { buildTagCounts, getUniqueTags, filterPostsByTag } from '../src/lib/tags';

const mockPosts = [
  {
    slug: 'post-alpha',
    data: {
      title: 'Post Alpha',
      date: new Date('2026-03-01'),
      tags: ['security', 'api'],
    },
  },
  {
    slug: 'post-beta',
    data: {
      title: 'Post Beta',
      date: new Date('2026-03-15'),
      tags: ['security', 'infrastructure'],
    },
  },
  {
    slug: 'post-gamma',
    data: {
      title: 'Post Gamma',
      date: new Date('2026-03-10'),
      tags: ['agents', 'api', 'orchestration'],
    },
  },
];

describe('buildTagCounts', () => {
  it('counts each tag across all posts', () => {
    const result = buildTagCounts(mockPosts);
    const map = new Map(result);

    expect(map.get('security')).toBe(2);
    expect(map.get('api')).toBe(2);
    expect(map.get('infrastructure')).toBe(1);
    expect(map.get('agents')).toBe(1);
    expect(map.get('orchestration')).toBe(1);
  });

  it('sorts tags alphabetically', () => {
    const result = buildTagCounts(mockPosts);
    const tagNames = result.map(([tag]) => tag);

    expect(tagNames).toEqual(['agents', 'api', 'infrastructure', 'orchestration', 'security']);
  });

  it('returns empty array for no posts', () => {
    expect(buildTagCounts([])).toEqual([]);
  });

  it('handles posts with no tags', () => {
    const posts = [{ slug: 'empty', data: { title: 'Empty', date: new Date(), tags: [] } }];
    expect(buildTagCounts(posts)).toEqual([]);
  });
});

describe('getUniqueTags', () => {
  it('returns all unique tags', () => {
    const result = getUniqueTags(mockPosts);

    expect(result).toHaveLength(5);
    expect(result).toContain('security');
    expect(result).toContain('api');
    expect(result).toContain('infrastructure');
    expect(result).toContain('agents');
    expect(result).toContain('orchestration');
  });

  it('deduplicates tags', () => {
    const result = getUniqueTags(mockPosts);
    const unique = new Set(result);

    expect(result.length).toBe(unique.size);
  });

  it('returns empty for no posts', () => {
    expect(getUniqueTags([])).toEqual([]);
  });
});

describe('filterPostsByTag', () => {
  it('returns only posts containing the tag', () => {
    const result = filterPostsByTag(mockPosts, 'security');

    expect(result).toHaveLength(2);
    expect(result.every((p) => p.data.tags.includes('security'))).toBe(true);
  });

  it('sorts results newest-first', () => {
    const result = filterPostsByTag(mockPosts, 'api');

    expect(result).toHaveLength(2);
    expect(result[0].slug).toBe('post-gamma'); // Mar 10
    expect(result[1].slug).toBe('post-alpha'); // Mar 1
  });

  it('returns empty for nonexistent tag', () => {
    expect(filterPostsByTag(mockPosts, 'nonexistent')).toEqual([]);
  });

  it('returns single post for unique tag', () => {
    const result = filterPostsByTag(mockPosts, 'orchestration');

    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe('post-gamma');
  });
});
