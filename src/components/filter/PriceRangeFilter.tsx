interface PriceRangeFilterProps {
  onMinPriceChange: (price: number) => void;
  onMaxPriceChange: (price: number) => void;
}

export default function PriceRangeFilter({}: PriceRangeFilterProps) {
  return <div>PriceRangeFilter</div>;
}
