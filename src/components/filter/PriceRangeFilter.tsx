import { useState } from "react";
import Input from "../reusable/Input";

interface PriceRangeFilterProps {
  onMinPriceChange: (price: number) => void;
  onMaxPriceChange: (price: number) => void;
}

export default function PriceRangeFilter({
  onMinPriceChange,
  onMaxPriceChange,
}: PriceRangeFilterProps) {
  const [minPrice, setMinPrice] = useState<number | null>();
  const [maxPrice, setMaxPrice] = useState<number | null>();

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    setMinPrice(value);
    if (value !== null) {
      onMinPriceChange(value);
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    setMaxPrice(value);
    if (value !== null) {
      onMaxPriceChange(value);
    }
  };

  return (
    <div className="div-price-range">
      <Input
        type="number"
        label="Min price"
        id="min-price"
        name="min-price"
        value={minPrice !== null ? minPrice : ""}
        onChange={handleMinPriceChange}
      />
      <Input
        type="number"
        label="Max price"
        id="max-price"
        name="max-price"
        value={maxPrice !== null ? maxPrice : ""}
        onChange={handleMaxPriceChange}
      />
    </div>
  );
}
