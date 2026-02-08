export type MenuItem = {
  id: number;
  title: string;
  url: string;
  parent: number;
  order: number;
  target: string;
};

export type MenusResponse = {
  header: MenuItem[];
  footer: MenuItem[];
};

export type SiteOptions = {
  site_logo?: string;
  site_name?: string;
  header_cta_label?: string;
  header_cta_target?: string;
  header_cta?: { title?: string; url?: string; target?: string } | string;
  footer_description?: string;
  footer_email?: string;
  footer_phone?: string;
  footer_notice?: string;
  footer_legal_links?: { label: string; url: string }[];
  footer_services?: { service?: string }[];
  footer_title_services?: string;
  social_links?: { label: string; url: string; icon?: unknown }[];
};

export type LandingModule = {
  acf_fc_layout: string;
  [key: string]: unknown;
};

const WP_API_BASE =
  process.env.WP_API_BASE ?? "https://wp.nomasarriendo.cl/wp-json";
const WP_MENU_ENDPOINT =
  process.env.WP_MENU_ENDPOINT ??
  "https://wp.nomasarriendo.cl/wp-json/nomasarriendo/v1/menus";
const WP_FRONT_PAGE_ENDPOINT =
  process.env.WP_FRONT_PAGE_ENDPOINT ??
  `${WP_API_BASE}/nomasarriendo/v1/front-page`;
const WP_SITE_OPTIONS_ENDPOINT =
  process.env.WP_SITE_OPTIONS_ENDPOINT ??
  `${WP_API_BASE}/nomasarriendo/v1/site-options`;

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { next: { revalidate: 60 } });
  if (!response.ok) {
    throw new Error(`WP request failed: ${response.status} ${url}`);
  }
  return response.json() as Promise<T>;
}

export async function getMenus(): Promise<MenusResponse> {
  try {
    return await fetchJson<MenusResponse>(WP_MENU_ENDPOINT);
  } catch (error) {
    console.warn("Failed to load menus", error);
    return { header: [], footer: [] };
  }
}

export async function getSiteOptions(): Promise<SiteOptions> {
  try {
    const data = await fetchJson<SiteOptions>(WP_SITE_OPTIONS_ENDPOINT);
    return data ?? {};
  } catch (error) {
    console.warn("Failed to load site options", error);
    return {};
  }
}

export async function getLandingModules(): Promise<LandingModule[]> {
  try {
    const frontPageId = await getFrontPageId();
    if (!frontPageId) {
      return [];
    }

    const pageUrl = `${WP_API_BASE}/wp/v2/pages/${frontPageId}?acf_format=standard`;
    const page = await fetchJson<{ acf?: { modules?: LandingModule[] } }>(
      pageUrl,
    );
    return page?.acf?.modules ?? [];
  } catch (error) {
    console.warn("Failed to load landing modules", error);
    return [];
  }
}

async function getFrontPageId(): Promise<number | null> {
  try {
    const data = await fetchJson<{ id?: number; page_id?: number }>(
      WP_FRONT_PAGE_ENDPOINT,
    );
    return data.id ?? data.page_id ?? null;
  } catch (error) {
    console.warn("Failed to load front page id", error);
    return null;
  }
}

export async function getLandingData() {
  const [menus, options, modules] = await Promise.all([
    getMenus(),
    getSiteOptions(),
    getLandingModules(),
  ]);

  return { menus, options, modules };
}
