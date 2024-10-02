import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";
import Toc from "./toc";

const components = {
  Image: (props: any) => <Image alt={props.alt} {...props} />,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="js-toc-content">
      <Component components={components} />
    </div>
  );
}
