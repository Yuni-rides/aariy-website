import Image from "next/image";
import { Logo } from "@/components/layout/logo";
import { OtpLoginForm } from "./otp-login-form";

export function SignInPanel({
  next,
  titleId = "sign-in-title",
}: {
  next?: string;
  titleId?: string;
}) {
  return (
    <div className="grid w-full overflow-hidden rounded-[1.25rem] bg-surface p-3 md:grid-cols-2 md:gap-3">
      <div className="relative hidden min-h-[34rem] overflow-hidden rounded-2xl bg-subtle md:block">
        <Image
          src="/loginSideImage.png"
          alt=""
          fill
          sizes="(min-width: 768px) 26rem, 0px"
          className="object-cover object-top"
          priority
        />
      </div>
      <div className="flex flex-col justify-center px-4 py-8 sm:px-8 md:py-10">
        <Logo priority className="mx-auto h-16" />
        <h2
          id={titleId}
          className="mx-auto mb-8 mt-6 max-w-[16rem] text-center font-display text-2xl font-semibold leading-snug"
        >
          Sign In
        </h2>
        <OtpLoginForm next={next} />
      </div>
    </div>
  );
}
