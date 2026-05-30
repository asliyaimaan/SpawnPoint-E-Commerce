import Link from "next/link";

interface ButtonProps {
  label: string;
  href: string;
  color?: string; // Add optional color prop
}

export default function Button({ label, href, color = "#DDC8F8" }: ButtonProps) {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-sm border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all font-bold uppercase"
      // Apply the color here
      style={{ backgroundColor: color }}
    >
      {label}
    </Link>
  );
}