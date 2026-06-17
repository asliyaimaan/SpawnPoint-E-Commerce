import Link from "next/link";

interface NavLinkProps {
  href: string;
  text: string;
}

export default function NavLink({ href, text }: NavLinkProps) {
  return (
    <Link 
      href={href} 
      className="text-sm underline-offset-4 decoration-2 transition-all duration-200 hover:underline hover:text-[#B892FF]"
    >
      {text}
    </Link>
  );
}