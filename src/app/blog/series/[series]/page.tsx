import type { Metadata } from "next";
import { getAllSeries, getPostsBySeries } from "@/lib/content";
import { PostList } from "@/components/post-list";

export function generateStaticParams() {
  return getAllSeries().map((series) => ({ series }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ series: string }>;
}): Promise<Metadata> {
  const { series } = await params;
  const decoded = decodeURIComponent(series);
  return {
    title: `시리즈: ${decoded}`,
    description: `${decoded} 시리즈의 포스트 목록`,
  };
}

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ series: string }>;
}) {
  const { series } = await params;
  const decoded = decodeURIComponent(series);
  const posts = getPostsBySeries(decoded);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">시리즈: {decoded}</h1>
      <p className="mt-2 text-muted">{posts.length}개의 포스트</p>
      <div className="mt-6">
        <PostList posts={posts} />
      </div>
    </div>
  );
}
