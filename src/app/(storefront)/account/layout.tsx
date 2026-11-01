import { seoPages } from "@/config/seo-pages";
import { AccountNav } from "@/features/account";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ ...seoPages.account, noIndex: true });

/**
 * Account area. Pages read the session cookie inside <Suspense>, so this
 * layout and nav stay in the static shell. When the API is live, add a
 * redirect to /login in getCurrentCustomer() callers when it returns null.
 */
export default function AccountLayout({ children }: LayoutProps<"/account">) {
  return (
    <div className="container-site grid gap-8 py-10 lg:grid-cols-[14rem_1fr]">
      <AccountNav />
      <div>{children}</div>
    </div>
  );
}
