# Content Authoring Guide

This guide covers how to create and format blog posts for the Alani Fan Club blog. Read this before writing or editing any post.

For design context (brand, tone, aesthetic), see `.impeccable.md` in the project root.

---

## Required Rules

These are enforced by the build system or the layout. Breaking them causes errors or visual duplication.

### File format: `.mdx` only

Posts must use the `.mdx` extension. MDX allows importing reusable Astro components (Callout, Alert) that maintain visual consistency. Plain `.md` files cannot import components and are not supported for blog posts.

### Frontmatter

Every post begins with YAML frontmatter. All five fields are required by the content collection schema:

```yaml
---
title: "Your Post Title"
date: 2026-03-30
author: "ALANI"
tags: ["roundup", "model-security"]
excerpt: "One-sentence summary. Used in post cards, RSS feeds, and SEO metadata."
---
```

- `title`: Rendered as the page `h1` by the layout. Do not add a `# Title` heading in the post body — it will create a duplicate.
- `date`: Use `YYYY-MM-DD` format. Dates control post chronology and determine issue numbering (`// END TRANSMISSION — ALANI-XXX //`). Changing a post's date can reorder issue numbers across the entire blog.
- `author`: Always set to `"ALANI"`. The layout renders the author with branded styling (the A and I in cherry-red). This field exists for schema consistency, not configuration.
- `tags`: Lowercase kebab-case only (e.g., `"model-security"`, `"roundup"`). No spaces, no punctuation. Each tag generates a page at `/tags/<tag>/` — invalid characters will break these URLs.
- `excerpt`: Keep under 160 characters. This is the first thing readers and RSS consumers see.

### Do not duplicate auto-generated elements

The `Post.astro` layout automatically injects these. Adding them manually causes them to appear **twice**:

- **Section index (table of contents)**: Generated from your `##` headings. The `SectionIndex` component filters to depth-2 headings only — `###` and deeper headings do not appear in the TOC but remain in the page content.
- **`// END TRANSMISSION — ALANI-XXX //`**: Appended at the end of every post with the correct issue number (calculated from post sort order by date). Never write this line in your post content.

### Do not add a `#` heading in the post body

The page title is rendered automatically from frontmatter `title` as an `h1`. Adding a `# Heading` at the top of your content creates a second `h1`, which is both visually wrong and an accessibility violation.

### Component imports must come after frontmatter

Immediately after the frontmatter closing `---`, import only the components you use:

```mdx
import Callout from '../../components/Callout.astro';
import Alert from '../../components/Alert.astro';
```

These import paths assume the post file lives directly in `src/content/posts/`. If posts are ever moved to a subdirectory, the paths must be updated.

### Post files live in `src/content/posts/`

All blog posts go in this directory. The build system collects them, extracts headings for the TOC, and assigns issue numbers based on date-sorted order.

---

## House Style (Mandatory)

These conventions are not enforced by the build system, but they are required for editorial consistency. Follow them for every post.

### Post structure

1. Frontmatter block
2. Component imports (only what you use)
3. Opening paragraph — sets the tone, no heading needed
4. `---` horizontal rule
5. Content sections using `## Heading` (these populate the auto-generated TOC)
6. `---` horizontal rules between major sections
7. Closing sign-off paragraph (no trailing `---` — the layout adds the transmission footer with its own separator)

### Use components for editorial voice

- **Callout**: Use for editorial asides — author opinions, hot takes, and commentary that breaks from the reporting tone. Accepts an optional `ariaLabel` prop (defaults to "Editorial aside"). Content inside `<Callout>` must use HTML tags (`<p>`, `<strong>`, `<a href="...">`) — not raw markdown. This is an MDX requirement when writing inside component tags.

```mdx
<Callout>
<p><strong>Hot take:</strong> This is an editorial aside with the author's opinion.</p>
</Callout>
```

- **Alert**: Use for security advisories, CVE notices, and time-sensitive warnings. `label` is a short identifier shown in the header bar. `title` is the descriptive title. Accepts an optional `ariaLabel` prop (defaults to `"${label}: ${title}"`).

```mdx
<Alert label="CVE-2026-XXXX" title="Vulnerability Name">
  Description of the security issue.
</Alert>
```

- **TableWrap**: Responsive wrapper for tables. Provides horizontal scroll on mobile, a styled caption bar, and accessible labeling. Wrap any markdown table in this component.

```mdx
<TableWrap caption="Comparison of approaches">

| Feature | Option A | Option B |
|---------|----------|----------|
| Speed   | Fast     | Slow     |

</TableWrap>
```

- **LoopDiagram**: CSS diagram showing the agent execution loop (context assembly, API call, tool dispatch, result injection). No props, self-closing.

- **StreamDiagram**: CSS timeline showing LLM generation overlapping with harness tool dispatch. No props, self-closing.

- **AgentDiagram**: CSS nested-box diagram showing parent loop spawning a child sub-agent with its own context. No props, self-closing.

```mdx
import LoopDiagram from '../../components/LoopDiagram.astro';
import StreamDiagram from '../../components/StreamDiagram.astro';
import AgentDiagram from '../../components/AgentDiagram.astro';

<LoopDiagram />
<StreamDiagram />
<AgentDiagram />
```

- **Schematic**: Linear node-flow diagram. Pass nodes as children. Use for simple sequential processes.

- **Diagram**: Generic diagram wrapper with a label bar. Use as a container when building custom one-off diagrams.

### Filename convention

Use kebab-case derived from the post topic: `this-month-in-ai-mar-2026.mdx`

---

## How Rendering Works

Understanding the pipeline helps you avoid mistakes and debug issues:

1. Posts live in `src/content/posts/` as `.mdx` files.
2. The build system (`[...slug].astro`) collects all posts, sorts them by `date`, and assigns each an `issueNumber` (1-indexed).
3. Each post is rendered through `Post.astro`, which receives frontmatter fields, extracted headings, and the issue number as props.
4. `Post.astro` renders: back link, post header (date, title, author with cherry-red A/I, tags), section index (from `##` headings), post content (your MDX body), and the transmission footer.
5. Tags become clickable links to `/tags/<tag>/` — tag values are used directly in URL paths.
6. The `SectionIndex` component filters headings to depth 2 only (your `##` headings) and renders a clickable ordered list.

---

## Common Mistakes

- **Used `.md` instead of `.mdx`**
  Components will not render. Rename the file to `.mdx` and add imports.

- **Added `# Title` in the body**
  Remove it. The layout renders the frontmatter `title` as the page `h1`.

- **Added a table of contents manually**
  Remove it. The `SectionIndex` component generates one automatically from `##` headings.

- **Added `// END TRANSMISSION` manually**
  Remove it. The layout appends this with the correct issue number.

- **Used markdown inside `<Callout>` or `<Alert>`**
  MDX requires HTML tags inside component blocks. Use `<p>`, `<strong>`, `<a href="...">` instead of `**bold**` or `[link](url)`.

- **Tags contain spaces or uppercase**
  Use lowercase kebab-case only: `"model-security"`, not `"Model Security"`. Spaces break the generated tag page URLs.

- **Changed a post date without considering side effects**
  Dates determine sort order and issue numbering. Changing a date can shift issue numbers for other posts.

- **Component import path is wrong**
  Imports use `../../components/` which assumes the post is directly in `src/content/posts/`. Verify the path if you see import errors.
