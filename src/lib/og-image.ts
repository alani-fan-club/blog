import satori from 'satori';
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const FONTS_DIR = join(process.cwd(), 'src', 'fonts');

const spaceGroteskBold = readFileSync(join(FONTS_DIR, 'SpaceGrotesk-Bold.woff'));
const jetBrainsMonoRegular = readFileSync(join(FONTS_DIR, 'JetBrainsMono-Regular.ttf'));

interface OgImageOptions {
  title: string;
  subtitle?: string;
  tags?: string[];
}

// Satori uses a VDOM object format, not JSX — no public type exists for it
interface SatoriNode {
  type: string;
  props: {
    children?: string | SatoriNode | SatoriNode[];
    style?: Record<string, unknown>;
  };
}

// Threshold where title wraps awkwardly at 56px on a 1200px canvas
const LONG_TITLE_CHARS = 40;
const LONG_TITLE_SIZE = 48;
const SHORT_TITLE_SIZE = 56;

// Satori renders all tags; cap to prevent overflow on 1200x630 canvas
const MAX_VISIBLE_TAGS = 5;

export async function generateOgImage(options: OgImageOptions): Promise<Buffer> {
  const { title, subtitle, tags } = options;

  const titleSize = title.length > LONG_TITLE_CHARS ? LONG_TITLE_SIZE : SHORT_TITLE_SIZE;

  const tagChips: SatoriNode[] = (tags ?? []).slice(0, MAX_VISIBLE_TAGS).map((tag) => ({
    type: 'span',
    props: {
      children: `#${tag}`,
      style: {
        color: '#3bceac',
        fontSize: 14,
        fontFamily: 'JetBrains Mono',
        letterSpacing: '0.08em',
        textTransform: 'uppercase' as const,
        border: '1px solid rgba(59,206,172,0.3)',
        padding: '4px 10px',
        background: 'rgba(59,206,172,0.1)',
      },
    },
  }));

  const middleChildren: SatoriNode[] = [
    {
      type: 'div',
      props: {
        children: title,
        style: {
          fontFamily: 'Space Grotesk',
          fontSize: titleSize,
          fontWeight: 700,
          color: '#fff',
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
        },
      },
    },
  ];

  if (subtitle) {
    middleChildren.push({
      type: 'span',
      props: {
        children: subtitle,
        style: {
          color: '#888',
          fontSize: 18,
          letterSpacing: '0.1em',
        },
      },
    });
  }

  const markup: SatoriNode = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        padding: 60,
        fontFamily: 'JetBrains Mono',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
            children: [
              {
                type: 'span',
                props: {
                  children: 'SYS://ALANI',
                  style: {
                    color: '#888',
                    fontSize: 16,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase' as const,
                  },
                },
              },
              {
                type: 'span',
                props: {
                  children: '●',
                  style: { color: '#3bceac', fontSize: 16 },
                },
              },
            ],
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              flexDirection: 'column' as const,
              gap: 16,
              flex: 1,
              justifyContent: 'center',
            },
            children: middleChildren,
          },
        },
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: { display: 'flex', gap: 8, flexWrap: 'wrap' as const },
                  children: tagChips,
                },
              },
              {
                type: 'span',
                props: {
                  children: 'ALANI FAN CLUB',
                  style: {
                    fontFamily: 'Space Grotesk',
                    fontSize: 24,
                    fontWeight: 700,
                    color: '#3bceac',
                    letterSpacing: '-0.02em',
                  },
                },
              },
            ],
          },
        },
      ],
    },
  };

  // Satori's type signature expects ReactNode but accepts plain VDOM objects
  const svg = await satori(markup as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: 'Space Grotesk',
        data: spaceGroteskBold,
        weight: 700,
        style: 'normal',
      },
      {
        name: 'JetBrains Mono',
        data: jetBrainsMonoRegular,
        weight: 400,
        style: 'normal',
      },
    ],
  });

  return sharp(Buffer.from(svg)).png().toBuffer();
}
