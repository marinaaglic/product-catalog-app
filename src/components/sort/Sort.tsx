interface SortProps {
  onSortingOptionChange: (option: string) => void;
}

export default function Sort({ onSortingOptionChange }: SortProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onSortingOptionChange(selectedValue);
  };
  return (
    <div className="custom-select">
      <select onChange={handleChange}>
        <option value="">Sort by</option>
        <option value="price-asc">Price (min-max)</option>
        <option value="price-desc">Price(max-min)</option>
        <option value="title-asc">Name (A-Z)</option>
        <option value="title-desc">Name (Z-A)</option>
      </select>
    </div>
  );
}
