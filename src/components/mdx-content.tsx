"use client";

import * as runtime from "react/jsx-runtime";
import type { ComponentPropsWithoutRef } from "react";

function useMDXComponent(code: string) {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
}

const components = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1 className="mt-10 mb-4 text-3xl font-bold tracking-tight" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-8 mb-3 text-2xl font-semibold tracking-tight" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-6 mb-2 text-xl font-semibold" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mb-4 leading-7" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mb-4 ml-6 list-disc space-y-1" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mb-4 ml-6 list-decimal space-y-1" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="leading-7" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="mb-4 border-l-2 border-neutral-300 pl-4 italic text-neutral-600 dark:border-neutral-700 dark:text-neutral-400"
      {...props}
    />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a className="underline underline-offset-4 hover:text-neutral-600 dark:hover:text-neutral-300" {...props} />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre className="mb-4 overflow-x-auto rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => {
    const isInline = !props.className;
    if (isInline) {
      return (
        <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-sm dark:bg-neutral-800" {...props} />
      );
    }
    return <code {...props} />;
  },
  hr: () => <hr className="my-8 border-neutral-200 dark:border-neutral-800" />,
  img: (props: ComponentPropsWithoutRef<"img">) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="my-4 rounded-lg" alt={props.alt ?? ""} {...props} />
  ),
};

export function MDXContent({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return (
    <div className="prose-custom">
      <Component components={components} />
    </div>
  );
}
