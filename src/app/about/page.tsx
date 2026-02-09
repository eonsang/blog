import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "블로그 소개",
};

export default function AboutPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">About</h1>
      <div className="mt-6 space-y-4 leading-7 text-muted">
        <p>
          안녕하세요. 이 블로그는 개발과 기술에 대한 생각을 기록하는 공간입니다.
        </p>
        <p>
          Next.js와 Velite를 사용하여 만들어졌으며, 미니멀한 디자인을 추구합니다.
        </p>
      </div>
    </div>
  );
}
