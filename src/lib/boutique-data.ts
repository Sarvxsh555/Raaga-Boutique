import bridal from "@/assets/collection-bridal.jpg";
import saree from "@/assets/collection-saree.jpg";
import kurti from "@/assets/collection-kurti.jpg";
import lehenga from "@/assets/collection-lehenga.jpg";
import kids from "@/assets/collection-kids.jpg";
import custom from "@/assets/collection-custom.jpg";

export const COLLECTIONS = [
  { slug: "sarees", name: "Sarees", image: saree, tagline: "Drapes of heritage" },
  { slug: "kurtis", name: "Kurtis", image: kurti, tagline: "Everyday elegance" },
  { slug: "lehengas", name: "Lehengas", image: lehenga, tagline: "Celebration silhouettes" },
  { slug: "bridal", name: "Bridal Collections", image: bridal, tagline: "Once-in-a-lifetime" },
  { slug: "kids", name: "Kids Wear", image: kids, tagline: "Little couture" },
  { slug: "custom", name: "Custom Designs", image: custom, tagline: "Made to your measure" },
] as const;

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  sizes: string[];
  fabric: string;
  colors: { name: string; hex: string }[];
  image: string;
  occasion: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "p1", name: "Indigo Bloom Silk Saree", category: "Sarees", price: 38500,
    description: "Hand-loomed Kanjivaram silk with gold zari botanicals along the pallu.",
    sizes: ["Free Size"], fabric: "Pure Kanjivaram Silk",
    colors: [{ name: "Ink Blue", hex: "#6D8196" }, { name: "Ivory", hex: "#FFFFE3" }],
    image: saree, occasion: "Wedding",
  },
  {
    id: "p2", name: "Ivory Heritage Lehenga", category: "Bridal", price: 124000,
    description: "Bridal lehenga in raw silk, hand-embroidered with pearl and zardozi.",
    sizes: ["XS", "S", "M", "L"], fabric: "Raw Silk · Pearl",
    colors: [{ name: "Ivory", hex: "#FFFFE3" }, { name: "Champagne", hex: "#E7DCB6" }],
    image: bridal, occasion: "Bridal",
  },
  {
    id: "p3", name: "Sand Whisper Kurti", category: "Kurtis", price: 6800,
    description: "A whisper-soft kurti in sand-toned modal silk with mother-of-pearl buttons.",
    sizes: ["XS", "S", "M", "L", "XL"], fabric: "Modal Silk",
    colors: [{ name: "Sand", hex: "#CFB890" }, { name: "Slate", hex: "#6D8196" }],
    image: kurti, occasion: "Daywear",
  },
  {
    id: "p4", name: "Champagne Mirage Lehenga", category: "Lehengas", price: 56000,
    description: "Champagne georgette flare with sequined floral cascade.",
    sizes: ["S", "M", "L"], fabric: "Georgette · Sequin",
    colors: [{ name: "Champagne", hex: "#E7DCB6" }, { name: "Rose Gold", hex: "#D9A57D" }],
    image: lehenga, occasion: "Reception",
  },
  {
    id: "p5", name: "Petite Rose Anarkali", category: "Kids", price: 9400,
    description: "A featherlight anarkali for little ones, in blush rose with thread work.",
    sizes: ["2Y", "4Y", "6Y", "8Y", "10Y"], fabric: "Cotton Silk",
    colors: [{ name: "Blush", hex: "#F5C9C0" }, { name: "Ivory", hex: "#FFFFE3" }],
    image: kids, occasion: "Festive",
  },
  {
    id: "p6", name: "The Bespoke Trench", category: "Custom", price: 0,
    description: "Tailored to your silhouette. Choose fabric, lining and finishing in studio.",
    sizes: ["Made to Measure"], fabric: "Selectable",
    colors: [{ name: "Ink", hex: "#6D8196" }, { name: "Bone", hex: "#EFE9D7" }, { name: "Crimson", hex: "#9B3A3A" }],
    image: custom, occasion: "Bespoke",
  },
  {
    id: "p7", name: "Midnight Pleat Saree", category: "Sarees", price: 42000,
    description: "Pleated satin saree finished with a delicate gold border.",
    sizes: ["Free Size"], fabric: "Satin Silk",
    colors: [{ name: "Midnight", hex: "#2A3A4D" }], image: saree, occasion: "Cocktail",
  },
  {
    id: "p8", name: "Pearl Bridal Veil Set", category: "Bridal", price: 158000,
    description: "Three-piece bridal ensemble with hand-set freshwater pearls.",
    sizes: ["XS", "S", "M", "L"], fabric: "Silk · Pearl",
    colors: [{ name: "Ivory", hex: "#FFFFE3" }], image: bridal, occasion: "Bridal",
  },
];

export const TESTIMONIALS = [
  { name: "Aanya Mehta", city: "Mumbai", rating: 5, text: "Raaga made my bridal lehenga feel like a private symphony. The fittings, the fabrics — every detail considered." },
  { name: "Ishita Rao", city: "Bengaluru", rating: 5, text: "Heirloom craftsmanship without the heaviness. I wore my saree at a state dinner and it photographed beautifully." },
  { name: "Priya Suresh", city: "Chennai", rating: 5, text: "From sketch to final stitch, the atelier listened to every word. The result was emotional." },
  { name: "Sara Khan", city: "Delhi", rating: 5, text: "The kurtis fit like they were grown around me. I keep returning for the quiet luxury." },
  { name: "Meher Joshi", city: "Pune", rating: 5, text: "A house that respects tradition and tailors for now. Raaga is my forever address." },
  { name: "Naina Iyer", city: "Hyderabad", rating: 5, text: "I trusted Raaga with my mother's saree restoration. It came back as poetry." },
];
