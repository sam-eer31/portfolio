import { Container } from "./Container";
import { Navigation } from "./Navigation";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <div className="font-bold text-xl tracking-tight">Portfolio.</div>
        <Navigation />
      </Container>
    </header>
  );
}
