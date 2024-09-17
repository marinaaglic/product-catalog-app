import { useEffect, useState } from "react";
import { fetchCategories } from "../../utils/api/api";
import { Category } from "../../utils/types";

export default function Filter() {
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
    setSelectedCategory(event.target.value);
  };
  return (
    <div>
      <select value={selectedCategory} onChange={handleChange}>
        {categories?.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
