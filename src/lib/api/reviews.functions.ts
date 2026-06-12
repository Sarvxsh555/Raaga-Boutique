import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import fs from "node:fs/promises";
import path from "node:path";
import { TESTIMONIALS as DEFAULT_TESTIMONIALS } from "../boutique-data";

const REVIEWS_FILE = path.join(process.cwd(), "src", "lib", "reviews.json");

export type Review = {
  name: string;
  city: string;
  rating: number;
  text: string;
};

export const getReviews = createServerFn({ method: "GET" })
  .handler(async (): Promise<Review[]> => {
    try {
      const data = await fs.readFile(REVIEWS_FILE, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      // If the JSON file doesn't exist, initialize it with default testimonials
      try {
        await fs.mkdir(path.dirname(REVIEWS_FILE), { recursive: true });
        await fs.writeFile(REVIEWS_FILE, JSON.stringify(DEFAULT_TESTIMONIALS, null, 2), "utf-8");
      } catch (err) {
        console.error("Failed to initialize reviews file:", err);
      }
      return DEFAULT_TESTIMONIALS;
    }
  });

export const addReview = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      name: z.string().min(1, "Name is required"),
      city: z.string().min(1, "City is required"),
      rating: z.number().min(1).max(5),
      text: z.string().min(1, "Review text is required"),
    })
  )
  .handler(async ({ data }) => {
    let reviews: Review[] = [];
    try {
      const fileData = await fs.readFile(REVIEWS_FILE, "utf-8");
      reviews = JSON.parse(fileData);
    } catch (error) {
      reviews = [...DEFAULT_TESTIMONIALS];
    }

    // Prepend the new review so it appears at the top
    reviews.unshift(data);

    try {
      await fs.mkdir(path.dirname(REVIEWS_FILE), { recursive: true });
      await fs.writeFile(REVIEWS_FILE, JSON.stringify(reviews, null, 2), "utf-8");
    } catch (err) {
      console.error("Failed to write new review:", err);
      throw new Error("Could not save review");
    }

    return { success: true };
  });
