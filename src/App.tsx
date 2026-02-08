"use client";

import type { LandingModule, MenusResponse, SiteOptions } from "./lib/wp";

import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { StatsSection } from './components/StatsSection';
import { SuccessStorySection } from './components/SuccessStorySection';
import { ProcessSection } from './components/ProcessSection';
import { WhyTrustSection } from './components/WhyTrustSection';
import { WhatWeLookForSection } from './components/WhatWeLookForSection';
import { ContactSection } from './components/ContactSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';

type AppProps = {
  menus?: MenusResponse;
  options?: SiteOptions;
  modules?: LandingModule[];
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

function renderModule(module: LandingModule, index: number) {
  const layout = module.acf_fc_layout;

  switch (layout) {
    case "hero":
      return (
        <HeroSection
          key={`hero-${index}`}
          title={String(module.title ?? "")}
          subtitle={String(module.subtitle ?? "")}
          ctaPrimaryLabel={String(module.cta_primary_label ?? "")}
          ctaPrimaryTarget={String(module.cta_primary_target ?? "")}
          ctaSecondaryLabel={String(module.cta_secondary_label ?? "")}
          ctaSecondaryTarget={String(module.cta_secondary_target ?? "")}
          backgroundVideoUrl={resolveMediaUrl(module.background_video_url)}
          backgroundImageUrl={resolveMediaUrl(module.background_image_url)}
        />
      );
    case "stats":
      return (
        <StatsSection
          key={`stats-${index}`}
          items={Array.isArray(module.items) ? module.items : []}
        />
      );
    case "success_story":
      return (
        <SuccessStorySection
          key={`success-${index}`}
          title={String(module.title ?? "")}
          subtitle={String(module.subtitle ?? "")}
          image={resolveMediaUrl(module.image)}
          videoType={String(module.video_type ?? "")}
          videoUrl={resolveMediaUrl(
            (module as { video?: unknown; video_url?: unknown }).video ??
              (module as { video?: unknown; video_url?: unknown }).video_url,
          )}
          videoYoutube={String(
            (module as { video_youtube?: unknown }).video_youtube ?? "",
          )}
          quote={String(module.quote ?? "")}
          authorName={String(module.author_name ?? "")}
          authorMeta={String(module.author_meta ?? "")}
          results={Array.isArray(module.results) ? module.results : []}
          ctaLabel={String(module.cta_label ?? "")}
          ctaTarget={String(module.cta_target ?? "")}
        />
      );
    case "process":
      return (
        <ProcessSection
          key={`process-${index}`}
          title={String(module.title ?? "")}
          subtitle={String(module.subtitle ?? "")}
          scrollHint={String(module.scroll_hint ?? "")}
          ctaTitle={String(module.cta_title ?? "")}
          ctaBody={String(module.cta_body ?? "")}
          ctaPrimaryLabel={String(module.cta_primary_label ?? "")}
          ctaPrimaryTarget={String(module.cta_primary_target ?? "")}
          ctaPrimaryLink={(module as { cta_primary?: unknown }).cta_primary}
          ctaSecondaryLabel={String(module.cta_secondary_label ?? "")}
          ctaSecondaryTarget={String(module.cta_secondary_target ?? "")}
          ctaSecondaryLink={(module as { cta_secondary?: unknown }).cta_secondary}
          ctaStats={Array.isArray(module.cta_stats) ? module.cta_stats : []}
          steps={
            Array.isArray(module.steps)
              ? module.steps.map((step) => ({
                  ...step,
                  background: resolveMediaUrl(
                    (step as { background?: unknown }).background,
                  ),
                }))
              : []
          }
        />
      );
    case "why_trust":
      return (
        <WhyTrustSection
          key={`why-trust-${index}`}
          title={String(module.title ?? "")}
          subtitle={String(module.subtitle ?? "")}
          advantagesTitle={String(
            (module as { advantages_title?: unknown }).advantages_title ?? "",
          )}
          advantages={Array.isArray(module.advantages) ? module.advantages : []}
          guaranteesTitle={String(module.guarantees_title ?? "")}
          guarantees={Array.isArray(module.guarantees) ? module.guarantees : []}
          storyTitle={String(module.story_title ?? "")}
          storyBody={String(module.story_body ?? "")}
          teamImage={resolveMediaUrl(module.team_image)}
          teamTitle={String(module.team_title ?? "")}
          teamText={String(module.team_text ?? "")}
          ctaTitle={String((module as { cta_title?: unknown }).cta_title ?? "")}
          ctaBody={String(
            (module as { cta_description?: unknown }).cta_description ?? "",
          )}
          ctaLabel={String(module.cta_label ?? "")}
          ctaTarget={String(module.cta_target ?? "")}
          ctaLink={(module as { cta_button?: unknown }).cta_button}
        />
      );
    case "what_we_look_for":
      return (
        <WhatWeLookForSection
          key={`what-we-look-${index}`}
          title={String(module.title ?? "")}
          subtitle={String(module.subtitle ?? "")}
          requirements={
            Array.isArray(module.requirements) ? module.requirements : []
          }
          noticeTitle={String(module.notice_title ?? "")}
          noticeLeftTitle={String(module.notice_left_title ?? "")}
          noticeLeftBody={String(module.notice_left_body ?? "")}
          noticeRightTitle={String(module.notice_right_title ?? "")}
          noticeRightBody={String(module.notice_right_body ?? "")}
          noticeSummary={String(module.notice_summary ?? "")}
          ctaTitle={String((module as { cta_title?: unknown }).cta_title ?? "")}
          ctaLabel={String(module.cta_label ?? "")}
          ctaTarget={String(module.cta_target ?? "")}
          ctaLink={(module as { cta_target?: unknown }).cta_target}
        />
      );
    case "contact":
      return (
        <ContactSection
          key={`contact-${index}`}
          title={String(module.title ?? "")}
          subtitle={String(module.subtitle ?? "")}
          whatsapp={String(module.whatsapp ?? "")}
          whatsappUrl={String((module as { whatsapp?: unknown }).whatsapp ?? "")}
          email={String(module.email ?? "")}
          phone={String(module.phone ?? "")}
          hours={
            Array.isArray(module.hours)
              ? module.hours
              : String(module.hours ?? "")
          }
          hoursGuarantee={String(
            (module as { hours_guarantee?: unknown }).hours_guarantee ?? "",
          )}
          privacyNoteTitle={String(
            (module as { privacy_note_title?: unknown }).privacy_note_title ?? "",
          )}
          privacyNote={String(module.privacy_note ?? "")}
        />
      );
    case "faq":
      return (
        <FAQSection
          key={`faq-${index}`}
          title={String(module.title ?? "")}
          subtitle={String(module.subtitle ?? "")}
          faqs={Array.isArray(module.faqs) ? module.faqs : []}
          ctaTitle={String((module as { cta_titulo?: unknown }).cta_titulo ?? "")}
          ctaBody={String(
            (module as { cta_description?: unknown }).cta_description ?? "",
          )}
          ctaLabel={String(module.cta_label ?? "")}
          ctaTarget={String(module.cta_target ?? "")}
          ctaLink={(module as { cta_button?: unknown }).cta_button}
          whatsappUrl={(module as { whatsapp_url?: unknown }).whatsapp_url}
        />
      );
    default:
      return null;
  }
}

export default function App({ menus, options, modules }: AppProps) {
  const headerMenu = menus?.header ?? [];
  const footerMenu = menus?.footer ?? [];
  const hasModules = Array.isArray(modules) && modules.length > 0;

  return (
    <div className="min-h-screen">
      <Header
        menuItems={headerMenu}
        logoUrl={options?.site_logo}
        siteName={options?.site_name}
        ctaLabel={options?.header_cta_label}
        ctaTarget={options?.header_cta_target}
        ctaLink={options?.header_cta}
      />
      <main>
        {hasModules
          ? modules.map((module, index) => renderModule(module, index))
          : (
            <>
              <HeroSection />
              <StatsSection />
              <SuccessStorySection />
              <ProcessSection />
              <WhyTrustSection />
              <WhatWeLookForSection />
              <ContactSection />
              <FAQSection />
            </>
          )}
      </main>
      <Footer
        menuItems={footerMenu}
        logoUrl={options?.site_logo}
        siteName={options?.site_name}
        description={options?.footer_description}
        email={options?.footer_email}
        phone={options?.footer_phone}
        notice={options?.footer_notice}
        legalLinks={options?.footer_legal_links}
        servicesTitle={options?.footer_title_services}
        services={options?.footer_services}
        socialLinks={options?.social_links}
      />
    </div>
  );
}
