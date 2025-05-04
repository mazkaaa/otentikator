import SettingMenu from "@/components/container/setting-menu";
import { SettingProvider } from "@/components/context";
import Link from "next/link";

export default function AppDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="space-y-8 container mx-auto p-6">
      <SettingProvider>
        <header className="flex justify-between items-center">
          <Link href="/app">
            <h3>Otentikator</h3>
          </Link>
          <SettingMenu />
        </header>
        <main>{children}</main>
      </SettingProvider>
    </div>
  );
}
