import { useEffect, useState } from "react";
import { fetchCategories } from "../../utils/api/api";
import { Category } from "../../utils/types/product";
import "../../styles/_filter.scss";

interface FilterAndSortProps {
  onCategoryChange: (category: string) => void;
  onSortingOptionChange: (option: string) => void;
}

export default function CategoryFilter({
  onCategoryChange,
  onSortingOptionChange,
}: FilterAndSortProps) {
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
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onSortingOptionChange(selectedValue);
  };
  return (
    <>
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
      <div className="custom-select">
        <select onChange={handleSortChange}>
          <option value="">Sort by</option>
          <option value="price-asc">Price (min-max)</option>
          <option value="price-desc">Price(max-min)</option>
          <option value="title-asc">Name (A-Z)</option>
          <option value="title-desc">Name (Z-A)</option>
        </select>
      </div>
    </>
  );
}
