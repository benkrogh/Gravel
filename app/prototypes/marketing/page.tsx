import { SiteHeader } from "./site-header";
import { HeroSection } from "./hero-section";
import { ValuePropsSection } from "./value-props-section";
import { FeaturesSection } from "./features-section";
import { TestimonialsSection } from "./testimonials-section";
import { CtaSection } from "./cta-section";
import { SiteFooter } from "./site-footer";

export default function MarketingPrototype() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ValuePropsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </>
  );
}
