import { Button } from "./ui/button";

type HeroSectionProps = {
  title?: string;
  subtitle?: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryTarget?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryTarget?: string;
  backgroundVideoUrl?: string;
  backgroundImageUrl?: string;
};

export function HeroSection({
  title,
  subtitle,
  ctaPrimaryLabel,
  ctaPrimaryTarget,
  ctaSecondaryLabel,
  ctaSecondaryTarget,
  backgroundVideoUrl,
  backgroundImageUrl,
}: HeroSectionProps) {
  const resolvedTitle =
    title ||
    "Somos una guía y un acompañante en tu proceso de compra de tu nuevo hogar";
  const resolvedSubtitle =
    subtitle || "Atención en línea, segura y personalizada";
  const resolvedPrimaryLabel = ctaPrimaryLabel || "Analicemos tu caso";
  const resolvedPrimaryTarget = ctaPrimaryTarget || "#contacto";
  const resolvedSecondaryLabel = ctaSecondaryLabel || "Conoce nuestro proceso";
  const resolvedSecondaryTarget = ctaSecondaryTarget || "#proceso";
  const resolvedVideo =
    backgroundVideoUrl ||
    "https://player.vimeo.com/external/394498663.sd.mp4?s=7e5f3e9d6e1b3b8a7d3c2f4e5e9a8b7c6d5e4f3a&profile_id=164&oauth2_token_id=57447761";
  const resolvedImage =
    backgroundImageUrl ||
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80";

  const handleCtaClick = (target: string) => {
    if (target.startsWith("#")) {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (target) {
      window.location.href = target;
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={resolvedVideo} type="video/mp4" />
          {/* Fallback image if video fails to load */}
          <img
            src={resolvedImage}
            alt="Familia feliz en su nuevo hogar"
            className="w-full h-full object-cover"
          />
        </video>
        {/* Video Overlay with increased opacity */}
        <div className="absolute inset-0 hero-video-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-2xl">
            {resolvedTitle}
          </h1>

          <p className="mb-8 text-xl md:text-2xl text-brand-cream max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
            {resolvedSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-brand-brown hover:bg-brand-cream px-8 py-4 text-lg font-semibold rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 min-w-[200px] drop-shadow-lg"
              onClick={() => handleCtaClick(resolvedPrimaryTarget)}
            >
              {resolvedPrimaryLabel}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-brand-brown px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 min-w-[200px] bg-transparent backdrop-blur-sm"
              onClick={() => handleCtaClick(resolvedSecondaryTarget)}
            >
              {resolvedSecondaryLabel}
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center opacity-80">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}
