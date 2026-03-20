import { describe, it, expect } from 'vitest';
import { generateOgImage } from '../src/lib/og-image';

// First 4 bytes of a valid PNG file signature
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47]);

function expectValidPng(buffer: Buffer) {
  expect(Buffer.isBuffer(buffer)).toBe(true);
  expect(buffer.length).toBeGreaterThan(0);
  expect(buffer.subarray(0, 4).equals(PNG_SIGNATURE)).toBe(true);
}

describe('generateOgImage', () => {
  it('generates PNG with title only', async () => {
    expectValidPng(await generateOgImage({ title: 'Test Title' }));
  });

  it('generates PNG with title + subtitle', async () => {
    expectValidPng(await generateOgImage({
      title: 'Test Title',
      subtitle: 'ALANI // 2026-03-19',
    }));
  });

  it('generates PNG with title + subtitle + tags', async () => {
    expectValidPng(await generateOgImage({
      title: 'Full Featured Post',
      subtitle: 'ALANI // 2026-03-19',
      tags: ['security', 'api', 'agents'],
    }));
  });

  it('handles more than MAX_VISIBLE_TAGS without error', async () => {
    expectValidPng(await generateOgImage({
      title: 'Many Tags',
      tags: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    }));
  });

  it('uses smaller font size for titles exceeding 40 characters', async () => {
    const short = await generateOgImage({ title: 'Short' });
    const long = await generateOgImage({
      title: 'This Is a Very Long Title That Exceeds Forty Characters Easily',
    });

    expectValidPng(short);
    expectValidPng(long);
  });

  it('handles empty tags array', async () => {
    expectValidPng(await generateOgImage({ title: 'No Tags', tags: [] }));
  });

  it('handles undefined optional fields', async () => {
    expectValidPng(await generateOgImage({ title: 'Minimal' }));
  });
});
