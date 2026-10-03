import { Container } from "../layout/Container";
import { Button } from "../ui/Button";
import portfolioData from "../../data/portfolio.json";

export function Contact() {
  return (
    <section id="contact" className="py-8 md:py-12">
      <Container className="max-w-xl text-center space-y-8">
        <h2 className="text-3xl font-bold tracking-tight">Get In Touch</h2>
        <p className="text-muted-foreground">
          I&apos;m currently open for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
        </p>
        <a href={`mailto:${portfolioData.personalInfo.email}`}>
          <Button size="lg">Say Hello</Button>
        </a>
      </Container>
    </section>
  );
}
