"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GalleryHorizontalEnd, MessageSquareWarning, Newspaper } from "lucide-react";

/**
 * Las secciones de contenido del panel. El acceso a la cuenta vive en la
 * cabecera, no acá.
 */
const LINKS = [
  { href: "/admin/novedades", label: "Novedades", Icon: Newspaper },
  { href: "/admin/popup", label: "Pop-up", Icon: MessageSquareWarning },
  { href: "/admin/inicio", label: "Inicio", Icon: GalleryHorizontalEnd },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="border-t border-white/10 bg-primary-dark">
      <div className="container flex gap-1 px-6">
        {LINKS.map(({ href, label, Icon }) => {
          const isActive = pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-2 border-b-2 px-3 py-3 text-sm font-bold transition-colors ${
                isActive
                  ? "border-accent text-white"
                  : "border-transparent text-white/60 hover:text-white"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
