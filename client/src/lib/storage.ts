export interface Business {
  id: string;
  name: string;
  address: string;
  phone?: string;
  currency: string;
}

const BUSINESSES_KEY = "invoice_businesses";
const SELECTED_BUSINESS_KEY = "invoice_selected_business_id";

export function saveBusinesses(businesses: Business[]): void {
  try {
    localStorage.setItem(BUSINESSES_KEY, JSON.stringify(businesses));
  } catch (error) {
    console.error("Failed to save businesses:", error);
  }
}

export function loadBusinesses(): Business[] {
  try {
    const stored = localStorage.getItem(BUSINESSES_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load businesses:", error);
  }
  return [];
}

export function saveSelectedBusinessId(id: string): void {
  try {
    localStorage.setItem(SELECTED_BUSINESS_KEY, id);
  } catch (error) {
    console.error("Failed to save selected business ID:", error);
  }
}

export function loadSelectedBusinessId(): string | null {
  try {
    return localStorage.getItem(SELECTED_BUSINESS_KEY);
  } catch (error) {
    console.error("Failed to load selected business ID:", error);
  }
  return null;
}

export function addBusiness(business: Business): void {
  const businesses = loadBusinesses();
  businesses.push(business);
  saveBusinesses(businesses);
}

export function updateBusiness(updatedBusiness: Business): void {
  const businesses = loadBusinesses();
  const index = businesses.findIndex(b => b.id === updatedBusiness.id);
  if (index !== -1) {
    businesses[index] = updatedBusiness;
    saveBusinesses(businesses);
  }
}

export function deleteBusiness(id: string): void {
  const businesses = loadBusinesses();
  const filtered = businesses.filter(b => b.id !== id);
  saveBusinesses(filtered);
}
