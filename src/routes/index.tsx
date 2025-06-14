import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<main className="p-4 flex flex-col items-center justify-center h-screen space-y-8">
			<section className="space-y-1 text-center">
				<h1 className="text-4xl font-extrabold lg:text-5xl">Otentikator</h1>
				<h3 className="text-muted-foreground text-2xl font-semibold">
					Lightweight. Secure. Reliable.
				</h3>
			</section>
			<section className="flex flex-row space-x-2 items-center">
				<Link
					to="/app"
					className={cn(buttonVariants({ variant: "default", size: "lg" }))}
				>
					Secure your key
				</Link>
				<Button size="lg" variant="secondary">
					Learn More
				</Button>
			</section>
		</main>
	);
}
