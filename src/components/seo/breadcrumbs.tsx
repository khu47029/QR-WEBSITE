import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { JsonLd } from "./json-ld";
import { buildBreadcrumbSchema, BreadcrumbItem } from "@/lib/seo/schema";

interface BreadcrumbsProps {
  items: Array<{ name: string; href: string }>;
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const fullItems: BreadcrumbItem[] = [
    { name: "Home", item: "/" },
    ...items.map((i) => ({ name: i.name, item: i.href })),
  ];

  const schema = buildBreadcrumbSchema(fullItems);

  return (
    <>
      <JsonLd schema={schema} />
      <nav
        aria-label="Breadcrumb"
        className="flex items-center space-x-2 text-xs font-mono text-slate-400 py-3 mb-6"
      >
        <Link
          href="/"
          className="flex items-center gap-1 hover:text-cyan-400 transition-colors text-slate-400"
        >
          <Home className="h-3.5 w-3.5" />
          <span>Home</span>
        </Link>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <div key={item.href} className="flex items-center space-x-2">
              <ChevronRight className="h-3 w-3 text-slate-600 flex-shrink-0" />
              {isLast ? (
                <span className="text-cyan-400 font-semibold truncate" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-cyan-400 transition-colors truncate max-w-[150px] sm:max-w-none"
                >
                  {item.name}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}
