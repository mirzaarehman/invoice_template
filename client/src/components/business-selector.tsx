import { Business } from "@/shared/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Building2 } from "lucide-react";

interface BusinessSelectorProps {
  businesses: Business[];
  selectedBusinessId: string | null;
  onSelectBusiness: (businessId: string) => void;
  onAddBusiness: () => void;
}

export function BusinessSelector({
  businesses,
  selectedBusinessId,
  onSelectBusiness,
  onAddBusiness,
}: BusinessSelectorProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
      <div className="flex items-center gap-2">
        <Building2 className="h-5 w-5 text-muted-foreground" />
        <span className="text-sm font-medium text-muted-foreground">Business:</span>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Select
          value={selectedBusinessId || undefined}
          onValueChange={onSelectBusiness}
        >
          <SelectTrigger className="w-full sm:w-[200px] md:w-[250px]">
            <SelectValue placeholder="Select a business" />
          </SelectTrigger>
          <SelectContent>
            {businesses.map((business) => (
              <SelectItem key={business.id} value={business.id}>
                {business.name || "Unnamed Business"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={onAddBusiness}
          size="sm"
          variant="outline"
          className="flex-shrink-0"
        >
          <Plus className="h-4 w-4 sm:mr-1" />
          <span className="hidden sm:inline">New Business</span>
        </Button>
      </div>
    </div>
  );
}
