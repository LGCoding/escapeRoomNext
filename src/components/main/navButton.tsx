import { usePathname, useRouter } from "next/navigation";
import { type CSSProperties } from "react";
import { Button } from "react-bootstrap";
import * as icons from "react-bootstrap-icons";

interface Button {
  iconName: keyof typeof icons;
  children: React.ReactNode;
  href: string;
  style?: CSSProperties;
}

export default function NavButton({ href, children, iconName, style }: Button) {
  const router = useRouter();
  const path = usePathname();
  const Icon = icons[iconName];

  return (
    <Button
      style={style}
      onClick={() => {
        router.push(href);
      }}
      active={path === href}
    >
      {
        <Icon
          style={{
            display: "block",
            margin: "auto",
          }}
        />
      }
      {children}
    </Button>
  );
}
