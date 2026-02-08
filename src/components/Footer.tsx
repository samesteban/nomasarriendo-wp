import type { MouseEvent } from "react";
import { Facebook, Instagram, Linkedin, Mail, Phone } from "lucide-react";
const logoImage = "/assets/daf712f9ccd73d3e18d8aa73235d6b4d79068111.png";

type MenuItem = {
  id: number;
  title: string;
  url: string;
  target?: string;
  order?: number;
};

type LinkItem = {
  label: string;
  url: string;
};

type SocialLink = {
  label: string;
  url: string;
  icon?: unknown;
};

type FooterProps = {
  menuItems?: MenuItem[];
  logoUrl?: string;
  siteName?: string;
  description?: string;
  email?: string;
  phone?: string;
  notice?: string;
  legalLinks?: LinkItem[];
  servicesTitle?: string;
  services?: { service?: string }[];
  socialLinks?: SocialLink[];
};

const socialIconMap: Record<string, typeof Facebook> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
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

export function Footer({
  menuItems,
  logoUrl,
  siteName,
  description,
  email,
  phone,
  notice,
  legalLinks,
  servicesTitle,
  services,
  socialLinks,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const quickLinks = menuItems?.length
    ? [...menuItems]
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((item) => ({
          label: item.title,
          href: item.url,
          target: item.target,
        }))
    : [
        { label: "Inicio", href: "#inicio", target: "_self" },
        { label: "Proceso", href: "#proceso", target: "_self" },
        { label: "Caso de Éxito", href: "#caso-exito", target: "_self" },
        { label: "Por qué elegirnos", href: "#por-que", target: "_self" },
      ];

  const resolvedLegalLinks =
    legalLinks?.length &&
    legalLinks.map((link) => ({ label: link.label, href: link.url }));

  const resolvedLogo = logoUrl || logoImage;
  const resolvedName = siteName || "nomasarriendo.cl";
  const resolvedDescription =
    description ||
    "Tu aliado en el proceso de compra de tu nuevo hogar. Acompañamiento profesional y personalizado desde la primera consulta hasta las llaves.";
  const resolvedEmail = email || "contacto@nomasarriendo.cl";
  const resolvedPhone = phone || "+56 2 2345 6789";
  const resolvedNotice =
    notice ||
    "nomasarriendo.cl es una empresa de asesorías inmobiliarias. No somos corredores de propiedades ni ofrecemos servicios de domicilio. Nuestros servicios se enfocan en la consultoría y acompañamiento profesional en procesos de compra habitacional.";
  const resolvedServicesTitle = servicesTitle || "Servicios";
  const resolvedServices = services?.length
    ? services.map((item) => String(item.service ?? "")).filter(Boolean)
    : [
        "Asesoría financiera",
        "Búsqueda de propiedades",
        "Gestión de créditos",
        "Acompañamiento legal",
        "Post-venta",
      ];
  const resolvedSocialLinks = socialLinks?.length
    ? socialLinks
    : [
        { label: "Facebook", url: "#", icon: "facebook" },
        { label: "Instagram", url: "#", icon: "instagram" },
        { label: "LinkedIn", url: "#", icon: "linkedin" },
      ];

  const handleScroll = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="text-white bg-gray-900">
      <div className="container px-6 mx-auto lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <img
                  src={resolvedLogo}
                  alt="nomasarriendo.cl logo"
                  className="w-12 h-12 p-1 bg-white rounded-full"
                />
                <span className="text-xl font-semibold">{resolvedName}</span>
              </div>

              <p className="leading-relaxed text-gray-400">
                {resolvedDescription}
              </p>

              <div className="space-y-3">
                <div className="flex items-center text-gray-400">
                  <Mail className="w-5 h-5 mr-3" />
                  <span>{resolvedEmail}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Phone className="w-5 h-5 mr-3" />
                  <span>{resolvedPhone}</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-6 text-lg font-semibold">Enlaces rápidos</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleScroll(e, link.href)}
                      target={link.target || undefined}
                      rel={link.target === "_blank" ? "noreferrer" : undefined}
                      className="text-gray-400 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="mb-6 text-lg font-semibold">
                {resolvedServicesTitle}
              </h3>
              <ul className="space-y-3 text-gray-400">
                {resolvedServices.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>

            {/* Contact & Social */}
            <div>
              <h3 className="mb-6 text-lg font-semibold">Síguenos</h3>

              <div className="flex mb-6 space-x-4">
                {resolvedSocialLinks.map((link) => {
                  const iconUrl = resolveMediaUrl(link.icon);
                  const Icon =
                    typeof link.icon === "string"
                      ? socialIconMap[link.icon.toLowerCase()] || Facebook
                      : Facebook;
                  return (
                    <a
                      key={link.label}
                      href={link.url}
                      className="flex items-center justify-center w-10 h-10 transition-colors duration-200 bg-gray-800 rounded-full hover:bg-blue-600"
                      aria-label={link.label}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {iconUrl ? (
                        <img
                          src={iconUrl}
                          alt={link.label}
                          className="object-contain w-5 h-5 invert"
                        />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </a>
                  );
                })}
              </div>

              {/* CTA Footer */}
              <div className="p-4 rounded-lg brand-gradient">
                <h4 className="mb-2 font-semibold">¿Listo para empezar?</h4>
                <p className="mb-3 text-sm text-brand-cream">
                  Agenda tu evaluación gratuita hoy
                </p>
                <button
                  className="w-full px-4 py-2 text-sm font-semibold transition-colors duration-200 bg-white rounded text-brand-brown hover:bg-brand-cream"
                  onClick={() =>
                    document
                      .querySelector("#contacto")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Contactar ahora
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0">
            {/* Copyright */}
            <div
              className={
                `text-gray-400 text-sm flex-1` +
                (resolvedLegalLinks ? " text-left" : " text-center")
              }
            >
              © {currentYear} nomasarriendo.cl. Todos los derechos reservados.
            </div>

            {/* Legal Links */}
            {resolvedLegalLinks && (
              <div className="flex flex-wrap items-center space-x-6 text-sm">
                {resolvedLegalLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-gray-400 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Legal Notice */}
          <div className="pt-6 mt-6 text-xs text-center text-gray-500 border-t border-gray-800">
            <p>{resolvedNotice}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
