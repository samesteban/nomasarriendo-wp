import { useEffect, useRef } from 'react';
import { Card } from './ui/card';
import { Calculator, FileText, HandHeart, Home, Search } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ProcessFeature = { feature?: string } | string;

type ProcessStep = {
  title?: string;
  subtitle?: string;
  description?: string;
  icon?: unknown;
  background?: string;
  features?: ProcessFeature[];
};

type ProcessSectionProps = {
  title?: string;
  subtitle?: string;
  scrollHint?: string;
  steps?: ProcessStep[];
  ctaTitle?: string;
  ctaBody?: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryTarget?: string;
  ctaPrimaryLink?: unknown;
  ctaSecondaryLabel?: string;
  ctaSecondaryTarget?: string;
  ctaSecondaryLink?: unknown;
  ctaStats?: { value?: string; label?: string }[];
};

const iconMap: Record<string, typeof Search> = {
  search: Search,
  filetext: FileText,
  calculator: Calculator,
  home: Home,
  handheart: HandHeart,
};

function resolveMediaUrl(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }
  if (value && typeof value === "object" && "url" in value) {
    const url = (value as { url?: unknown }).url;
    return typeof url === "string" ? url : "";
  }
  return "";
}

type CtaLink = {
  title?: string;
  url?: string;
  target?: string;
};

function resolveCtaLink({
  label,
  url,
  link,
  defaultLabel,
  defaultUrl,
}: {
  label?: string;
  url?: string;
  link?: unknown;
  defaultLabel: string;
  defaultUrl: string;
}) {
  const fallback = {
    label: label || defaultLabel,
    url: url || defaultUrl,
    target: undefined as string | undefined,
  };

  if (typeof link === "string") {
    return { ...fallback, url: link || fallback.url };
  }
  if (link && typeof link === "object") {
    const { title, url: linkUrl, target } = link as CtaLink;
    return {
      label: title || fallback.label,
      url: linkUrl || fallback.url,
      target,
    };
  }
  return fallback;
}

