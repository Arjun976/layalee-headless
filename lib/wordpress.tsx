export interface StripItem {
  text: string;
  icon_svg: string;
}

export interface HeaderStripItems {
  enable_header_strip?: string;
  strip_items?: StripItem[];
}

export interface LogoSettings {
  logo_svg?: string;
}

export interface ThemeSettings {
  header_strip_items?: HeaderStripItems;
  logo_settings?: LogoSettings;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface NavMenuItem {
  id: number;
  parentId: number;
  label: string;
  url: string;
  order: number;
  target?: string;
  classes?: string[];
}

export interface NavMenus {
  primary?: NavMenuItem[];
  footer?: NavMenuItem[];
  shop?: NavMenuItem[];
  company?: NavMenuItem[];
  legal?: NavMenuItem[];
}

export interface SlideData {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryText?: string;
  primaryUrl?: string;
  secondaryText?: string;
  secondaryUrl?: string;
}

export interface ScrollData {
  text?: string;
  target?: string;
}

export interface BannerData {
  enabled?: boolean;
  slides?: SlideData[];
  scroll?: ScrollData;
}

export interface CategoriesData {
  enabled?: boolean;
  title?: string;
  subtitle?: string;
}

export interface ColorImageData {
  url?: string;
}

export interface ColorData {
  colorCode?: string;
  colorImage?: ColorImageData;
}

export interface FeaturedProductData {
  productId?: number | string;
  isNew?: boolean;
  isBestseller?: boolean;
  colors?: ColorData[];
}

export interface FeaturedData {
  enabled?: boolean;
  subtitle?: string;
  title?: string;
  products?: FeaturedProductData[];
}

export interface PromoCardButtonData {
  text?: string;
  url?: string;
}

export interface PromoCardData {
  enabled?: boolean;
  style?: string;
  subtitle?: string;
  title?: string;
  description?: string;
  button?: PromoCardButtonData;
}

export interface FeatureItemData {
  title?: string;
  description?: string;
  icon?: string;
}

export interface ExpertAssistanceData {
  enabled?: boolean;
  subtitle?: string;
  title?: string;
  description?: string;
  image?: {
    url?: string;
  };
  features?: FeatureItemData[];
  button?: PromoCardButtonData;
}

export interface InspiredImageData {
  layoutType?: string;
  image?: {
    url?: string;
  };
}

export interface GetInspiredData {
  enabled?: boolean;
  subtitle?: string;
  title?: string;
  description?: string;
  images?: InspiredImageData[];
}

export interface PromiseItemData {
  title?: string;
  description?: string;
  icon?: string;
}

export interface PromiseData {
  enabled?: boolean;
  subtitle?: string;
  title?: string;
  items?: PromiseItemData[];
}

export interface NatureInspiredItemData {
  link?: string;
  image?: {
    url?: string;
  };
}

export interface NatureInspiredData {
  enabled?: boolean;
  subtitle?: string;
  title?: string;
  items?: NatureInspiredItemData[];
}

export interface LayaleHomeData {
  banner?: BannerData;
  categories?: CategoriesData;
  featured?: FeaturedData;
  promoCards?: PromoCardData[];
  expertAssistance?: ExpertAssistanceData;
  getInspired?: GetInspiredData;
  promise?: PromiseData;
  natureInspired?: NatureInspiredData;
}

export interface WordPressData {
  themeSettings: ThemeSettings | null;
  navMenus: NavMenus | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  homepage: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  productCategories: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  products: any;
}

export async function getHeaderAndHomePageData(): Promise<WordPressData> {
  const secret = process.env.Secret;
  if (!secret) {
    console.error("Error: Secret environment variable is not defined.");
    return { themeSettings: null, navMenus: null, homepage: null, productCategories: null, products: null };
  }

  const endpoint = secret.endsWith('/graphql') ? secret : `${secret}/graphql`;

  const query = `
    query GetHeaderAndHomePageData {
      # ── 1. WHOLE HEADER & MENU DATA ──
      layaleThemeSettings
      layaleNavMenus

      # ── 2. WHOLE HOMEPAGE DATA ──
      layaleHome {
        banner {
          enabled
          slides {
            subtitle
            title
            description
            primaryText
            primaryUrl
            secondaryText
            secondaryUrl
          }
          scroll {
            text
            target
          }
        }
        categories {
          enabled
          subtitle
          title
        }
        featured {
          enabled
          subtitle
          title
          products {
            productId
            isNew
            isBestseller
            colors {
              colorCode
              colorImage {
                url
              }
            }
          }
        }
        promoCards {
          enabled
          style
          subtitle
          title
          description
          button {
            text
            url
          }
        }
        expertAssistance {
          enabled
          subtitle
          title
          description
          image {
            url
          }
          features {
            title
            description
            icon
          }
          button {
            text
            url
          }
        }
        getInspired {
          enabled
          subtitle
          title
          description
          images {
            layoutType
            image {
              url
            }
          }
        }
        promise {
          enabled
          subtitle
          title
          items {
            title
            description
            icon
          }
        }
        natureInspired {
          enabled
          subtitle
          title
          items {
            link
            image {
              url
            }
          }
        }
      }

      # ── 3. PRODUCT CATEGORIES ──
      productCategories {
        nodes {
          id
          databaseId
          name
          slug
          uri
          categoryOptions
        }
      }

      # ── 4. PRODUCTS ──
      products(first: 100) {
        nodes {
          id
          databaseId
          title
          slug
          uri
        }
      }
    }
  `;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
      }),
      next: { revalidate: process.env.NODE_ENV === 'development' ? 0 : 60 }
    });

    if (!response.ok) {
      console.error(`GraphQL fetch failed! Status: ${response.status} ${response.statusText}`);
      return { themeSettings: null, navMenus: null, homepage: null, productCategories: null, products: null };
    }

    const resJson = await response.json();

    // Log the data in console as requested in step 9
    console.log("GraphQL API Data:", JSON.stringify(resJson, null, 2));

    if (resJson.errors) {
      console.error("GraphQL Errors:", resJson.errors);
      return { themeSettings: null, navMenus: null, homepage: null, productCategories: null, products: null };
    }

    const data = resJson.data;
    const rawThemeSettings = data?.layaleThemeSettings;
    const rawNavMenus = data?.layaleNavMenus;
    const layaleHome = data?.layaleHome || null;
    const productCategories = data?.productCategories || null;
    const products = data?.products || null;

    let themeSettings: ThemeSettings | null = null;
    let navMenus: NavMenus | null = null;

    if (rawThemeSettings) {
      try {
        themeSettings = JSON.parse(rawThemeSettings);
      } catch (e) {
        console.error("Error parsing layaleThemeSettings JSON string:", e);
      }
    }

    if (rawNavMenus) {
      try {
        navMenus = JSON.parse(rawNavMenus);
      } catch (e) {
        console.error("Error parsing layaleNavMenus JSON string:", e);
      }
    }

    const layaleHomeTyped = layaleHome as LayaleHomeData | null;

    // Map the new layaleHome query structure to the old homeCommonOptions structure to avoid breaking existing components
    let homepage = null;
    if (layaleHomeTyped) {
      homepage = {
        homeCommonOptions: {
          home_banner_fieldset: {
            home_banner_enable: layaleHomeTyped.banner?.enabled ? '1' : '0',
            home_banner_scroll_text: layaleHomeTyped.banner?.scroll?.text || '',
            home_banner_scroll_target: { url: layaleHomeTyped.banner?.scroll?.target || '' },
            home_banner_slides: (layaleHomeTyped.banner?.slides || []).map((slide: SlideData) => ({
              home_banner_slide_subtitle: slide.subtitle || '',
              home_banner_slide_title: slide.title || '',
              home_banner_slide_description: slide.description || '',
              home_banner_slide_primary_text: slide.primaryText || '',
              home_banner_slide_primary_link: { url: slide.primaryUrl || '' },
              home_banner_slide_secondary_text: slide.secondaryText || '',
              home_banner_slide_secondary_link: { url: slide.secondaryUrl || '' }
            }))
          },
          home_category_fieldset: {
            home_categories_enable: layaleHomeTyped.categories?.enabled ? '1' : '0',
            home_categories_subtitle: layaleHomeTyped.categories?.subtitle || '',
            home_categories_title: layaleHomeTyped.categories?.title || ''
          },
          home_featured_fieldset: {
            home_featured_enable: layaleHomeTyped.featured?.enabled ? '1' : '0',
            home_featured_subtitle: layaleHomeTyped.featured?.subtitle || '',
            home_featured_title: layaleHomeTyped.featured?.title || '',
            featured_products: (layaleHomeTyped.featured?.products || []).map((p: FeaturedProductData) => ({
              product_id: String(p.productId),
              is_new: p.isNew ? '1' : '0',
              is_bestseller: p.isBestseller ? '1' : '0',
              product_colors: (p.colors || []).map((c: ColorData) => ({
                color_code: c.colorCode || '',
                color_image: { url: c.colorImage?.url || '' }
              }))
            }))
          },
          home_featured_promo_cards: (layaleHomeTyped.promoCards || []).map((card: PromoCardData) => ({
            featured_promo_card_enable: card.enabled ? '1' : '0',
            featured_promo_card_style: card.style || '',
            featured_promo_card_subtitle: card.subtitle || '',
            featured_promo_card_title: card.title || '',
            featured_promo_card_description: card.description || '',
            featured_promo_card_button_text: card.button?.text || '',
            featured_promo_card_button_link: { url: card.button?.url || '' }
          })),
          expert_assistance_fieldset: {
            expert_enable: layaleHomeTyped.expertAssistance?.enabled ? '1' : '0',
            expert_subtitle: layaleHomeTyped.expertAssistance?.subtitle || '',
            expert_title: layaleHomeTyped.expertAssistance?.title || '',
            expert_description: layaleHomeTyped.expertAssistance?.description || '',
            expert_image: { url: layaleHomeTyped.expertAssistance?.image?.url || '' },
            expert_features: (layaleHomeTyped.expertAssistance?.features || []).map((f: FeatureItemData) => ({
              expert_feature_title: f.title || '',
              expert_feature_description: f.description || '',
              expert_feature_icon: f.icon || ''
            })),
            expert_button_text: layaleHomeTyped.expertAssistance?.button?.text || '',
            expert_button_link: { url: layaleHomeTyped.expertAssistance?.button?.url || '' }
          },
          getinspired_fieldset: {
            getinspired_enable: layaleHomeTyped.getInspired?.enabled ? '1' : '0',
            getinspired_subtitle: layaleHomeTyped.getInspired?.subtitle || '',
            getinspired_title: layaleHomeTyped.getInspired?.title || '',
            getinspired_description: layaleHomeTyped.getInspired?.description || '',
            getinspired_images: (layaleHomeTyped.getInspired?.images || []).map((img: InspiredImageData) => ({
              getinspired_image: { url: img.image?.url || '' },
              getinspired_image_class: img.layoutType || 'item-medium'
            }))
          },
          promise_section_fieldset: {
            promise_enable: layaleHomeTyped.promise?.enabled ? '1' : '0',
            promise_subtitle: layaleHomeTyped.promise?.subtitle || '',
            promise_title: layaleHomeTyped.promise?.title || '',
            promise_items: (layaleHomeTyped.promise?.items || []).map((item: PromiseItemData) => ({
              promise_title_item: item.title || '',
              promise_desc: item.description || '',
              promise_icon: item.icon || ''
            }))
          },
          nature_inspired_fieldset: {
            nature_enable: layaleHomeTyped.natureInspired?.enabled ? '1' : '0',
            nature_subtitle: layaleHomeTyped.natureInspired?.subtitle || '',
            nature_title: layaleHomeTyped.natureInspired?.title || '',
            nature_items: (layaleHomeTyped.natureInspired?.items || []).map((item: NatureInspiredItemData) => ({
              nature_image: { url: item.image?.url || '' },
              nature_link: item.link || ''
            }))
          }
        }
      };
    }

    return {
      themeSettings,
      navMenus,
      homepage,
      productCategories,
      products
    };
  } catch (error) {
    console.error("Error fetching GraphQL data from WordPress:", error);
    return { themeSettings: null, navMenus: null, homepage: null, productCategories: null, products: null };
  }
}
