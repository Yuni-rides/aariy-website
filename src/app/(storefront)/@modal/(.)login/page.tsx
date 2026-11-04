import { Suspense } from "react";
import { AuthModal, SignInPanel } from "@/features/auth";

async function Panel({
  searchParams,
}: {
  searchParams: PageProps<"/login">["searchParams"];
}) {
  const { next } = await searchParams;
  return (
    <SignInPanel
      titleId="sign-in-modal-title"
      next={typeof next === "string" ? next : undefined}
    />
  );
}

export default function LoginModal({ searchParams }: PageProps<"/login">) {
  return (
    <AuthModal labelledBy="sign-in-modal-title">
      <Suspense fallback={<SignInPanel titleId="sign-in-modal-title" />}>
        <Panel searchParams={searchParams} />
      </Suspense>
    </AuthModal>
  );
}
