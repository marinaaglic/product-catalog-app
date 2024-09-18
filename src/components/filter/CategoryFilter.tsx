import { useEffect, useState } from "react";
import { fetchCategories } from "../../utils/api/api";
import { Category } from "../../utils/types";
import "../../styles/_filter.scss";

interface FilterProps {
  onCategoryChange: (category: string) => void;
}

export default function Filter({ onCategoryChange }: FilterProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  useEffect(() => {
    const getCategories = async () => {
      const data = await fetchCategories();
      if (data) {
        setCategories(data);
      }
    };
    getCategories();
  }, []);

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
