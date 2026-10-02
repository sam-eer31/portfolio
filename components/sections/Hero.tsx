import { Container } from "../layout/Container";
import { Button } from "../ui/Button";
import portfolioData from "../../data/portfolio.json";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  const hero = portfolioData.hero;

  return (
    <section className="relative py-24 md:py-32 lg:py-40 flex items-center overflow-hidden">
      
      {/* Static Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/hero-bg.png" 
          alt="Hero Background" 
          fill 
          priority
          className="object-cover object-center opacity-80"
        />
        {/* Subtle overlay to ensure text readability */}
        <div className="absolute inset-0 bg-linear-to-r from-background/90 via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />
      </div>

      <Container className="relative z-10 w-full">
        <div className="flex flex-col items-start text-left space-y-8 w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
          
          <div className="space-y-6">
            <p className="text-xs md:text-[13px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
              {hero.role}
            </p>
            <h1 className="text-5xl md:text-[5.5rem] font-semibold tracking-tight leading-[1.05]">
              {hero.greeting} <br />
              {hero.name}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed pt-2">
              {hero.description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-5 pt-2">
            <Link href={hero.buttons.primary.link}>
              <Button className="h-12 rounded-full px-8 text-sm font-medium shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all">
                {hero.buttons.primary.text} &rarr;
              </Button>
            </Link>
            <Link href={hero.buttons.secondary.link}>
              <Button variant="outline" className="h-12 rounded-full px-8 text-sm font-medium border-border/60 hover:bg-muted/30">
                {hero.buttons.secondary.text}
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap gap-12 pt-12 w-full">
            {hero.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="text-3xl md:text-4xl font-bold tracking-tight">{stat.value}</span>
                <span className="text-[11px] md:text-xs text-muted-foreground capitalize tracking-wide">{stat.label}</span>
              </div>
            ))}
          </div>
          
        </div>
      </Container>
    </section>
  );
}
