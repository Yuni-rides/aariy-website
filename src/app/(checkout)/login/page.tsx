import { Suspense } from "react";
import { seoPages } from "@/config/seo-pages";
import { OtpLoginForm } from "@/features/auth";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ ...seoPages.login, noIndex: true });

async function LoginForm({ searchParams }: { searchParams: PageProps<"/login">["searchParams"] }) {
  const { next } = await searchParams;
  return <OtpLoginForm next={typeof next === "string" ? next : undefined} />;
}

export default function LoginPage({ searchParams }: PageProps<"/login">) {
  return (
    <div className="container-site flex justify-center py-16">
      <div className="w-full max-w-sm rounded-card border border-line bg-surface p-8">
        <h1 className="font-display text-3xl">Sign in</h1>
        <p className="mb-6 mt-2 text-sm text-muted">Use your mobile number. No password needed.</p>
        <Suspense fallback={<OtpLoginForm />}>
          <LoginForm searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
