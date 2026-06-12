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

const CURATED_PRODUCTS: Product[] = [
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

const photoImages = import.meta.glob<string>(
  "../assets/Photos/**/*.{jpg,jpeg,png,webp,avif}",
  { eager: true, query: "?url", import: "default" },
);

const categoryDetails: Record<string, Pick<Product, "category" | "sizes" | "fabric" | "occasion">> = {
  Saree: { category: "Sarees", sizes: ["Free Size"], fabric: "Designer Saree", occasion: "Festive" },
  Kurti: { category: "Kurtis", sizes: ["XS", "S", "M", "L", "XL"], fabric: "Designer Fabric", occasion: "Daywear" },
  Lehengas: { category: "Lehengas", sizes: ["XS", "S", "M", "L", "XL"], fabric: "Embroidered Fabric", occasion: "Wedding" },
  Kids: { category: "Kids", sizes: ["2Y", "4Y", "6Y", "8Y", "10Y"], fabric: "Comfort Fabric", occasion: "Festive" },
};

const colorPalette = [
  { keywords: ["black", "charcoal", "midnight"], name: "Midnight", hex: "#2A2730" },
  { keywords: ["blue", "indigo"], name: "Ink Blue", hex: "#496785" },
  { keywords: ["red", "velvet", "crimson"], name: "Crimson", hex: "#9B3A3A" },
  { keywords: ["mint", "green"], name: "Mint", hex: "#A8C8B0" },
  { keywords: ["gold", "champagne", "royal"], name: "Champagne", hex: "#D8BF86" },
  { keywords: ["violet", "purple"], name: "Violet", hex: "#76618E" },
  { keywords: ["pink", "rose", "blush"], name: "Blush", hex: "#DFA9B2" },
  { keywords: ["grey", "gray"], name: "Slate", hex: "#85878B" },
  { keywords: ["ivory", "white"], name: "Ivory", hex: "#F2EBDD" },
];

const PHOTO_DETAILS_OVERRIDE: Record<string, { name: string; description: string; fabric?: string; occasion?: string }> = {
  // Kids
  "Kids/cutest outfit ever 🫶🏻🩷.jpg": {
    name: "Rose Petal Organza Lehenga",
    description: "Delicate pink organza lehenga for children, featuring fine gold thread embroidery and a soft cotton inner lining.",
    fabric: "Organza Silk",
    occasion: "Festive",
  },
  "Kids/download.jpg": {
    name: "Aria Pastel Anarkali",
    description: "A pastel mint green kids' Anarkali suit in pure cotton silk with subtle lace details and a georgette dupatta.",
    fabric: "Cotton Silk",
    occasion: "Festive",
  },
  "Kids/Elegant Mint Green Kids Ethnic Outfit with Lace Detail 🌿.jpg": {
    name: "Sage Lace Kurta Set",
    description: "Kids ethnic set featuring a mint green kurta with exquisite scalloped lace trims and comfortable cotton trousers.",
    fabric: "Comfort Fabric",
    occasion: "Festive",
  },
  "Kids/Grey Casuals for kids, co-ord set inspo.jpg": {
    name: "Slate Linen Co-ord Set",
    description: "A lightweight, breathable grey linen co-ord set featuring a tunic-style top and soft trouser pants for kids.",
    fabric: "Linen",
    occasion: "Daywear",
  },
  "Kids/Look what I found on AliExpress.jpg": {
    name: "Amara Floral Angrakha",
    description: "Angrakha-style kids' kurta in a vibrant floral print, featuring tie-up side tassels and soft lining.",
    fabric: "Comfort Fabric",
    occasion: "Festive",
  },
  "Kids/SHEIN Teen Girls Shirt Co-Ords 2pcs_Set Elegant French-Style Lantern Sleeve Ruffled Bowknot Dress & Skirt Fall Winter.jpg": {
    name: "Elysian Ruffled Dress",
    description: "Elegant layered dress for young teens with delicate lace ruffles, a classic collar, and a tailored silhouette.",
    fabric: "Comfort Fabric",
    occasion: "Daywear",
  },
  "Kids/SHEIN Vestido Fofo com Gola Redonda e Manga Curta Bufante.jpg": {
    name: "Blush Meadow Frock",
    description: "Soft blush pink cotton dress with puffed sleeves and a gathered waistline, perfect for formal children's wear.",
    fabric: "Cotton",
    occasion: "Daywear",
  },
  "Kids/Toddler Girls' Retro Striped Print Sleeveless Set_ Retro Striped Pattern With Exquisite Embroidered Hem, Sleeveless Top + Wide-Leg Pants, Comfortable And Stylish, Suitable For Daily.jpg": {
    name: "Zara Striped Palazzo Set",
    description: "Retro-inspired striped top with a hand-embroidered hem paired with breathable wide-leg palazzo pants.",
    fabric: "Embroidered Fabric",
    occasion: "Daywear",
  },
  "Kids/Trendy Simple Design, Wood Grain Button Decoration Exquisite Line Trim Wave Collar Sleeveless Textil.jpg": {
    name: "Linen Wave Tunic Set",
    description: "Sleeveless linen tunic featuring a wave-cut collar and wooden button details, paired with straight trousers.",
    fabric: "Comfort Fabric",
    occasion: "Daywear",
  },

  // Kurti
  "Kurti/❤️❤️❤️__.jpg": {
    name: "Ruby Zardozi Kurti",
    description: "Rich crimson modal silk kurti adorned with intricate gold zardozi embroidery on the neck and yoke.",
    fabric: "Designer Fabric",
    occasion: "Festive",
  },
  "Kurti/9c2d807bd1ca5b9293159091a7daafc9.jpg": {
    name: "Ivory Jasmine Kurti",
    description: "Classic white cotton-silk kurti featuring delicate self-embroidery and sheer organza sleeves.",
    fabric: "Designer Fabric",
    occasion: "Daywear",
  },
  "Kurti/👗💙.jpg": {
    name: "Sapphire Silk Tunic",
    description: "Luxe raw silk tunic in deep sapphire blue, featuring a modern slit collar and hand-stitched details.",
    fabric: "Designer Fabric",
    occasion: "Daywear",
  },
  "Kurti/Black Floral Printed Kurti Top for Women _ Elegant Casual Wear Under ₹199.jpg": {
    name: "Midnight Dahlia Kurti",
    description: "Premium georgette kurti in deep black with vintage floral prints, perfect for transition wear.",
    fabric: "Designer Fabric",
    occasion: "Daywear",
  },
  "Kurti/download (1).jpg": {
    name: "Maya Georgette Kurta",
    description: "A mustard yellow georgette kurta with detailed white thread embroidery and a matching inner slip.",
    fabric: "Designer Fabric",
    occasion: "Daywear",
  },
  "Kurti/download.jpg": {
    name: "Avani Cotton Kurti",
    description: "Breathable daily-wear cotton kurti in a sage green palette with delicate running-stitch details.",
    fabric: "Designer Fabric",
    occasion: "Daywear",
  },
  "Kurti/Traditionals for you!.jpg": {
    name: "Vasudha Silk Kurta Set",
    description: "Three-piece heritage kurta set in tussar silk, finished with hand-blocked prints and gold zari borders.",
    fabric: "Designer Fabric",
    occasion: "Festive",
  },

  // Lehengas
  "Lehengas/download (2).jpg": {
    name: "Aura Mint Bridal Lehenga",
    description: "Mint green raw silk lehenga with extensive hand-embroidered zardozi and antique gold motifs.",
    fabric: "Embroidered Fabric",
    occasion: "Bridal",
  },
  "Lehengas/download.jpg": {
    name: "Gulabi Gota Lehenga",
    description: "A traditional bridal lehenga in rich hot pink, featuring elaborate gota patti border designs.",
    fabric: "Embroidered Fabric",
    occasion: "Bridal",
  },
  "Lehengas/Indian bridal lehenga.jpg": {
    name: "Varanasi Silk Lehenga",
    description: "Heirloom bridal lehenga crafted from pure Banarasi silk with intricate heritage gold thread weaves.",
    fabric: "Silk",
    occasion: "Bridal",
  },
  "Lehengas/Midnight Charcoal & Gold Embroidered Lehenga _ Designer Ethnic Wear.jpg": {
    name: "Charcoal Gilded Lehenga",
    description: "Contemporary charcoal grey lehenga featuring dramatic gold thread embroidery and sequined border highlights.",
    fabric: "Embroidered Fabric",
    occasion: "Wedding",
  },
  "Lehengas/Wonderful 🌸.jpg": {
    name: "Tara Blush Lehenga",
    description: "Chiffon lehenga in baby pink featuring delicate mirror-work and hand-painted floral borders.",
    fabric: "Embroidered Fabric",
    occasion: "Wedding",
  },

  // Saree
  "Saree/2744449769971285.jpg": {
    name: "Rani Silk Kanjivaram Saree",
    description: "Traditional pink Kanjivaram silk saree with contrast gold borders and hand-woven checks.",
    fabric: "Designer Saree",
    occasion: "Festive",
  },
  "Saree/dfca20923e74c7c01a6b1e4f94700831.jpg": {
    name: "Meera Chanderi Saree",
    description: "A lightweight mustard Chanderi saree featuring self-embossed floral motifs and a thin gold zari outline.",
    fabric: "Designer Saree",
    occasion: "Festive",
  },
  "Saree/download.jpg": {
    name: "Kalyani Organza Saree",
    description: "A modern organza saree in ice blue, finished with hand-painted florals and scalloped borders.",
    fabric: "Designer Saree",
    occasion: "Festive",
  },
  "Saree/Dreamy Violet Dupatta Bridal Lehenga _ Luxury Gold Embroidered Wedding Lehenga Set.jpg": {
    name: "Amethyst Royale Lehenga Saree",
    description: "A pre-draped lehenga saree in royal violet with an elaborate gold-embroidered velvet dupatta.",
    fabric: "Velvet",
    occasion: "Wedding",
  },
  "Saree/Gorgeous Sari.jpg": {
    name: "Surya Organza Saree",
    description: "Bright sun-yellow organza saree decorated with delicate silver gotapatti and pearl accents.",
    fabric: "Designer Saree",
    occasion: "Festive",
  },
  "Saree/Looking so gorgeous! 🤩🤩🤩.jpg": {
    name: "Saira Banarasi Saree",
    description: "Rich silk Banarasi saree in emerald green with intricate gold and silver floral brocade.",
    fabric: "Designer Saree",
    occasion: "Festive",
  },
  "Saree/Luxury Gold Bridal Dress That Looks Absolutely Royal ✨.jpg": {
    name: "Sitara Gilded Ensemble",
    description: "A stunning hand-embroidered champagne gold couture outfit with intricate beadwork and heavy zardozi.",
    fabric: "Designer Saree",
    occasion: "Bridal",
  },
  "Saree/Mint Green Floral Embroidered Saree – Custom Made Net Designer Saree.jpg": {
    name: "Flora Net Saree",
    description: "Pastel mint net saree adorned with multi-color floral hand embroidery and glass bead fringes.",
    fabric: "Designer Net",
    occasion: "Festive",
  },
  "Saree/Red drapped Lehnga for Indian Bride.jpg": {
    name: "Shahi Crimson Lehenga",
    description: "A bespoke crimson red bridal lehenga with layered styling, hand-embroidered with classic bridal zardozi motifs.",
    fabric: "Designer Saree",
    occasion: "Bridal",
  },
  "Saree/Royal Velvet Bridal Lehenga Saree ✨ _ Luxury Indian Wedding Couture in Red & Gold.jpg": {
    name: "Rajkumari Velvet Saree",
    description: "Rich maroon velvet saree paired with a heavy hand-embroidered gold blouse, designed for wedding receptions.",
    fabric: "Velvet",
    occasion: "Wedding",
  },
};

const cleanPhotoName = (filename: string, category: string, index: number) => {
  const decoded = decodeURIComponent(filename)
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (/^(download|[a-f0-9]{16,}|\d+)($|\s)/i.test(decoded) || decoded.length < 5) {
    return `${category} Edit ${String(index + 1).padStart(2, "0")}`;
  }
  return decoded.length > 68 ? `${decoded.slice(0, 65).trim()}...` : decoded;
};

const inferOccasion = (text: string, fallback: string) => {
  if (/bridal|bride/i.test(text)) return "Bridal";
  if (/wedding|lehenga/i.test(text)) return "Wedding";
  if (/casual|daily|kurti|co-ord/i.test(text)) return "Daywear";
  return fallback;
};

const inferFabric = (text: string, fallback: string) => {
  if (/silk/i.test(text)) return "Silk";
  if (/net/i.test(text)) return "Designer Net";
  if (/velvet/i.test(text)) return "Velvet";
  if (/embroider/i.test(text)) return "Embroidered Fabric";
  return fallback;
};

const inferColors = (text: string) => {
  const matches = colorPalette
    .filter(color => color.keywords.some(keyword => text.toLowerCase().includes(keyword)))
    .map(({ name, hex }) => ({ name, hex }));
  return matches.length ? matches : [{ name: "Assorted", hex: "#B8A89A" }];
};

const PHOTO_PRODUCTS: Product[] = Object.entries(photoImages)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, image], index) => {
    const parts = path.split("/");
    const folder = parts.at(-2) ?? "";
    const details = categoryDetails[folder] ?? {
      category: folder || "Collection",
      sizes: ["Made to Measure"],
      fabric: "Designer Fabric",
      occasion: "Festive",
    };
    const filename = parts.at(-1) ?? "";
    const key = `${folder}/${filename}`;
    const override = PHOTO_DETAILS_OVERRIDE[key];

    const name = override?.name ?? cleanPhotoName(filename, details.category, index);
    const searchableText = `${folder} ${filename} ${name}`;

    return {
      id: `photo-${index + 1}`,
      name,
      category: details.category,
      price: 0,
      description: override?.description ?? `${details.category} design from the Raaga boutique collection.`,
      sizes: details.sizes,
      fabric: override?.fabric ?? inferFabric(searchableText, details.fabric),
      colors: inferColors(searchableText),
      image,
      occasion: override?.occasion ?? inferOccasion(searchableText, details.occasion),
    };
  });

export const PRODUCTS: Product[] = [...PHOTO_PRODUCTS, ...CURATED_PRODUCTS];

export const TESTIMONIALS = [
  { name: "Aanya Mehta", city: "Mumbai", rating: 5, text: "Raaga made my bridal lehenga feel like a private symphony. The fittings, the fabrics — every detail considered." },
  { name: "Ishita Rao", city: "Bengaluru", rating: 5, text: "Heirloom craftsmanship without the heaviness. I wore my saree at a state dinner and it photographed beautifully." },
  { name: "Priya Suresh", city: "Chennai", rating: 5, text: "From sketch to final stitch, the atelier listened to every word. The result was emotional." },
  { name: "Sara Khan", city: "Delhi", rating: 5, text: "The kurtis fit like they were grown around me. I keep returning for the quiet luxury." },
  { name: "Meher Joshi", city: "Pune", rating: 5, text: "A house that respects tradition and tailors for now. Raaga is my forever address." },
  { name: "Naina Iyer", city: "Hyderabad", rating: 5, text: "I trusted Raaga with my mother's saree restoration. It came back as poetry." },
];