export function ProcessSection({
  title,
  subtitle,
  scrollHint,
  steps: stepsProp,
  ctaTitle,
  ctaBody,
  ctaPrimaryLabel,
  ctaPrimaryTarget,
  ctaPrimaryLink,
  ctaSecondaryLabel,
  ctaSecondaryTarget,
  ctaSecondaryLink,
  ctaStats,
}: ProcessSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  const steps: ProcessStep[] =
    stepsProp && stepsProp.length
      ? stepsProp
      : [
          {
            icon: "Search",
            title: "Análisis inicial",
            subtitle: "Paso 1 de 5",
            description:
              "Evaluamos tu situación financiera actual y definimos tus necesidades habitacionales específicas. Analizamos tus ingresos, gastos, capacidad de endeudamiento y objetivos de compra.",
            features: [
              "Evaluación financiera completa",
              "Análisis de capacidad de crédito",
              "Definición de presupuesto objetivo",
              "Identificación de necesidades habitacionales",
            ],
            background:
              "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2026&q=80",
          },
          {
            icon: "FileText",
            title: "Revisión documental",
            subtitle: "Paso 2 de 5",
            description:
              "Verificamos y organizamos toda la documentación necesaria para el proceso de compra. Te acompañamos en la obtención de documentos faltantes y su correcta presentación.",
            features: [
              "Lista completa de documentos requeridos",
              "Verificación de validez y vigencia",
              "Organización digital de archivos",
              "Asesoría para documentos especiales",
            ],
            background:
              "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
          },
          {
            icon: "Calculator",
            title: "Simulación financiera",
            subtitle: "Paso 3 de 5",
            description:
              "Calculamos todas las opciones de crédito disponibles y analizamos la mejor estrategia de compra según tu perfil. Incluye simulaciones de diferentes escenarios.",
            features: [
              "Simulaciones de crédito hipotecario",
              "Análisis de subsidios disponibles",
              "Comparación de entidades financieras",
              "Proyección de gastos adicionales",
            ],
            background:
              "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
          },
          {
            icon: "Home",
            title: "Búsqueda y negociación",
            subtitle: "Paso 4 de 5",
            description:
              "Te acompañamos en la búsqueda del hogar ideal dentro de tu presupuesto y negociamos las mejores condiciones de compra. Incluye evaluación técnica de propiedades.",
            features: [
              "Búsqueda dirigida de propiedades",
              "Evaluación técnica profesional",
              "Negociación de precio y condiciones",
              "Análisis de documentos de la propiedad",
            ],
            background:
              "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80",
          },
          {
            icon: "HandHeart",
            title: "Cierre exitoso",
            subtitle: "Paso 5 de 5",
            description:
              "Gestionamos todo el proceso final desde la firma del contrato hasta la entrega de llaves. Incluye acompañamiento post-venta por 6 meses.",
            features: [
              "Gestión de trámites finales",
              "Acompañamiento en firma de escritura",
              "Coordinación de entrega de llaves",
              "Soporte post-venta por 6 meses",
            ],
            background:
              "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=2096&q=80",
          },
        ];

  const resolvedTitle = title || "Nuestro Proceso";
  const resolvedSubtitle =
    subtitle ||
    "Un método probado que te llevará desde la primera consulta hasta las llaves de tu nuevo hogar";
  const resolvedScrollHint =
    scrollHint || "Desliza hacia abajo para conocer cada paso";
  const resolvedCtaTitle = ctaTitle || "¿Listo para comenzar tu proceso?";
  const resolvedCtaBody =
    ctaBody ||
    "Cada uno de estos pasos está diseñado para maximizar tus posibilidades de éxito y hacer que el proceso sea lo más fluido posible.";
  const resolvedCtaPrimary = resolveCtaLink({
    label: ctaPrimaryLabel,
    url: ctaPrimaryTarget,
    link: ctaPrimaryLink,
    defaultLabel: "Iniciar mi proceso ahora",
    defaultUrl: "#contacto",
  });
  const resolvedCtaSecondary = resolveCtaLink({
    label: ctaSecondaryLabel,
    url: ctaSecondaryTarget,
    link: ctaSecondaryLink,
    defaultLabel: "Ver casos de éxito",
    defaultUrl: "#caso-exito",
  });
  const resolvedCtaStats =
    ctaStats?.length
      ? ctaStats
      : [
          { value: "60-90", label: "días promedio de proceso completo" },
          { value: "95%", label: "de satisfacción en nuestros clientes" },
          { value: "6 meses", label: "de acompañamiento post-venta" },
        ];

  const handleCtaClick = (target: string, windowTarget?: string) => {
    if (!target) {
      return;
    }
    if (windowTarget === "_blank") {
      window.open(target, "_blank", "noopener,noreferrer");
      return;
    }
    if (target.startsWith("#")) {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    window.location.href = target;
  };

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    const progress = progressRef.current;

    if (!section || !cards.length || !progress) return;

    // Set initial states
    gsap.set(cards, { opacity: 0, scale: 0.8 });
    gsap.set(cards[0], { opacity: 1, scale: 1 });

    // Create timeline for progress bar
    const progressTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    progressTl.to(progress, {
      width: "100%",
      ease: "none"
    });

    // Create scroll triggers for each card
    cards.forEach((card, index) => {
      const isLast = index === cards.length - 1;
      
      gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top center",
          end: isLast ? "bottom center" : "bottom top",
          toggleActions: "play none none reverse",
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power2.out"
            });
          },
          onLeave: () => {
            if (!isLast) {
              gsap.to(card, {
                opacity: 0,
                scale: 0.8,
                duration: 0.5,
                ease: "power2.in"
              });
            }
          },
          onEnterBack: () => {
            gsap.to(card, {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power2.out"
            });
          },
          onLeaveBack: () => {
            gsap.to(card, {
              opacity: 0,
              scale: 0.8,
              duration: 0.5,
              ease: "power2.in"
            });
          }
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [steps]);

  return (
    <section id="proceso" ref={sectionRef} className="relative">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
        <div 
          ref={progressRef}
          className="h-full bg-brand-brown transition-all duration-300"
          style={{ width: '0%' }}
        />
      </div>

      {/* Header Section */}
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              {resolvedTitle}
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {resolvedSubtitle}
            </p>
            <div className="mt-12">
              <div className="inline-flex items-center text-brand-brown">
                <span className="mr-2">{resolvedScrollHint}</span>
                <div className="w-6 h-10 border-2 border-brand-brown rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-brand-brown rounded-full mt-2 animate-bounce"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Cards */}
      {steps.map((step, index) => {
        const iconImageUrl = resolveMediaUrl(
          Array.isArray(step.icon) ? step.icon[0] : step.icon,
        );
        const iconKey =
          typeof step.icon === "string"
            ? step.icon.toLowerCase()
            : "search";
        const IconComponent = iconMap[iconKey] || Search;
        const features = step.features?.length
          ? step.features.map((feature) =>
              typeof feature === "string" ? feature : String(feature.feature ?? ""),
            )
          : [];
        return (
          <div
            key={index}
            ref={el => {
              if (el) cardsRef.current[index] = el;
            }}
            className="min-h-screen flex items-center justify-center relative overflow-hidden"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={step.background || ""}
                alt={step.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-brown/90 via-brand-brown/75 to-brand-brown/60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - Text Content */}
                <div className="text-white">
                  <div className="mb-6">
                    <span className="text-brand-cream text-lg font-medium">
                      {step.subtitle}
                    </span>
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-6">
                      {iconImageUrl ? (
                        <img
                          src={iconImageUrl}
                          alt={step.title}
                          className="w-8 h-8 object-contain"
                        />
                      ) : (
                        <IconComponent className="w-8 h-8 text-white" />
                      )}
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold">
                      {step.title}
                    </h3>
                  </div>

                  <p className="text-xl text-brand-cream mb-8 leading-relaxed">
                    {step.description}
                  </p>

                <div className="space-y-3">
                    {features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-white rounded-full mr-4 flex-shrink-0"></div>
                        <span className="text-brand-cream">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column - Visual Card */}
                <div className="lg:flex justify-center hidden">
                  <Card className="w-full max-w-md p-8 bg-white/95 backdrop-blur-md border-0 shadow-2xl">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center mx-auto mb-6">
                        {iconImageUrl ? (
                          <img
                            src={iconImageUrl}
                            alt={step.title}
                            className="w-10 h-10 object-contain"
                          />
                        ) : (
                          <IconComponent className="w-10 h-10 text-brand-brown" />
                        )}
                      </div>
                      
                      <div className="text-3xl font-bold text-brand-brown mb-2">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      
                      <h4 className="text-xl font-semibold text-gray-900 mb-4">
                        {step.title}
                      </h4>

                      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                        <div 
                          className="bg-brand-brown h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${((index + 1) / steps.length) * 100}%` }}
                        ></div>
                      </div>

                      <p className="text-gray-600 text-sm">
                        Progreso: {index + 1} de {steps.length} pasos
                      </p>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            {/* Step Navigation */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
              <div className="flex space-x-2">
                {steps.map((_, stepIndex) => (
                  <div
                    key={stepIndex}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      stepIndex <= index ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {/* CTA Section */}
      <div className="min-h-screen flex items-center justify-center bg-brand-cream">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {resolvedCtaTitle}
            </h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {resolvedCtaBody}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-brand-brown hover:bg-brand-brown-dark text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-lg"
                onClick={() =>
                  handleCtaClick(resolvedCtaPrimary.url, resolvedCtaPrimary.target)
                }
              >
                {resolvedCtaPrimary.label}
              </button>
              
              <button 
                className="border-2 border-brand-brown text-brand-brown hover:bg-brand-brown hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 text-lg"
                onClick={() =>
                  handleCtaClick(resolvedCtaSecondary.url, resolvedCtaSecondary.target)
                }
              >
                {resolvedCtaSecondary.label}
              </button>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6 text-left">
              {resolvedCtaStats.map((stat, statIndex) => (
                <Card
                  key={statIndex}
                  className="p-6 bg-white border border-brand-beige hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-2xl font-bold text-brand-brown mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
