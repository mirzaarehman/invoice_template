export interface BusinessDetails {
  businessName: string;
  businessAddress: string;
  businessEmail: string;
  businessPhone: string;
  currency: string;
}

const STORAGE_KEY = "invoice_business_details";

export function saveBusinessDetails(details: BusinessDetails): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(details));
  } catch (error) {
    console.error("Failed to save business details:", error);
  }
}

export function loadBusinessDetails(): BusinessDetails | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load business details:", error);
  }
  return null;
}
