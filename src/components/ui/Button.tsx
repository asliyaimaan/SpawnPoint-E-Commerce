import Link from "next/link";

interface ButtonProps {
  label: string;
  href: string;
  color?: string;
  icon?: React.ReactNode;
}

export default function Button({ label, href, color = "#DDC8F8", icon }: ButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 px-4 py-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase"
      style={{ backgroundColor: color }}
    >
      {/* 1. Added explicit w-4 and h-4 to the span to ensure it occupies space */}
      {icon && <span className="flex items-center justify-center w-4 h-4">{icon}</span>}
      {label}
    </Link>
  );
}