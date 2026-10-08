import { z } from "zod";
import { BUDGET_RANGES, SERVICE_INTERESTS } from "./content";

/**
 * One schema shared by the client form and the API route, so the browser and
 * the server can never disagree about what a valid enquiry looks like.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Tell us your name").max(80),
  email: z.string().trim().toLowerCase().email("That email address looks wrong"),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  website: z
    .string()
    .trim()
    .max(200)
    .optional()
    .or(z.literal(""))
    .refine(
      (v) => !v || /^((https?:\/\/)?[\w-]+(\.[\w-]+)+)(\/.*)?$/i.test(v),
      "Enter a domain like example.com",
    ),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  budget: z.enum(BUDGET_RANGES).optional(),
  services: z.array(z.enum(SERVICE_INTERESTS as [string, ...string[]])).default([]),
  message: z
    .string()
    .trim()
    .min(20, "A sentence or two about your goals helps us prepare")
    .max(4000),
  consent: z.literal(true, { message: "We need your consent to reply" }),
  /**
   * Honeypot. Deliberately unconstrained: the route checks it and accepts
   * silently, so a bot gets a success response instead of a validation error
   * telling it which field gave it away.
   */
  referralSource: z.string().max(200).optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactData = z.output<typeof contactSchema>;

export const auditSchema = contactSchema.extend({
  monthlySpend: z.string().trim().max(60).optional().or(z.literal("")),
  platforms: z.array(z.string()).default([]),
});

export type AuditInput = z.input<typeof auditSchema>;
