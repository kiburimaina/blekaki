export type Category = { slug: string; name: string; tone: string };

// Category taxonomy only. No products, prices or sellers: those come from the database in Milestone 2.
export const categories: Category[] = [
  { slug: "home-living", name: "Home & living", tone: "#E9DBC0" },
  { slug: "mattresses-bedding", name: "Mattresses & bedding", tone: "#D9C3A5" },
  { slug: "fashion-shoes", name: "Fashion & shoes", tone: "#E6D2C3" },
  { slug: "building-hardware", name: "Building & hardware", tone: "#CDBFA6" },
  { slug: "beauty-care", name: "Beauty & care", tone: "#DDD6BF" },
  { slug: "electronics", name: "Electronics", tone: "#E8D6B3" },
  { slug: "luggage-travel", name: "Luggage & travel", tone: "#D8CDB9" },
  { slug: "wholesale", name: "Wholesale lots", tone: "#C9B791" },
];
