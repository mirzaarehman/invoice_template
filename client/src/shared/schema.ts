import { z } from "zod";

export const businessSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  phone: z.string().optional().or(z.literal("")),
  currency: z.string(),
});

export const lineItemSchema = z.object({
  id: z.string(),
  description: z.string(),
  quantity: z.number().min(0),
  unit: z.string(),
  rate: z.number().min(0),
});

export const invoiceSchema = z.object({
  voucherNumber: z.string(),
  invoiceDate: z.string(),
  dueDate: z.string(),
  currency: z.string(),
  
  businessName: z.string(),
  businessAddress: z.string(),
  businessPhone: z.string().optional().or(z.literal("")),
  
  clientName: z.string(),
  clientAddress: z.string(),
  clientPhone: z.string().optional().or(z.literal("")),
  
  lineItems: z.array(lineItemSchema),
  taxRate: z.number().min(0).max(100),
  discount: z.number().min(0),
  shipping: z.number().min(0),
  notes: z.string().optional().or(z.literal("")),
});

export const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "CHF", symbol: "Fr", name: "Swiss Franc" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
] as const;

export type Business = z.infer<typeof businessSchema>;
export type LineItem = z.infer<typeof lineItemSchema>;
export type Invoice = z.infer<typeof invoiceSchema>;
