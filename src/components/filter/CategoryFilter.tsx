import { useState } from "react";
import "../../styles/_filter.scss";
import { useCategoryContext } from "../../context/CategoryContext";

interface FilterProps {
  onCategoryChange: (category: string) => void;
}

export default function Filter({ onCategoryChange }: FilterProps) {
  const { categories } = useCategoryContext();
  const [selectedCategory, setSelectedCategory] = useState<string>();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
    onCategoryChange(selectedValue);
  };
  return (
    <div className="custom-select">
      <select value={selectedCategory} onChange={handleChange}>
        <option value="">Select a category</option>
        {categories?.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
