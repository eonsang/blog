"use client";

import { useEffect, useRef } from "react";

const DISQUS_SHORTNAME = "YOUR_DISQUS_SHORTNAME";

interface DisqusCommentsProps {
  slug: string;
  title: string;
  permalink: string;
}

export function DisqusComments({ slug, title, permalink }: DisqusCommentsProps) {
  const disqusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const w = window as any;
    w.disqus_config = function (this: any) {
      this.page.url = permalink;
      this.page.identifier = slug;
      this.page.title = title;
    };

    if (w.DISQUS) {
      w.DISQUS.reset({ reload: true });
    } else {
      const script = document.createElement("script");
      script.src = `https://${DISQUS_SHORTNAME}.disqus.com/embed.js`;
      script.setAttribute("data-timestamp", String(+new Date()));
      script.async = true;
      document.body.appendChild(script);
    }
  }, [slug, title, permalink]);

  return (
    <section className="mt-12 border-t border-border pt-8">
      <div id="disqus_thread" ref={disqusRef} />
    </section>
  );
}
