import { Breadcrumbs, type Crumb } from "@/components/ui";

type CollectionHeaderProps = {
  title: string;
  description?: string;
  breadcrumbs: Crumb[];
};

export function CollectionHeader({ title, description, breadcrumbs }: CollectionHeaderProps) {
  return (
    <header className="container-site flex flex-col gap-4 py-8 md:py-12">
      <Breadcrumbs items={breadcrumbs} />
      <h1 className="font-display text-4xl md:text-5xl">{title}</h1>
      {description && <p className="max-w-2xl text-muted">{description}</p>}
    </header>
  );
}
