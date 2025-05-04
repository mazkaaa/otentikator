import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-4 flex flex-col items-center justify-center h-screen space-y-8">
      <section className="space-y-1 text-center">
        <h1>Otentikator</h1>
        <h3 className="text-muted-foreground">
          Lightweight. Secure. Reliable.
        </h3>
      </section>
      <section className="flex flex-row space-x-2 items-center">
        <Button asChild size="lg">
          <Link href="/app">Secure your key</Link>
        </Button>
        <Button size="lg" variant="secondary">
          Learn More
        </Button>
      </section>
    </main>
  );
}
