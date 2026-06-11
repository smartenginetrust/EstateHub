import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
  children: (selectedBranch: string) => ReactNode;
  title: string;
  subtitle?: string;
}

export default function Layout({ children, title, subtitle }: LayoutProps) {
  const [selectedBranch, setSelectedBranch] = useState("all");

  return (
    <div className="min-h-screen bg-[#080F1E] flex">
      <Sidebar />
      <div className="flex-1 ml-60 transition-all duration-300 min-h-screen flex flex-col">
        <Header
          title={title}
          subtitle={subtitle}
          selectedBranch={selectedBranch}
          onBranchChange={setSelectedBranch}
        />
        <main className="flex-1 p-6">
          {children(selectedBranch)}
        </main>
      </div>
    </div>
  );
}
