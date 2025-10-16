import { Invoice } from "@/shared/schema";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { forwardRef } from "react";

interface InvoicePreviewProps {
  invoice: Invoice;
}

export const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(
  ({ invoice }, ref) => {
    const subtotal = invoice.lineItems.reduce(
      (sum, item) => sum + item.quantity * item.rate,
      0
    );
    const tax = (subtotal * invoice.taxRate) / 100;
    const discount = invoice.discount || 0;
    const shipping = invoice.shipping || 0;
    const total = subtotal + tax - discount + shipping;

    const formatDate = (dateString: string) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-lg font-semibold">Invoice Preview</h2>
        </div>

        <Card ref={ref} className="shadow-lg rounded-xl print:shadow-none" id="invoice-preview">
          <div className="p-8 space-y-8">
            <div className="flex flex-col sm:flex-row justify-between gap-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">INVOICE</h2>
                <div className="space-y-1">
                  {invoice.businessName && (
                    <p className="font-semibold text-lg">{invoice.businessName}</p>
                  )}
                  {invoice.businessAddress && (
                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                      {invoice.businessAddress}
                    </p>
                  )}
                  {invoice.businessPhone && (
                    <p className="text-sm text-muted-foreground">{invoice.businessPhone}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2 text-right sm:text-right">
                <div>
                  <p className="text-sm text-muted-foreground">Voucher Number</p>
                  <p className="font-mono font-semibold">{invoice.invoiceNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Invoice Date</p>
                  <p className="font-medium">{formatDate(invoice.invoiceDate)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p className="font-medium">{formatDate(invoice.dueDate)}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-2">Bill To:</p>
              <div className="space-y-1">
                {invoice.clientName && (
                  <p className="font-semibold text-lg">{invoice.clientName}</p>
                )}
                {invoice.clientAddress && (
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {invoice.clientAddress}
                  </p>
                )}
                {invoice.clientPhone && (
                  <p className="text-sm text-muted-foreground">{invoice.clientPhone}</p>
                )}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 text-sm font-semibold text-muted-foreground">
                      Description
                    </th>
                    <th className="text-right py-3 text-sm font-semibold text-muted-foreground w-24">
                      Unit
                    </th>
                    <th className="text-right py-3 text-sm font-semibold text-muted-foreground w-24">
                      Qty
                    </th>
                    <th className="text-right py-3 text-sm font-semibold text-muted-foreground w-28">
                      Rate
                    </th>
                    <th className="text-right py-3 text-sm font-semibold text-muted-foreground w-32">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.lineItems.map((item, index) => (
                    <tr key={item.id} className={index % 2 === 0 ? "bg-muted/30" : ""}>
                      <td className="py-3 text-sm">
                        {item.description || <span className="text-muted-foreground italic">No description</span>}
                      </td>
                      <td className="py-3 text-sm text-right">{item.unit}</td>
                      <td className="py-3 text-sm text-right font-mono">{item.quantity}</td>
                      <td className="py-3 text-sm text-right font-mono">
                        ${item.rate.toFixed(2)}
                      </td>
                      <td className="py-3 text-sm text-right font-mono font-medium">
                        ${(item.quantity * item.rate).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              <div className="w-full sm:w-80 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Subtotal:</span>
                  <span className="font-mono font-medium" data-testid="text-subtotal">${subtotal.toFixed(2)}</span>
                </div>
                {invoice.taxRate > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Tax ({invoice.taxRate}%):
                    </span>
                    <span className="font-mono font-medium" data-testid="text-tax">pkr{tax.toFixed(2)}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Discount:</span>
                    <span className="font-mono font-medium text-destructive" data-testid="text-discount">-${discount.toFixed(2)}</span>
                  </div>
                )}
                {shipping > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Shipping:</span>
                    <span className="font-mono font-medium" data-testid="text-shipping">${shipping.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold">Total:</span>
                  <span className="text-3xl font-bold font-mono text-primary" data-testid="text-total">
                    Pkr {total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {invoice.notes && (
              <>
                <Separator />
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Notes:</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {invoice.notes}
                  </p>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    );
  }
);

InvoicePreview.displayName = "InvoicePreview";
