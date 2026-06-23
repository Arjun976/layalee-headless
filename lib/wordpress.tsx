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

export interface WordPressData {
  themeSettings: ThemeSettings | null;
  navMenus: NavMenus | null;
  homepage: any;
  productCategories: any;
  products: any;
}

export async function getHeaderAndHomePageData(homepageUri = "/"): Promise<WordPressData> {
  const secret = process.env.Secret;
  if (!secret) {
    console.error("Error: Secret environment variable is not defined.");
    return { themeSettings: null, navMenus: null, homepage: null, productCategories: null, products: null };
  }

  const endpoint = secret.endsWith('/graphql') ? secret : `${secret}/graphql`;

  const query = `
    query GetHeaderAndHomePageData($homepageUri: ID! = "/") {
      # ── 1. WHOLE HEADER & MENU DATA ──
      layaleThemeSettings
      layaleNavMenus

      # ── 2. WHOLE HOMEPAGE DATA ──
      homepage: page(id: $homepageUri, idType: URI) {
        id
        databaseId
        title
        content
        homeCommonOptions
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
        variables: { homepageUri },
      }),
      next: { revalidate: process.env.NODE_ENV === 'development' ? 0 : 60 }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
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
    const homepage = data?.homepage || null;
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
