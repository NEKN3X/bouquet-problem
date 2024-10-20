"use client";

import { Anchor, Breadcrumbs as Base } from "@mantine/core";
import { usePathname } from "next/navigation";

export function Breadcrumbs() {
  const pathname = usePathname();
  console.log(pathname);
  const items = pathname
    .split("/")
    .slice(1)
    .reduce((prev, curr) => {
      return [...prev, `${prev.join("/")}/${curr}`];
    }, [] as string[])
    .map((path) => ({
      title: path.split("/").at(-1),
      href: path,
    }))
    .map(({ title, href }) => (
      <Anchor key={href} href={href}>
        {title}
      </Anchor>
    ));
  return (
    <>
      <Base>{items}</Base>
    </>
  );
}
