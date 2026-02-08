import { Card } from './ui/card';
import { AlertTriangle, DollarSign, Heart, User } from 'lucide-react';

type RequirementItem = { item?: string } | string;
type Requirement = {
  title?: string;
  icon?: unknown;
  items?: RequirementItem[];
};

type WhatWeLookForProps = {
  title?: string;
  subtitle?: string;
  requirements?: Requirement[];
  noticeTitle?: string;
  noticeLeftTitle?: string;
  noticeLeftBody?: string;
  noticeRightTitle?: string;
  noticeRightBody?: string;
  noticeSummary?: string;
  ctaTitle?: string;
  ctaLabel?: string;
  ctaTarget?: string;
  ctaLink?: unknown;
};

const iconMap: Record<string, typeof User> = {
  user: User,
  dollarsign: DollarSign,
  heart: Heart,
};

type CtaLink = {
  title?: string;
  url?: string;
  target?: string;
};

function resolveMediaUrl(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }
  if (value && typeof value === 'object' && 'url' in value) {
    const url = (value as { url?: unknown }).url;
    return typeof url === 'string' ? url : '';
  }
  return '';
}

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

  if (typeof link === 'string') {
    return { ...fallback, url: link || fallback.url };
  }
  if (link && typeof link === 'object') {
    const { title, url: linkUrl, target } = link as CtaLink;
    return {
      label: title || fallback.label,
      url: linkUrl || fallback.url,
      target,
    };
  }
  return fallback;
}

export function WhatWeLookForSection({
  title,
  subtitle,
  requirements,
  noticeTitle,
  noticeLeftTitle,
  noticeLeftBody,
  noticeRightTitle,
  noticeRightBody,
  noticeSummary,
  ctaTitle,
  ctaLabel,
  ctaTarget,
  ctaLink,
}: WhatWeLookForProps) {
  const resolvedTitle = title || '¿Qué buscamos en ti?';
  const resolvedSubtitle =
    subtitle ||
    'No trabajamos con todos. Buscamos personas comprometidas con su proyecto habitacional y dispuestas a seguir un proceso serio y profesional.';
  const resolvedRequirements =
    requirements?.length
      ? requirements.map((requirement) => ({
          ...requirement,
          items: requirement.items?.length
            ? requirement.items.map((item) =>
                typeof item === 'string' ? item : String(item.item ?? ''),
              )
            : [],
        }))
      : [
          {
            icon: 'User',
            title: 'Perfil ideal',
            items: [
              'Personas o familias arrendatarias actuales',
              'Ingresos demostrables estables',
              'Capacidad de ahorro o pie inicial',
              'Disposición al acompañamiento profesional',
            ],
          },
          {
            icon: 'DollarSign',
            title: 'Situación financiera',
            items: [
              'Ingresos líquidos desde $800.000',
              'Capacidad de endeudamiento disponible',
              'Historial crediticio positivo o recuperable',
              'Compromiso con el proceso financiero',
            ],
          },
          {
            icon: 'Heart',
            title: 'Valores y actitud',
            items: [
              'Compromiso real con el proyecto',
              'Apertura a recibir orientación especializada',
              'Paciencia para seguir el proceso completo',
              'Confianza en el trabajo en equipo',
            ],
          },
        ];
  const resolvedNoticeTitle = noticeTitle || 'Importante: Lo que NO somos';
  const resolvedNoticeLeftTitle =
    noticeLeftTitle || 'No somos corredores de propiedades';
  const resolvedNoticeLeftBody =
    noticeLeftBody ||
    'No vendemos ni promocionamos propiedades específicas. Nuestro rol es asesorarte de manera independiente en tu proceso de compra.';
  const resolvedNoticeRightTitle =
    noticeRightTitle || 'No ofrecemos domicilios';
  const resolvedNoticeRightBody =
    noticeRightBody ||
    'Trabajamos de manera remota y digital. Nuestras reuniones son online o en nuestras oficinas, no realizamos visitas a domicilio.';
  const resolvedNoticeSummary =
    noticeSummary ||
    'Nuestro enfoque: Somos consultores especializados en procesos de compra inmobiliaria, brindamos asesoría integral y acompañamiento profesional durante todo tu proceso.';
  const resolvedCtaTitle = ctaTitle || '¿Te identificas con este perfil?';
  const resolvedCta = resolveCtaLink({
    label: ctaLabel,
    url: ctaTarget,
    link: ctaLink,
    defaultLabel: 'Evalúa mi caso sin costo',
    defaultUrl: '#contacto',
  });

  const handleCtaClick = (target: string, windowTarget?: string) => {
    if (!target) {
      return;
    }
    if (windowTarget === '_blank') {
      window.open(target, '_blank', 'noopener,noreferrer');
      return;
    }
    if (target.startsWith('#')) {
      document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    window.location.href = target;
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
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

          {/* Requirements Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {resolvedRequirements.map((requirement, index) => {
              const iconUrl = resolveMediaUrl(requirement.icon);
              const iconKey =
                typeof requirement.icon === 'string'
                  ? requirement.icon.toLowerCase()
                  : 'user';
              const IconComponent = iconMap[iconKey] || User;
              return (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-brand-beige"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-brand-cream rounded-full flex items-center justify-center">
                      {iconUrl ? (
                        <img
                          src={iconUrl}
                          alt={requirement.title}
                          className="w-8 h-8 object-contain"
                        />
                      ) : (
                        <IconComponent className="w-8 h-8 text-brand-brown" />
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                    {requirement.title}
                  </h3>

                  <ul className="space-y-3">
                    {requirement.items?.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className="flex items-start text-gray-600"
                      >
                        <div className="w-2 h-2 bg-brand-brown rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>

          {/* Important Notice */}
          <Card className="p-8 bg-amber-50 border border-amber-200">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <AlertTriangle className="w-8 h-8 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {resolvedNoticeTitle}
                </h3>

                <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-900">
                      {resolvedNoticeLeftTitle}
                    </h4>
                    <p className="text-sm leading-relaxed">
                      {resolvedNoticeLeftBody}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 text-gray-900">
                      {resolvedNoticeRightTitle}
                    </h4>
                    <p className="text-sm leading-relaxed">
                      {resolvedNoticeRightBody}
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white rounded-lg border border-amber-200">
                  <p className="text-sm text-gray-600 text-center">
                    {resolvedNoticeSummary}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 mb-6">
              {resolvedCtaTitle}
            </p>
            <button
              className="bg-brand-brown hover:bg-brand-brown-dark text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              onClick={() => handleCtaClick(resolvedCta.url, resolvedCta.target)}
            >
              {resolvedCta.label}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
