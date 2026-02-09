"use client";

import Giscus from "@giscus/react";

export function GiscusComments() {
  return (
    <section className="mt-12 border-t border-border pt-8">
      <Giscus
        repo="eonsang/blog"
        repoId="R_kgDORL0vbw"
        categoryId="DIC_kwDORL0vb84C2Enj"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="1"
        inputPosition="top"
        theme="light"
        lang="ko"
        loading="lazy"
      />
    </section>
  );
}
