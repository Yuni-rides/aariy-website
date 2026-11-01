import { notFound } from "next/navigation";
import { routes } from "@/config/routes";
import { PolicyArticle, getPolicy, policies } from "@/features/policies";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return policies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/policies/[slug]">) {
  const policy = getPolicy((await params).slug);
  if (!policy) return {};
  return buildMetadata({ title: policy.title, description: policy.description, path: routes.policy(policy.slug), type: "article" });
}

export default async function PolicyPage({ params }: PageProps<"/policies/[slug]">) {
  const policy = getPolicy((await params).slug);
  if (!policy) notFound();
  return <PolicyArticle policy={policy} />;
}
