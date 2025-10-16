import { z } from "zod";

export const lineItemSchema = z.object({
  id: z.string(),
  description: z.string(),
  quantity: z.number().min(0),
  rate: z.number().min(0),
});

export const invoiceSchema = z.object({
  invoiceNumber: z.string(),
  invoiceDate: z.string(),
  dueDate: z.string(),
  
  businessName: z.string(),
  businessAddress: z.string(),
  businessEmail: z.string().email().optional().or(z.literal("")),
  businessPhone: z.string().optional().or(z.literal("")),
  
  clientName: z.string(),
  clientAddress: z.string(),
  clientEmail: z.string().email().optional().or(z.literal("")),
  
  lineItems: z.array(lineItemSchema),
  taxRate: z.number().min(0).max(100),
  discount: z.number().min(0),
  shipping: z.number().min(0),
  notes: z.string().optional().or(z.literal("")),
});

export type LineItem = z.infer<typeof lineItemSchema>;
export type Invoice = z.infer<typeof invoiceSchema>;
