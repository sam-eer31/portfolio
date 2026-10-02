import Link from "next/link";

export function Navigation() {
  return (
    <nav className="flex gap-6">
      <Link href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        About
      </Link>
      <Link href="#projects" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        Projects
      </Link>
      <Link href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        Contact
      </Link>
    </nav>
  );
}
