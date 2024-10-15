import { useState } from "react";
import Input from "../reusable/Input";
import "../../styles/_priceRangeFilter.scss";
import { toast } from "react-toastify";

interface PriceRangeFilterProps {
  onMinPriceChange: (price: number | null) => void;
  onMaxPriceChange: (price: number | null) => void;
}

export default function PriceRangeFilter({
  onMinPriceChange,
  onMaxPriceChange,
}: PriceRangeFilterProps) {
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const validatePrices = () => {
    if (minPrice !== null && minPrice < 0) {
      toast.warning("Minimal price cannot be negative.");
      return false;
    }
    if (maxPrice !== null && maxPrice < 0) {
      toast.warning("Maximal price cannot be negative.");
      return false;
    }
    if (minPrice !== null && maxPrice !== null && minPrice > maxPrice) {
      toast.warning("Minimal price cannot be greater than maximal price.");
      return false;
    }
    return true;
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    setMinPrice(value);
    onMinPriceChange(value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    setMaxPrice(value);
    onMaxPriceChange(value);
  };

  const handleMinPriceBlur = () => {
    if (!validatePrices()) {
      setMinPrice(null);
      onMinPriceChange(null);
    }
  };

  const handleMaxPriceBlur = () => {
    if (!validatePrices()) {
      setMaxPrice(null);
      onMaxPriceChange(null);
    }
  };

  return (
    <div className="div-price-range">
      <Input
        type="number"
        id="min-price"
        name="min-price"
        variant="range-input"
        value={minPrice !== null ? minPrice : ""}
        placeholder="$"
        onChange={handleMinPriceChange}
        onBlur={handleMinPriceBlur}
      />
      <span> - </span>
      <Input
        type="number"
        id="max-price"
        name="max-price"
        variant="range-input"
        value={maxPrice !== null ? maxPrice : ""}
        placeholder="$"
        onChange={handleMaxPriceChange}
        onBlur={handleMaxPriceBlur}
      />
    </div>
  );
}
