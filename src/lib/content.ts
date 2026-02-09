import { posts } from "@/../.velite";

export function getPublishedPosts() {
  return posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug && post.published);
}

export function getPostsByTag(tag: string) {
  return getPublishedPosts().filter((post) => post.tags.includes(tag));
}

export function getPostsBySeries(series: string) {
  return getPublishedPosts()
    .filter((post) => post.series === series)
    .sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0));
}

export function getAllTags(): { name: string; count: number }[] {
  const tagMap = new Map<string, number>();
  for (const post of getPublishedPosts()) {
    for (const tag of post.tags) {
      tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getAllSeries(): string[] {
  const seriesSet = new Set<string>();
  for (const post of getPublishedPosts()) {
    if (post.series) seriesSet.add(post.series);
  }
  return Array.from(seriesSet);
}

export type SearchablePost = {
  title: string;
  description: string;
  excerpt: string;
  headings: string[];
  tags: string[];
  slug: string;
  permalink: string;
  date: string;
};

function flattenTocTitles(
  items: { title: string; items?: { title: string; items?: any[] }[] }[],
): string[] {
  const titles: string[] = [];
  for (const item of items) {
    titles.push(item.title);
    if (item.items) titles.push(...flattenTocTitles(item.items));
  }
  return titles;
}

export function getSearchablePosts(): SearchablePost[] {
  return getPublishedPosts().map((post) => ({
    title: post.title,
    description: post.description,
    excerpt: post.excerpt,
    headings: flattenTocTitles(post.toc),
    tags: post.tags,
    slug: post.slug,
    permalink: post.permalink,
    date: post.date,
  }));
}
