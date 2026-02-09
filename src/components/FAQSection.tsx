import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

type FaqItem = { question?: string; answer?: string } | string;

type FAQSectionProps = {
  title?: string;
  subtitle?: string;
  faqs?: FaqItem[];
  ctaTitle?: string;
  ctaBody?: string;
  ctaLabel?: string;
  ctaTarget?: string;
  ctaLink?: unknown;
  whatsappUrl?: unknown;
};

type LinkField = {
  title?: string;
  url?: string;
  target?: string;
};

function resolveLink({
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
    const { title, url: linkUrl, target } = link as LinkField;
    return {
      label: title || fallback.label,
      url: linkUrl || fallback.url,
      target,
    };
  }
  return fallback;
}

export function FAQSection({
  title,
  subtitle,
  faqs,
  ctaTitle,
  ctaBody,
  ctaLabel,
  ctaTarget,
  ctaLink,
  whatsappUrl,
}: FAQSectionProps) {
  const resolvedTitle = title || 'Preguntas Frecuentes';
  const resolvedSubtitle =
    subtitle ||
    'Resolvemos las dudas más comunes sobre nuestro proceso y servicios';
  const resolvedFaqs =
    faqs?.length
      ? faqs.map((faq) =>
          typeof faq === 'string'
            ? { question: faq, answer: '' }
            : {
                question: faq.question || '',
                answer: faq.answer || '',
              },
        )
      : [
          {
            question: '¿Cuánto cuesta el servicio de asesoría?',
            answer:
              'Nuestra primera evaluación es completamente gratuita. Durante esta sesión analizamos tu situación y te explicamos nuestro proceso. Los costos del acompañamiento integral se definen según tu caso específico y se presentan de manera transparente antes de iniciar el proceso.',
          },
          {
            question: '¿Cuánto tiempo toma el proceso completo?',
            answer:
              'El tiempo varía según cada caso, pero en promedio el proceso completo toma entre 60 a 90 días desde la primera asesoría hasta la entrega de llaves. Esto incluye la evaluación financiera, búsqueda de la propiedad, negociación, gestión de crédito y todos los trámites legales.',
          },
          {
            question: '¿Necesito tener pie inicial para trabajar con ustedes?',
            answer:
              'No necesariamente. Existen diversas alternativas de financiamiento que permiten comprar con poco o sin pie inicial. Durante nuestra evaluación gratuita analizamos tu situación específica y te mostramos todas las opciones disponibles según tu perfil financiero.',
          },
          {
            question: '¿En qué comunas o regiones trabajan?',
            answer:
              "Trabajamos principalmente en la Región Metropolitana y las principales ciudades de las regiones de Valparaíso, O'Higgins y Biobío. Sin embargo, podemos evaluar casos en otras regiones dependiendo de la situación específica del cliente y las alianzas locales disponibles.",
          },
          {
            question: '¿Qué pasa si no califico para un crédito hipotecario?',
            answer:
              'No todos los casos requieren crédito hipotecario tradicional. Evaluamos alternativas como leasing habitacional, créditos con garantía estatal, subsidios habitacionales, y otras opciones de financiamiento. Si definitivamente no calificas, te orientamos sobre cómo mejorar tu perfil financiero para el futuro.',
          },
          {
            question: '¿Cómo se diferencian de una inmobiliaria tradicional?',
            answer:
              'Somos asesores independientes, no vendemos propiedades específicas. Nuestro enfoque está en TU proceso de compra, no en vender una propiedad particular. Te acompañamos de manera integral desde la evaluación financiera hasta post-venta, siempre velando por tus mejores intereses.',
          },
        ];
  const resolvedCtaTitle = ctaTitle || '¿Tienes más preguntas?';
  const resolvedCtaBody =
    ctaBody ||
    'No dudes en contactarnos. Estamos aquí para resolver todas tus dudas sin compromiso.';
  const resolvedCta = resolveLink({
    label: ctaLabel,
    url: ctaTarget,
    link: ctaLink,
    defaultLabel: 'Hacer una consulta',
    defaultUrl: '#contacto',
  });
  const resolvedWhatsApp = resolveLink({
    label: undefined,
    url: typeof whatsappUrl === 'string' ? whatsappUrl : undefined,
    link: whatsappUrl,
    defaultLabel: 'WhatsApp directo',
    defaultUrl: 'https://wa.me/56912345678',
  });

  const handleCtaClick = (target: string, windowTarget?: string) => {
    if (!target) return;
    if (windowTarget === '_blank') {
      window.open(target, '_blank', 'noopener,noreferrer');
      return;
    }
    if (target.startsWith('#')) {
      document
        .querySelector(target)
        ?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    window.location.href = target;
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {resolvedTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {resolvedSubtitle}
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {resolvedFaqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-200 rounded-lg px-6 hover:shadow-md transition-shadow duration-200"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-brand-brown transition-colors duration-200 py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact CTA */}
          <div className="text-center mt-12 p-8 bg-brand-cream rounded-lg border border-brand-beige">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {resolvedCtaTitle}
            </h3>
            <p className="text-gray-600 mb-6">
              {resolvedCtaBody}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="bg-brand-brown hover:bg-brand-brown-dark text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                onClick={() => handleCtaClick(resolvedCta.url, resolvedCta.target)}
              >
                {resolvedCta.label}
              </button>
              <a
                href={resolvedWhatsApp.url}
                target={resolvedWhatsApp.target || '_blank'}
                rel={
                  resolvedWhatsApp.target === '_blank'
                    ? 'noopener noreferrer'
                    : undefined
                }
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <span className="mr-2">💬</span>
                {resolvedWhatsApp.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
