import { describe, it, expect } from 'vitest';
import { mdxToMarkdown } from '../../src/lib/mdx-to-markdown';

describe('mdxToMarkdown', () => {
  it('strips import statements', () => {
    const input = `import Callout from '../../components/Callout.astro';

## Heading

Some text.`;
    const result = mdxToMarkdown(input);
    expect(result).not.toContain('import');
    expect(result).toContain('## Heading');
    expect(result).toContain('Some text.');
  });

  it('unwraps JSX flow elements, keeping children', () => {
    const input = `<Callout>
<p><strong>Bold text</strong> and normal text.</p>
</Callout>`;
    const result = mdxToMarkdown(input);
    expect(result).not.toContain('Callout');
    expect(result).toContain('Bold text');
    expect(result).toContain('normal text');
  });

  it('unwraps Alert components, preserving label and title as text', () => {
    const input = `<Alert label="Documented Impact" title="$40,000 in charges">
  A single proxy on stolen credentials.
</Alert>`;
    const result = mdxToMarkdown(input);
    expect(result).not.toContain('<Alert');
    expect(result).not.toContain('label=');
    expect(result).toContain('Documented Impact');
    expect(result).toContain('$40,000 in charges');
    expect(result).toContain('A single proxy');
  });

  it('converts Schematic to text representation', () => {
    const input = `<Schematic
  label="Relay Chain"
  ariaLabel="Diagram"
  nodes={[
    { name: "Provider", variant: "source" },
    { name: "Proxy", meta: "takes margin", variant: "mid" },
    { name: "You", meta: "pays most", variant: "end" },
  ]}
/>`;
    const result = mdxToMarkdown(input);
    expect(result).not.toContain('<Schematic');
    expect(result).not.toContain('nodes=');
    expect(result).toContain('Relay Chain');
    expect(result).toContain('Provider');
    expect(result).toContain('Proxy');
    expect(result).toContain('You');
  });

  it('passes through plain markdown unchanged', () => {
    const input = `## Heading

A paragraph with **bold** and *italic*.

- List item 1
- List item 2`;
    const result = mdxToMarkdown(input);
    expect(result).toContain('## Heading');
    expect(result).toContain('**bold**');
    expect(result).toContain('*italic*');
    expect(result).toContain('List item 1');
  });

  it('strips multiple imports and exports', () => {
    const input = `import Callout from '../../components/Callout.astro';
import Alert from '../../components/Alert.astro';
export const meta = { foo: 'bar' };

Content here.`;
    const result = mdxToMarkdown(input);
    expect(result).not.toContain('import');
    expect(result).not.toContain('export');
    expect(result).toContain('Content here.');
  });

  it('renders Alert header as bold without escaped asterisks', () => {
    const input = `<Alert label="Enforcement" title="Overnight Ban">
  Details here.
</Alert>`;
    const result = mdxToMarkdown(input);
    expect(result).toContain('**Enforcement — Overnight Ban**');
    expect(result).not.toContain('\\*');
  });

  it('renders Schematic as a code block without escaped brackets or entities', () => {
    const input = `<Schematic
  label="Relay Chain"
  ariaLabel="Diagram"
  nodes={[
    { name: "Provider", variant: "source" },
    { name: "Proxy", meta: "takes margin", variant: "mid" },
  ]}
/>`;
    const result = mdxToMarkdown(input);
    expect(result).toContain('```');
    expect(result).toContain('Relay Chain');
    expect(result).not.toContain('\\[');
    expect(result).not.toContain('&#x20;');
  });

  it('handles Alert with only label prop', () => {
    const input = `<Alert label="Warning" title="">
  Be careful.
</Alert>`;
    const result = mdxToMarkdown(input);
    expect(result).toContain('Warning');
    expect(result).toContain('Be careful');
  });

  it('preserves horizontal rules', () => {
    const input = `Before

---

After`;
    const result = mdxToMarkdown(input);
    expect(result).toContain('---');
    expect(result).toContain('Before');
    expect(result).toContain('After');
  });
});
