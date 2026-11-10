import { Breadcrumbs } from "@/components/ui";
import { routes } from "@/config/routes";
import { formatDate } from "@/lib/date";
import type { Policy } from "../data/policies";

export function PolicyArticle({ policy }: { policy: Policy }) {
  return (
    <article className="container-site max-w-3xl py-10">
      <Breadcrumbs
        items={[
          { name: "Home", href: routes.home() },
          { name: policy.title, href: routes.policy(policy.slug) },
        ]}
      />
      <h1 className="mt-6 font-display text-4xl md:text-5xl">{policy.title}</h1>
      <p className="mt-3 text-xs text-muted">Last updated {formatDate(policy.updatedAt)}</p>
      {policy.intro && <p className="mt-6 text-lg leading-relaxed">{policy.intro}</p>}
      <div className="mt-10 flex flex-col gap-8">
        {policy.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="mb-3 text-lg font-medium">{section.heading}</h2>
            {section.body.map((p) => (
              <p key={p} className="mb-3 leading-relaxed text-muted">
                {p}
              </p>
            ))}
            {section.list && (
              <ul className="flex list-disc flex-col gap-2 pl-5 leading-relaxed text-muted marker:text-accent">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}
