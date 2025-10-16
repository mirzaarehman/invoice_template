# Invoice App Design Guidelines

## Design Approach: Professional Utility System

**Framework**: Clean, function-first design system inspired by modern productivity tools (Notion, Linear, Stripe Dashboard)

**Rationale**: Invoice apps require clarity, professionalism, and efficient data input. Design prioritizes readability, clear visual hierarchy, and a layout that works seamlessly for both screen and print.

---

## Core Design Elements

### A. Color Palette

**Light Mode**:
- Background: 0 0% 100% (Pure white)
- Surface: 240 5% 96% (Light gray cards)
- Border: 240 6% 90% (Subtle borders)
- Primary: 215 90% 45% (Professional blue for actions)
- Text Primary: 240 10% 10% (Near black)
- Text Secondary: 240 5% 40% (Medium gray)
- Success: 142 71% 45% (Calculation highlights)
- Accent: 215 90% 55% (Interactive elements)

**Dark Mode**:
- Background: 240 10% 8% (Deep charcoal)
- Surface: 240 8% 12% (Elevated cards)
- Border: 240 5% 20% (Subtle borders)
- Primary: 215 85% 60% (Brighter blue)
- Text Primary: 0 0% 98% (Near white)
- Text Secondary: 240 5% 65% (Light gray)

### B. Typography

**Font Stack**: 
- Primary: 'Inter', system-ui, -apple-system (Forms & UI)
- Display: 'Inter', sans-serif (Invoice headers)
- Mono: 'JetBrains Mono', monospace (Numbers & amounts)

**Scale**:
- Form labels: text-sm font-medium
- Input text: text-base
- Section headers: text-lg font-semibold
- Invoice title: text-2xl md:text-3xl font-bold
- Amounts: text-xl md:text-2xl font-semibold (mono)
- Totals: text-3xl font-bold (mono)

### C. Layout System

**Spacing Primitives**: Use Tailwind units of 3, 4, 6, 8, 12
- Component padding: p-6 or p-8
- Section gaps: gap-6 or gap-8
- Form field spacing: space-y-4
- Grid gaps: gap-4

**Grid Structure**:
- Main layout: Two-column split (lg:grid-cols-2)
- Left: Input form (sticky on large screens)
- Right: Live preview panel
- Mobile: Stack vertically (form first)
- Max container width: max-w-7xl

### D. Component Library

**Form Components**:
- Text inputs: Bordered, focus ring, rounded-lg
- Input groups: Label above, helper text below
- Add/Remove buttons: Icon buttons with hover states
- Dynamic line items: Table layout with alternating row colors

**Invoice Preview**:
- Card container: bg-surface, border, shadow-lg, rounded-xl
- Header: Company logo placeholder, invoice details grid
- Line items: Clean table with header row
- Calculations section: Right-aligned, progressive font weights
- Footer: Payment terms, notes section

**Action Buttons**:
- Primary CTA (Download PDF): bg-primary, text-white, px-6 py-3
- Secondary (Print): outline variant with icon
- Icon buttons: w-10 h-10, rounded-full for add/remove items

**Navigation**:
- Top bar: App title, theme toggle, action buttons
- Minimal chrome to maximize content space

**Data Displays**:
- Invoice table: Striped rows, clear column headers
- Amount fields: Monospace, right-aligned
- Totals breakdown: Hierarchical spacing (Subtotal → Tax → Total)

### E. Interactions

**Minimal Animations**:
- Form focus: Subtle border color transition (150ms)
- Button hovers: Slight scale (1.02) and shadow increase
- Item addition: Fade-in (200ms)
- No scroll-driven or complex animations

---

## Layout Specifications

### Desktop Layout (≥1024px):
```
┌─────────────────────────────────────────┐
│  App Header (Actions)                   │
├──────────────┬──────────────────────────┤
│              │                          │
│  Input Form  │    Live Preview Panel    │
│  (Sticky)    │    (Scrollable)          │
│              │                          │
│              │                          │
└──────────────┴──────────────────────────┘
```

### Mobile Layout (<1024px):
- Full-width stacked sections
- Form fields first
- Preview collapses to toggle panel
- Fixed action bar at bottom

---

## Print Optimization

- Preview panel becomes print-ready invoice
- Hide all form elements and buttons
- Use print-safe colors (high contrast B&W fallback)
- Ensure proper page breaks
- A4/Letter size compatible margins

---

## Professional Details

**Input Form Structure**:
1. Business Information (Company name, address, logo upload placeholder)
2. Client Details (Name, email, address)
3. Invoice Metadata (Invoice #, Date, Due date)
4. Line Items Table (Description, Qty, Rate, Amount)
5. Additional Charges (Tax %, Discount, Shipping)
6. Notes/Terms section

**Visual Hierarchy**:
- Section dividers: Thin horizontal rules (border-t)
- Form sections: mb-8 spacing
- Emphasized totals: Larger font, bold weight, primary color
- De-emphasized metadata: Smaller text, secondary color

**Micro-interactions**:
- Calculation updates: Instant without animation
- Form validation: Red border on error
- Success states: Green checkmark on calculated totals

This design creates a professional, efficient invoice generator that prioritizes data clarity and seamless PDF export while maintaining visual polish.