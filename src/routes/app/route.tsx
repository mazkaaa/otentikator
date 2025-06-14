import SettingMenu from "@/components/containers/setting-menu";
import { SettingProvider } from "@/contexts/settings-provider";
import { Link, Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<SettingProvider>
			<header className="flex justify-between items-center container mx-auto p-6">
				<Link to="/app">
					<h3 className="text-2xl font-semibold">Otentikator</h3>
				</Link>
				<SettingMenu />
			</header>
			<main className="container mx-auto px-6 py-2">
				<Outlet />
			</main>
		</SettingProvider>
	);
}
