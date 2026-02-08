import { useState, type MouseEvent } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
const logoImage = "/assets/daf712f9ccd73d3e18d8aa73235d6b4d79068111.png";

type MenuItem = {
  id: number;
  title: string;
  url: string;
  target?: string;
  order?: number;
};

type HeaderProps = {
  menuItems?: MenuItem[];
  logoUrl?: string;
  siteName?: string;
  ctaLabel?: string;
  ctaTarget?: string;
  ctaLink?: unknown;
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

  if (typeof link === "string") {
    return { ...fallback, url: link || fallback.url };
  }
  if (link && typeof link === "object") {
    const { title, url: linkUrl, target } = link as LinkField;
    return {
      label: title || fallback.label,
      url: linkUrl || fallback.url,
      target,
    };
  }
  return fallback;
}

export function Header({
  menuItems,
  logoUrl,
  siteName,
  ctaLabel,
  ctaTarget,
  ctaLink,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems =
    menuItems?.length &&
    [...menuItems]
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((item) => ({
        label: item.title,
        href: item.url,
        target: item.target,
      }));

  const handleScroll = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  const resolvedLogo = logoUrl || logoImage;
  const resolvedName = siteName || "";
  const resolvedCta = resolveLink({
    label: ctaLabel,
    url: ctaTarget,
    link: ctaLink,
    defaultLabel: "Analicemos tu caso",
    defaultUrl: "#contacto",
  });

  const handleCtaClick = () => {
    if (resolvedCta.target === "_blank") {
      window.open(resolvedCta.url, "_blank", "noopener,noreferrer");
      return;
    }
    if (resolvedCta.url.startsWith("#")) {
      document
        .querySelector(resolvedCta.url)
        ?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (resolvedCta.url) {
      window.location.href = resolvedCta.url;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-brand-beige">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#inicio" className="flex items-center space-x-3">
              <img
                src={resolvedLogo}
                alt="nomasarriendo.cl logo"
                className="w-10 h-10 lg:w-12 lg:h-12"
              />
              <span className="text-xl font-semibold text-gray-900">
                {resolvedName}
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          {navItems && (
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  target={item.target || undefined}
                  rel={item.target === "_blank" ? "noreferrer" : undefined}
                  className="text-gray-600 hover:text-brand-brown transition-colors duration-200 font-medium"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}

          {/* CTA Button Desktop */}
          <div className="hidden lg:flex">
            <Button
              className="bg-brand-brown hover:bg-brand-brown-dark text-white px-6 py-2.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
              onClick={handleCtaClick}
            >
              {resolvedCta.label}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-brand-beige bg-white">
            <nav className="py-4 space-y-2">
              {navItems &&
                navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleScroll(e, item.href)}
                    target={item.target || undefined}
                    rel={item.target === "_blank" ? "noreferrer" : undefined}
                    className="block px-4 py-3 text-gray-600 hover:text-brand-brown hover:bg-brand-cream transition-colors duration-200 font-medium"
                  >
                    {item.label}
                  </a>
                ))}
              <div className="px-4 pt-4">
                <Button
                  className="w-full bg-brand-brown hover:bg-brand-brown-dark text-white py-3 rounded-lg transition-all duration-200 shadow-lg"
                  onClick={() => {
                    handleCtaClick();
                    setIsMenuOpen(false);
                  }}
                >
                  {resolvedCta.label}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
