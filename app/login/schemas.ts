import { z } from "zod";

export const step1Schema = z.object({
  full_name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  mobile: z.string().optional(),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
  insta_url: z.string().url("Please enter a valid Instagram URL").includes("instagram.com", { message: "Must be an Instagram URL" }),
  other_url: z.string().url("Please enter a valid URL").optional().or(z.literal('')),
});

export const step2CreatorSchema = z.object({
  community_type: z.string().optional(),
  community_insta: z.string().optional(),
  community_other: z.string().optional(),
  community_role: z.string().optional(),
  story: z.string().optional(),
});

export const step2CommunitySchema = z.object({
  community_type: z.string().min(1, "Please select a community type"),
  community_insta: z.string().url("Please enter a valid Instagram URL").optional().or(z.literal('')),
  community_other: z.string().url("Please enter a valid URL").optional().or(z.literal('')),
  community_role: z.string().min(2, "Please enter your role"),
  story: z.string().min(10, "Please tell us a bit more (min 10 characters)"),
});

export const step3Schema = z.object({
  participation_size: z.string().optional(),
  nominee_1: z.string().optional(),
  nominee_2: z.string().optional(),
  nominee_3: z.string().optional(),
});
