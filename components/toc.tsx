"use client";

import { useEffect } from "react";
import tocbot from "tocbot";
export default function Toc() {
  useEffect(() => {
    tocbot.init({
      tocSelector: ".js-toc", // Select the wrapper of toc
      contentSelector: ".js-toc-content", // Select the warpper of contents
      headingSelector: "h2, h3", // Choose the heading tags
    });
    return () => tocbot.destroy();
  }, []);
  return (
    <div>
      <span>Table of Contents</span>
      <div className="js-toc"></div>
    </div>
  );
}
