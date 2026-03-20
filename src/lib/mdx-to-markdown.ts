import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import remarkStringify from 'remark-stringify';

interface AstNode {
  type: string;
  name?: string;
  attributes?: Array<{ name: string; value: string | { value: string } | null }>;
  children?: AstNode[];
  value?: string;
  [key: string]: unknown;
}

/** Strip MDX-specific nodes and return clean Markdown. */
export function mdxToMarkdown(source: string): string {
  const file = unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(stripMdx)
    .use(remarkStringify, {
      bullet: '-',
      emphasis: '*',
      strong: '*',
      rule: '-',
    })
    .processSync(source);

  return String(file);
}

function getAttr(node: AstNode, name: string): string | undefined {
  if (!node.attributes) return undefined;
  const attr = node.attributes.find((a) => a.name === name);
  if (!attr || attr.value === null) return undefined;
  if (typeof attr.value === 'string') return attr.value;
  if (typeof attr.value === 'object' && 'value' in attr.value) return attr.value.value;
  return undefined;
}

function boldParagraph(value: string): AstNode {
  return {
    type: 'paragraph',
    children: [{ type: 'strong', children: [{ type: 'text', value }] }],
  };
}

function codeBlock(value: string, lang?: string): AstNode {
  return { type: 'code', value, lang: lang ?? null };
}

function stripMdx() {
  return (tree: AstNode) => {
    visit(tree);
  };
}

function visit(node: AstNode): void {
  if (!node.children) return;

  const kept: AstNode[] = [];

  for (const child of node.children) {
    // Drop import/export statements and JS expressions
    if (
      child.type === 'mdxjsEsm' ||
      child.type === 'mdxFlowExpression' ||
      child.type === 'mdxTextExpression'
    ) {
      continue;
    }

    // Handle JSX components with special cases
    if (
      child.type === 'mdxJsxFlowElement' ||
      child.type === 'mdxJsxTextElement'
    ) {
      const name = child.name;

      // Alert: extract label and title props as text, then unwrap children
      if (name === 'Alert') {
        const label = getAttr(child, 'label');
        const title = getAttr(child, 'title');
        if (label || title) {
          const header = [label, title].filter(Boolean).join(' — ');
          kept.push(boldParagraph(header));
        }
        if (child.children) {
          for (const grandchild of child.children) {
            visit(grandchild);
            kept.push(grandchild);
          }
        }
        continue;
      }

      // Schematic: extract node names as a text representation
      if (name === 'Schematic') {
        const label = getAttr(child, 'label');
        const nodesRaw = getAttr(child, 'nodes');
        const lines: string[] = [];
        if (label) lines.push(label);
        if (nodesRaw) {
          try {
            const parsed = new Function(`return ${nodesRaw}`)() as Array<{ name: string; meta?: string }>;
            for (let i = 0; i < parsed.length; i++) {
              if (i > 0) lines.push('  ↓');
              const n = parsed[i];
              lines.push(n.meta ? `${n.name} (${n.meta})` : n.name);
            }
          } catch {
            lines.push('(diagram)');
          }
        }
        if (lines.length) {
          kept.push(codeBlock(lines.join('\n')));
        }
        continue;
      }

      // Default: unwrap — keep children, drop wrapper
      if (child.children) {
        for (const grandchild of child.children) {
          visit(grandchild);
          kept.push(grandchild);
        }
      }
      continue;
    }

    // Recurse into normal nodes
    visit(child);
    kept.push(child);
  }

  node.children = kept;
}
