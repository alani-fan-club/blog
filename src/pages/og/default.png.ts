import { generateOgImage } from '../../lib/og-image';

export async function GET() {
  const png = await generateOgImage({
    title: 'ALANI FAN CLUB',
    subtitle: 'Human Research Collective // Dispatches',
  });

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
