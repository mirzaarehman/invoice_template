import { Invoice, LineItem } from "@/shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Building, User, FileText, Calculator } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface InvoiceFormProps {
  invoice: Invoice;
  updateInvoice: (updates: Partial<Invoice>) => void;
  addLineItem: () => void;
  updateLineItem: (id: string, updates: Partial<LineItem>) => void;
  removeLineItem: (id: string) => void;
}

export function InvoiceForm({
  invoice,
  updateInvoice,
  addLineItem,
  updateLineItem,
  removeLineItem,
}: InvoiceFormProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <CardTitle>Invoice Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="voucherNumber">Voucher Number</Label>
              <Input
                id="voucherNumber"
                data-testid="input-voucher-number"
                value={invoice.voucherNumber}
                onChange={(e) => updateInvoice({ voucherNumber: e.target.value })}
                placeholder="VCH-0001"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invoiceDate">Invoice Date</Label>
              <Input
                id="invoiceDate"
                data-testid="input-invoice-date"
                type="date"
                value={invoice.invoiceDate}
                onChange={(e) => updateInvoice({ invoiceDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                data-testid="input-due-date"
                type="date"
                value={invoice.dueDate}
                onChange={(e) => updateInvoice({ dueDate: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-primary" />
            <CardTitle>Your Business</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              data-testid="input-business-name"
              value={invoice.businessName}
              onChange={(e) => updateInvoice({ businessName: e.target.value })}
              placeholder="Acme Corporation"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="businessAddress">Address</Label>
            <Textarea
              id="businessAddress"
              data-testid="input-business-address"
              value={invoice.businessAddress}
              onChange={(e) => updateInvoice({ businessAddress: e.target.value })}
              placeholder="123 Business St, City, State 12345"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="businessPhone">Phone</Label>
            <Input
              id="businessPhone"
              data-testid="input-business-phone"
              value={invoice.businessPhone}
              onChange={(e) => updateInvoice({ businessPhone: e.target.value })}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <CardTitle>Bill To</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="clientName">Client Name</Label>
            <Input
              id="clientName"
              data-testid="input-client-name"
              value={invoice.clientName}
              onChange={(e) => updateInvoice({ clientName: e.target.value })}
              placeholder="Client Company Inc."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientAddress">Address</Label>
            <Textarea
              id="clientAddress"
              data-testid="input-client-address"
              value={invoice.clientAddress}
              onChange={(e) => updateInvoice({ clientAddress: e.target.value })}
              placeholder="456 Client Ave, City, State 67890"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientPhone">Phone Number</Label>
            <Input
              id="clientPhone"
              data-testid="input-client-phone"
              value={invoice.clientPhone}
              onChange={(e) => updateInvoice({ clientPhone: e.target.value })}
              placeholder="+1 (555) 987-6543"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-4">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            <CardTitle>Line Items</CardTitle>
          </div>
          <Button
            onClick={addLineItem}
            size="sm"
            data-testid="button-add-item"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Item
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {invoice.lineItems.map((item, index) => (
            <div key={item.id} className="space-y-3">
              {index > 0 && <Separator />}
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`description-${item.id}`}>Description</Label>
                  <Input
                    id={`description-${item.id}`}
                    data-testid={`input-description-${index}`}
                    value={item.description}
                    onChange={(e) => updateLineItem(item.id, { description: e.target.value })}
                    placeholder="Service or product description"
                  />
                </div>
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-4 space-y-2">
                    <Label htmlFor={`quantity-${item.id}`}>Quantity</Label>
                    <Input
                      id={`quantity-${item.id}`}
                      data-testid={`input-quantity-${index}`}
                      type="number"
                      min="0"
                      step="1"
                      value={item.quantity}
                      onChange={(e) => updateLineItem(item.id, { quantity: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="col-span-3 space-y-2">
                    <Label htmlFor={`unit-${item.id}`}>Unit</Label>
                    <Input
                      id={`unit-${item.id}`}
                      data-testid={`input-unit-${index}`}
                      value={item.unit}
                      onChange={(e) => updateLineItem(item.id, { unit: e.target.value })}
                      placeholder="pcs"
                    />
                  </div>
                  <div className="col-span-3 space-y-2">
                    <Label htmlFor={`rate-${item.id}`}>Rate</Label>
                    <Input
                      id={`rate-${item.id}`}
                      data-testid={`input-rate-${index}`}
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.rate}
                      onChange={(e) => updateLineItem(item.id, { rate: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label>Amount</Label>
                    <div className="h-9 flex items-center font-mono text-sm text-muted-foreground">
                      ${(item.quantity * item.rate).toFixed(2)}
                    </div>
                  </div>
                  <div className="col-span-1 flex items-end">
                    {invoice.lineItems.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeLineItem(item.id)}
                        data-testid={`button-remove-item-${index}`}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Separator />

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input
                id="taxRate"
                data-testid="input-tax-rate"
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={invoice.taxRate}
                onChange={(e) => updateInvoice({ taxRate: parseFloat(e.target.value) || 0 })}
                placeholder="0"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="discount">Discount ($)</Label>
                <Input
                  id="discount"
                  data-testid="input-discount"
                  type="number"
                  min="0"
                  step="0.01"
                  value={invoice.discount}
                  onChange={(e) => updateInvoice({ discount: parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shipping">Shipping ($)</Label>
                <Input
                  id="shipping"
                  data-testid="input-shipping"
                  type="number"
                  min="0"
                  step="0.01"
                  value={invoice.shipping}
                  onChange={(e) => updateInvoice({ shipping: parseFloat(e.target.value) || 0 })}
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            id="notes"
            data-testid="input-notes"
            value={invoice.notes}
            onChange={(e) => updateInvoice({ notes: e.target.value })}
            placeholder="Payment terms, additional information, or thank you message..."
            rows={4}
          />
        </CardContent>
      </Card>
    </div>
  );
}
