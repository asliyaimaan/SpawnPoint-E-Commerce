import { supabase } from "@/lib/supabase";
import CategorySection from "@/components/shop/CategorySection";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faGamepad, faHeadphones } from "@fortawesome/free-solid-svg-icons"; // Example icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Map category names to icons
const iconMap: Record<string, IconDefinition> = {
  Games: faGamepad,
  Consoles: faGamepad,
  Accessories: faHeadphones,
};

export default async function ShopPage() {
  const { data: categories, error } = await supabase.from("categories").select("*");

  if (error) return <p>Error loading categories.</p>;

  return (
    <main>
      {categories?.map((cat, index) => (
        <CategorySection
          key={cat.id}
          category={cat.name}
          icon={iconMap[cat.name]}
          // Check if it's the last element in the array
          isLast={index === categories.length - 1}
        />
      ))}
    </main>
  );
}