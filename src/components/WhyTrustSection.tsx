import { Card } from './ui/card';
import { Shield, Users, Award, TrendingUp, CheckCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Advantage = {
  title?: string;
  description?: string;
  icon?: unknown;
};

type Guarantee = { guarantee?: string } | string;

type WhyTrustProps = {
  title?: string;
  subtitle?: string;
  advantagesTitle?: string;
  advantages?: Advantage[];
  guaranteesTitle?: string;
  guarantees?: Guarantee[];
  storyTitle?: string;
  storyBody?: string;
  teamImage?: string;
  teamTitle?: string;
  teamText?: string;
  ctaTitle?: string;
  ctaBody?: string;
  ctaLabel?: string;
  ctaTarget?: string;
  ctaLink?: unknown;
};

const iconMap: Record<string, typeof Shield> = {
  shield: Shield,
  users: Users,
  award: Award,
  trendingup: TrendingUp,
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

export function WhyTrustSection({
  title,
  subtitle,
  advantagesTitle,
  advantages,
  guaranteesTitle,
  guarantees,
  storyTitle,
  storyBody,
  teamImage,
  teamTitle,
  teamText,
  ctaTitle,
  ctaBody,
  ctaLabel,
  ctaTarget,
  ctaLink,
}: WhyTrustProps) {
  const resolvedTitle = title || "Por qué confiar en nosotros";
  const resolvedSubtitle =
    subtitle ||
    "Somos más que asesores, somos tus aliados en la decisión más importante de tu vida";
  const resolvedAdvantagesTitle =
    advantagesTitle || "Nuestras ventajas competitivas";
  const resolvedAdvantages =
    advantages?.length
      ? advantages
      : [
          {
            icon: "Shield",
            title: "Transparencia total",
            description: "Sin costos ocultos, proceso claro y comunicación constante",
          },
          {
            icon: "Users",
            title: "Alianzas estratégicas",
            description:
              "Red de partners inmobiliarios, bancos y servicios especializados",
          },
          {
            icon: "Award",
            title: "Experiencia comprobada",
            description: "10 años en el mercado con resultados exitosos documentados",
          },
          {
            icon: "TrendingUp",
            title: "Metodología probada",
            description: "Proceso estructurado que maximiza tus posibilidades de éxito",
          },
        ];
  const resolvedGuaranteesTitle =
    guaranteesTitle || "Garantías adicionales";
  const resolvedGuarantees =
    guarantees?.length
      ? guarantees.map((item) =>
          typeof item === "string" ? item : String(item.guarantee ?? ""),
        )
      : [
          "Acompañamiento post-venta por 6 meses",
          "Revisión legal de todos los documentos",
          "Red de contactos para servicios complementarios",
        ];
  const resolvedStoryTitle = storyTitle || "Nuestra historia";
  const resolvedStoryBody =
    storyBody ||
    "Nacimos en 2014 con una visión clara: democratizar el acceso a la vivienda propia en Chile, brindando asesoría especializada y acompañamiento integral a familias que buscan dejar el arriendo atrás.\n\nA lo largo de estos años, hemos perfeccionado nuestra metodología de trabajo, construido alianzas estratégicas con los principales actores del mercado inmobiliario y, lo más importante, ayudado a más de 150 familias a cumplir el sueño de la casa propia.\n\nNuestro equipo está formado por profesionales con amplia experiencia en finanzas, mercado inmobiliario y gestión de procesos, todos unidos por el mismo objetivo: hacer realidad tu proyecto habitacional.";
  const resolvedTeamImage =
    teamImage ||
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
  const resolvedTeamTitle = teamTitle || "Nuestro equipo de expertos";
  const resolvedTeamText =
    teamText || "Profesionales comprometidos con tu éxito inmobiliario";
  const resolvedCtaTitle = ctaTitle || "¿Listo para conocer más?";
  const resolvedCtaBody =
    ctaBody || "Agenda una reunión gratuita con nuestro equipo";
  const resolvedCta = resolveCtaLink({
    label: ctaLabel,
    url: ctaTarget,
    link: ctaLink,
    defaultLabel: "Agendar reunión",
    defaultUrl: "#contacto",
  });

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

  return (
    <section id="por-que" className="py-16 lg:py-24 bg-brand-cream">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {resolvedTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {resolvedSubtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Advantages Column */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">
                {resolvedAdvantagesTitle}
              </h3>
              
              {resolvedAdvantages.map((advantage, index) => {
                const iconUrl = resolveMediaUrl(advantage.icon);
                const iconKey = typeof advantage.icon === "string"
                  ? advantage.icon.toLowerCase()
                  : "shield";
                const IconComponent = iconMap[iconKey] || Shield;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-brand-beige rounded-lg flex items-center justify-center">
                        {iconUrl ? (
                          <img
                            src={iconUrl}
                            alt={advantage.title}
                            className="w-6 h-6 object-contain"
                          />
                        ) : (
                          <IconComponent className="w-6 h-6 text-brand-brown" />
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {advantage.title}
                      </h4>
                      <p className="text-gray-600">
                        {advantage.description}
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Additional Benefits */}
              <Card className="p-6 bg-brand-beige border border-brand-tan">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  {resolvedGuaranteesTitle}
                </h4>
                <ul className="space-y-2 text-gray-700">
                  {resolvedGuarantees.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-brand-brown rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Company Story Column */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                  {resolvedStoryTitle}
                </h3>
                
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  {resolvedStoryBody
                    .split("\n")
                    .filter((paragraph) => paragraph.trim().length > 0)
                    .map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex}>{paragraph}</p>
                    ))}
                </div>
              </div>

              {/* Team Photo */}
              <Card className="overflow-hidden">
                <ImageWithFallback
                  src={resolvedTeamImage}
                  alt="Equipo nomasarriendo.cl"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {resolvedTeamTitle}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {resolvedTeamText}
                  </p>
                </div>
              </Card>

              {/* Contact CTA */}
              <Card className="p-6 brand-gradient text-white text-center">
                <h4 className="text-lg font-semibold mb-2">
                  {resolvedCtaTitle}
                </h4>
                <p className="mb-4 text-brand-cream">
                  {resolvedCtaBody}
                </p>
                <button 
                  className="bg-white text-brand-brown px-6 py-3 rounded-lg font-semibold hover:bg-brand-cream transition-colors duration-200"
                  onClick={() => handleCtaClick(resolvedCta.url, resolvedCta.target)}
                >
                  {resolvedCta.label}
                </button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
