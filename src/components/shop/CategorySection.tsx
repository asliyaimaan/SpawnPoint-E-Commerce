import { supabase } from "@/lib/supabase";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NavLink from "@/components/ui/NavLink";

interface CategoryProps {
  category: string;
  icon?: IconDefinition;
  isLast: boolean;
}

export default async function CategorySection({ category, icon, isLast }: CategoryProps) {
    //Fetch products that match this category name
    const { data: products, error } = await supabase
    .from("products")
    .select("*, categories!inner(name)")
    .eq("categories.name", category)
    .limit(4); // Strictly limit to 4 items

    console.log(products);
    console.log(error);
    
    return (
      // Outer section: No max-w here! This allows the border to stretch 100% width.
      <section className={`w-full ${isLast ? '' : 'border-b-2 border-black'}`}>
        
        {/* Inner container: This keeps your content centered at 7xl */}
        <div className="max-w-7xl mx-auto p-6 md:p-10">
          
          <div className="flex justify-between items-end mb-8">
            <div>
              <div className="text-[#B892FF] text-xs font-mono flex items-center gap-1 mb-2">
                {icon && <FontAwesomeIcon icon={icon} />}
                CATEGORY
              </div>
              <h2 className="text-3xl font-mono">{category}</h2>
            </div>
            <NavLink href={`/shop/${category.toLowerCase()}`} text="VIEW ALL →" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products?.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          
        </div>
      </section>
    );
}