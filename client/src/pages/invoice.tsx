import { useState, useRef, useEffect } from "react";
import { Invoice, LineItem, Business } from "@/shared/schema";
import { nanoid } from "nanoid";
import { InvoiceForm } from "@/components/invoice-form";
import { InvoicePreview } from "@/components/invoice-preview";
import { BusinessSelector } from "@/components/business-selector";
import { ThemeToggle } from "@/components/theme-toggle";
import { FileText, Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  loadBusinesses,
  saveBusinesses,
  loadSelectedBusinessId,
  saveSelectedBusinessId,
  updateBusiness,
} from "@/lib/storage";

export default function InvoicePage() {
  const today = new Date().toISOString().split('T')[0];
  const futureDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const { toast } = useToast();
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Load businesses from storage
  const [businesses, setBusinesses] = useState<Business[]>(() => {
    const loaded = loadBusinesses();
    if (loaded.length === 0) {
      // Create a default business if none exist
      const defaultBusiness: Business = {
        id: nanoid(),
        name: "",
        address: "",
        phone: "",
        currency: "USD",
      };
      saveBusinesses([defaultBusiness]);
      saveSelectedBusinessId(defaultBusiness.id);
      return [defaultBusiness];
    }
    return loaded;
  });

  // Load selected business ID
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(() => {
    const savedId = loadSelectedBusinessId();
    if (savedId && businesses.find(b => b.id === savedId)) {
      return savedId;
    }
    // Default to first business if saved ID not found
    if (businesses.length > 0) {
      const firstId = businesses[0].id;
      saveSelectedBusinessId(firstId);
      return firstId;
    }
    return null;
  });

  // Get current business
  const currentBusiness = businesses.find(b => b.id === selectedBusinessId);

  const [invoice, setInvoice] = useState<Invoice>({
    voucherNumber: `VCH-${Math.floor(1000 + Math.random() * 9000)}`,
    invoiceDate: today,
    dueDate: futureDate,
    currency: currentBusiness?.currency || "USD",
    
    businessName: currentBusiness?.name || "",
    businessAddress: currentBusiness?.address || "",
    businessEmail: currentBusiness?.email || "",
    businessPhone: currentBusiness?.phone || "",
    
    clientName: "",
    clientAddress: "",
    clientPhone: "",
    
    lineItems: [
      { id: nanoid(), description: "", quantity: 1, unit: "pcs", rate: 0 }
    ],
    taxRate: 0,
    discount: 0,
    shipping: 0,
    notes: "",
  });

  // Update invoice when business changes
  useEffect(() => {
    if (currentBusiness) {
      setInvoice(prev => ({
        ...prev,
        businessName: currentBusiness.name,
        businessAddress: currentBusiness.address,
        businessEmail: currentBusiness.email || "",
        businessPhone: currentBusiness.phone || "",
        currency: currentBusiness.currency,
      }));
    }
  }, [selectedBusinessId]);

  // Save business details when they change
  useEffect(() => {
    if (selectedBusinessId && currentBusiness) {
      const updatedBusiness: Business = {
        ...currentBusiness,
        name: invoice.businessName,
        address: invoice.businessAddress,
        email: invoice.businessEmail || "",
        phone: invoice.businessPhone || "",
        currency: invoice.currency,
      };
      updateBusiness(updatedBusiness);
      setBusinesses(prev =>
        prev.map(b => b.id === selectedBusinessId ? updatedBusiness : b)
      );
    }
  }, [invoice.businessName, invoice.businessAddress, invoice.businessEmail, invoice.businessPhone, invoice.currency]);

  const handleSelectBusiness = (businessId: string) => {
    setSelectedBusinessId(businessId);
    saveSelectedBusinessId(businessId);
  };

  const handleAddBusiness = () => {
    const newBusiness: Business = {
      id: nanoid(),
      name: "New Business",
      address: "",
      email: "",
      phone: "",
      currency: "USD",
    };
    const updatedBusinesses = [...businesses, newBusiness];
    setBusinesses(updatedBusinesses);
    saveBusinesses(updatedBusinesses);
    setSelectedBusinessId(newBusiness.id);
    saveSelectedBusinessId(newBusiness.id);
    toast({
      title: "New Business Created",
      description: "You can now edit the business details.",
    });
  };

  const updateInvoice = (updates: Partial<Invoice>) => {
    setInvoice(prev => ({ ...prev, ...updates }));
  };

  const addLineItem = () => {
    setInvoice(prev => ({
      ...prev,
      lineItems: [
        ...prev.lineItems,
        { id: nanoid(), description: "", quantity: 1, unit: "pcs", rate: 0 }
      ]
    }));
  };

  const updateLineItem = (id: string, updates: Partial<LineItem>) => {
    setInvoice(prev => ({
      ...prev,
      lineItems: prev.lineItems.map(item =>
        item.id === id ? { ...item, ...updates } : item
      )
    }));
  };

  const removeLineItem = (id: string) => {
    setInvoice(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter(item => item.id !== id)
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return;

    setIsGenerating(true);
    try {
      const element = invoiceRef.current;
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(`${invoice.voucherNumber}.pdf`);
      
      toast({
        title: "PDF Generated",
        description: "Your invoice has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-foreground">Invoice Generator</h1>
                  <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Create professional invoices instantly</p>
                </div>
              </div>
              <ThemeToggle />
            </div>
            <BusinessSelector
              businesses={businesses}
              selectedBusinessId={selectedBusinessId}
              onSelectBusiness={handleSelectBusiness}
              onAddBusiness={handleAddBusiness}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <InvoiceForm
              invoice={invoice}
              updateInvoice={updateInvoice}
              addLineItem={addLineItem}
              updateLineItem={updateLineItem}
              removeLineItem={removeLineItem}
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap print:hidden">
              <h2 className="text-lg font-semibold">Invoice Preview</h2>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={handlePrint}
                  data-testid="button-print"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </Button>
                <Button
                  onClick={handleDownloadPDF}
                  disabled={isGenerating}
                  data-testid="button-download-pdf"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {isGenerating ? "Generating..." : "Download PDF"}
                </Button>
              </div>
            </div>
            <InvoicePreview ref={invoiceRef} invoice={invoice} />
          </div>
        </div>
      </main>
    </div>
  );
}
