import { Post } from "contentlayer/generated";

export function getAllTags(posts: Post[]) {
  const tags: Record<string, number> = {};

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (tags[tag]) {
        tags[tag]++;
      } else {
        tags[tag] = 1;
      }
    });
  });

  // 태그 카운트 기준으로 내림차순 정렬
  return Object.entries(tags)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));
}
