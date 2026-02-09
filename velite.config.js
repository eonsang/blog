import { defineConfig, s } from "velite";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const rehypePlugins = [
  rehypeSlug,
  [rehypePrettyCode, { theme: "github-light", defaultLang: "plaintext", keepBackground: false }],
  [rehypeAutolinkHeadings, { behavior: "wrap" }],
];

export default defineConfig({
  collections: {
    posts: {
      name: "Post",
      pattern: "posts/**/*.mdx",
      schema: s
        .object({
          title: s.string().max(99),
          slug: s.path(),
          date: s.isodate(),
          updated: s.isodate().optional(),
          description: s.string().max(200),
          tags: s.array(s.string()).default([]),
          series: s.string().optional(),
          seriesOrder: s.number().optional(),
          published: s.boolean().default(true),
          cover: s.image().optional(),
          metadata: s.metadata(),
          toc: s.toc(),
          excerpt: s.excerpt(),
          content: s.mdx({ rehypePlugins }),
        })
        .transform((data) => {
          const slug = data.slug.replace(/^posts\//, "");
          return { ...data, slug, permalink: `/blog/${slug}` };
        }),
    },
  },
});
