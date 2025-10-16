# Invoice Generator

## Overview
A professional React-based invoice generator that allows users to create, preview, and export invoices as PDF or print them directly. The application features real-time preview, automatic calculations, and dark mode support. No data is saved - everything runs client-side.

## Current State
✅ Fully functional MVP
✅ All features tested and working
✅ Production-ready

## Recent Changes (October 16, 2025)
- ✅ Built complete invoice app with professional UI
- ✅ Implemented invoice form with all required fields
- ✅ Added real-time invoice preview
- ✅ Integrated PDF generation (html2canvas + jsPDF)
- ✅ Added print functionality
- ✅ Implemented dark mode with theme toggle
- ✅ Added discount and shipping fields
- ✅ All calculations working correctly

## Features

### Invoice Creation
- **Invoice Details**: Invoice number, date, and due date
- **Business Information**: Company name, address, email, phone
- **Client Information**: Client name, address, email
- **Line Items**: Dynamic list of services/products with description, quantity, and rate
- **Additional Charges**: Tax rate (%), discount ($), and shipping ($)
- **Notes**: Custom payment terms or messages

### Real-time Features
- Live invoice preview updates as you type
- Automatic calculations:
  - Subtotal (sum of all line items)
  - Tax (calculated from subtotal)
  - Discount (subtracted from total)
  - Shipping (added to total)
  - Total (subtotal + tax - discount + shipping)

### Export Options
- **Download PDF**: Generate high-quality PDF using html2canvas and jsPDF
- **Print**: Direct browser printing with optimized print styles

### UI/UX Features
- Professional, clean design
- Dark mode support with persistent theme preference
- Responsive layout (mobile and desktop)
- Sticky form on desktop for easy data entry
- Striped table rows for better readability
- Conditional display of charges (only show if > 0)

## Project Architecture

### Tech Stack
- **Frontend**: React, TypeScript
- **Routing**: Wouter
- **Styling**: Tailwind CSS, Shadcn UI components
- **PDF Generation**: jsPDF, html2canvas
- **Form Management**: React state (no backend/database)
- **Type Safety**: Zod schemas

### Key Files
- `client/src/pages/invoice.tsx` - Main invoice page with form and preview
- `client/src/components/invoice-form.tsx` - All input form sections
- `client/src/components/invoice-preview.tsx` - Professional invoice preview
- `client/src/components/theme-toggle.tsx` - Dark/light mode switcher
- `shared/schema.ts` - TypeScript types and Zod schemas for invoice data

### Data Model
```typescript
Invoice {
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  businessName: string
  businessAddress: string
  businessEmail: string
  businessPhone: string
  clientName: string
  clientAddress: string
  clientEmail: string
  lineItems: LineItem[]
  taxRate: number (0-100)
  discount: number (≥0)
  shipping: number (≥0)
  notes: string
}

LineItem {
  id: string
  description: string
  quantity: number (≥0)
  rate: number (≥0)
}
```

### No Backend Required
This application runs entirely in the browser with no backend API or database. All invoice data is stored in React state and cleared when the page is refreshed. This design choice means:
- No data persistence
- No API calls
- Fast, instant updates
- Privacy-focused (data never leaves the user's browser)

## Design Guidelines
The app follows the design guidelines in `design_guidelines.md`:
- Professional color palette with dark mode support
- Inter font for UI, JetBrains Mono for numbers
- Consistent spacing (6-8px units)
- Two-column layout (form + preview)
- Shadow and border system for depth
- Print-optimized styles

## Usage

### Running the Application
```bash
npm run dev
```
The app runs on `http://localhost:5000`

### Creating an Invoice
1. Fill in your business information
2. Enter client details
3. Add line items (description, quantity, rate)
4. Optionally add tax rate, discount, or shipping
5. Add any notes or payment terms
6. Preview updates in real-time
7. Click "Download PDF" to save or "Print" to print

### Dark Mode
Click the moon/sun icon in the top right to toggle between light and dark themes. Preference is saved to localStorage.

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Print functionality uses native browser print dialog
- PDF generation uses canvas rendering (supported in all modern browsers)

## Future Enhancements (Not in MVP)
- Invoice templates/themes
- Logo upload
- Currency selection
- Multi-page invoice support
- Invoice history (local storage)
- Duplicate/template functionality
- Custom invoice number formatting
