import { Container } from "./Container";
import portfolioData from "../../data/portfolio.json";

export function Footer() {
  const { name, github, linkedin } = portfolioData.personalInfo;

  return (
    <footer className="border-t border-border bg-muted/20">
      <Container className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {name}. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          {github && (
            <a href={github} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
              GitHub
            </a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
              LinkedIn
            </a>
          )}
        </div>
      </Container>
    </footer>
  );
}
