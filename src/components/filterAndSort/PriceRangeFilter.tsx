import { useState } from "react";
import Input from "../reusable/Input";
import "../../styles/_priceRangeFilter.scss";

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
      />
    </div>
  );
}
