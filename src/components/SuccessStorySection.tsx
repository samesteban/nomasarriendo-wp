"use client";

import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Play, Quote } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type SuccessResult = { result?: string } | string;

type SuccessStoryProps = {
  title?: string;
  subtitle?: string;
  image?: string;
  videoType?: string;
  videoUrl?: string;
  videoYoutube?: string;
  quote?: string;
  authorName?: string;
  authorMeta?: string;
  results?: SuccessResult[];
  ctaLabel?: string;
  ctaTarget?: string;
};

export function SuccessStorySection({
  title,
  subtitle,
  image,
  videoType,
  videoUrl,
  videoYoutube,
  quote,
  authorName,
  authorMeta,
  results,
  ctaLabel,
  ctaTarget,
}: SuccessStoryProps) {
  const resolvedTitle = title || "Caso de Éxito";
  const resolvedSubtitle =
    subtitle || "Conoce la experiencia de una de nuestras familias asesoradas";
  const resolvedImage =
    image ||
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
  const resolvedVideoType = videoType || "";
  const resolvedVideoUrl = videoUrl || "";
  const resolvedYoutubeUrl = videoYoutube || "";
  const resolvedQuote =
    quote ||
    "Gracias a nomasarriendo.cl logramos comprar nuestra primera casa sin complicaciones. Nos acompañaron en cada paso y nos dieron la confianza que necesitábamos para tomar esta importante decisión.";
  const resolvedAuthor = authorName || "María José y Carlos";
  const resolvedAuthorMeta = authorMeta || "Familia Rodríguez, Las Condes";
  const resolvedResults = results?.length
    ? results.map((item) =>
        typeof item === "string" ? item : String(item.result ?? ""),
      )
    : [
        "Ahorro de 15% en el precio final",
        "Proceso completado en 45 días",
        "Crédito hipotecario aprobado sin problemas",
      ];
  const resolvedCtaLabel = ctaLabel || "Ver más casos de éxito";
  const resolvedCtaTarget = ctaTarget || "";
  const youtubeEmbedUrl = resolvedYoutubeUrl
    ? toYoutubeEmbedUrl(resolvedYoutubeUrl)
    : "";
  const hasVideo = Boolean(resolvedVideoUrl || youtubeEmbedUrl);

  const handleCtaClick = () => {
    if (!resolvedCtaTarget) return;
    if (resolvedCtaTarget.startsWith("#")) {
      document
        .querySelector(resolvedCtaTarget)
        ?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    window.location.href = resolvedCtaTarget;
  };

  return (
    <section id="caso-exito" className="py-16 lg:py-24 bg-brand-cream">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {resolvedTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {resolvedSubtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Video/Image */}
            <div className="relative">
              <Card className="overflow-hidden shadow-2xl">
                {hasVideo ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="relative aspect-video w-full bg-gray-900 text-left cursor-pointer"
                      >
                        <ImageWithFallback
                          src={resolvedImage}
                          alt="Familia testimonio"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="w-20 h-20 rounded-full bg-white/90 hover:bg-white text-brand-brown shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center cursor-pointer">
                            <Play className="w-8 h-8 ml-1" />
                          </div>
                        </div>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl p-0 overflow-hidden z-60 bg-black">
                      <DialogTitle className="sr-only">
                        Video caso de exito
                      </DialogTitle>
                      <div
                        className="relative w-full"
                        style={{ paddingTop: "56.25%" }}
                      >
                        {resolvedVideoType === "youtube" && youtubeEmbedUrl ? (
                          <iframe
                            src={youtubeEmbedUrl}
                            title="Video de caso de exito"
                            className="absolute inset-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <video
                            src={resolvedVideoUrl}
                            controls
                            autoPlay
                            className="absolute inset-0 w-full h-full"
                          />
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <div className="relative aspect-video bg-gray-900">
                    <ImageWithFallback
                      src={resolvedImage}
                      alt="Familia testimonio"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </Card>
            </div>

            {/* Testimonial Content */}
            <div className="space-y-8">
              <div className="relative">
                <Quote className="w-12 h-12 text-brand-brown mb-6" />
                <blockquote className="text-xl lg:text-2xl text-gray-800 leading-relaxed mb-6">
                  "{resolvedQuote}"
                </blockquote>
                <div className="flex items-center">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {resolvedAuthor}
                    </p>
                    <p className="text-gray-600">{resolvedAuthorMeta}</p>
                  </div>
                </div>
              </div>

              <div className="bg-brand-beige p-6 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Resultados obtenidos:
                </h4>
                <ul className="space-y-2 text-gray-700">
                  {resolvedResults.map((item, resultIndex) => (
                    <li key={resultIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-brand-brown rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant="outline"
                className="border-brand-brown text-brand-brown hover:bg-brand-brown hover:text-white px-6 py-3"
                onClick={handleCtaClick}
              >
                {resolvedCtaLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function toYoutubeEmbedUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      const id = parsed.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}?autoplay=1` : "";
    }
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v");
      if (id) {
        return `https://www.youtube.com/embed/${id}?autoplay=1`;
      }
      if (parsed.pathname.startsWith("/embed/")) {
        return `https://www.youtube.com${parsed.pathname}?autoplay=1`;
      }
    }
  } catch (error) {
    return "";
  }
  return "";
}
