import Image from "next/image";
import { Container } from "./Container";
import { Navigation } from "./Navigation";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <a
          href="#"
          aria-label="Sameer Shahid Siddiqui - Home"
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <Image
            src="/logo.png"
            alt="Sameer Shahid Siddiqui Logo"
            width={48}
            height={48}
            priority
            className="h-10 md:h-12 w-auto object-contain"
          />
          <span className="font-bold text-xl tracking-tight">Portfolio.</span>
        </a>
        <Navigation />
      </Container>
    </header>
  );
}
