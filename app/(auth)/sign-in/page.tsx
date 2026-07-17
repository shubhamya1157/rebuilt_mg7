import type { Metadata } from "next";

import { Backdrop } from "@/components/landing/backdrop";
import { SignInCard } from "@/features/auth/components/sign-in-card";
import { getSafeCallbackPath } from "@/features/auth/utils";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to MG7 with your GitHub account.",
};

type SignInPageProps = {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { callbackUrl, error } = await searchParams;

  return (
    <>
      <Backdrop />
      <SignInCard callbackUrl={getSafeCallbackPath(callbackUrl)} errorCode={error} />
    </>
  );
}
