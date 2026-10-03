import Link from "next/link";

export function Navigation() {
  return (
    <nav className="flex gap-6">
      <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        About
      </a>
      <a href="#projects" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        Projects
      </a>
      <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        Contact
      </a>
    </nav>
  );
}
