import type { Product } from "@/types";

/** Description, material and care as native accordions (no JS). */
export function ProductDetails({ product }: { product: Product }) {
  const sections = [
    { title: "Description", content: <p>{product.description}</p>, open: true },
    { title: "Material", content: <p>{product.material}</p> },
    {
      title: "Care",
      content: (
        <ul className="list-disc space-y-1 pl-5">
          {product.care.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Sold by",
      content: <p>{product.brand.name}. Quality checked by Aariy before dispatch.</p>,
    },
  ];

  return (
    <div className="divide-y divide-line border-y border-line">
      {sections.map((s) => (
        <details key={s.title} open={s.open} className="group py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
            {s.title}
            <span aria-hidden className="text-lg transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="pt-3 text-sm leading-relaxed text-muted">{s.content}</div>
        </details>
      ))}
    </div>
  );
}
