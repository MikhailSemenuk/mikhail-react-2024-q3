import { ReactNode } from "react";
import { ThemeSwitchHeder } from "@/components/ThemeSwitchHeder";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <ThemeSwitchHeder />
      <div className="page">{children}</div>
    </>
  );
}
