import { Suspense } from "react";
import { seoPages } from "@/config/seo-pages";
import { SignInPanel } from "@/features/auth";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ ...seoPages.login, noIndex: true });

async function Panel({
  searchParams,
}: {
  searchParams: PageProps<"/login">["searchParams"];
}) {
  const { next } = await searchParams;
  return <SignInPanel next={typeof next === "string" ? next : undefined} />;
}

export default function LoginPage({ searchParams }: PageProps<"/login">) {
  return (
    <div className="container-site flex justify-center py-10 md:py-16">
      <div className="w-full max-w-[52rem] rounded-[1.25rem] shadow-[0_12px_40px_rgb(0_0_0/0.08)]">
        <Suspense fallback={<SignInPanel />}>
          <Panel searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
