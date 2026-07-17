"use client";

/**
 * GitHubSignInButton (landing)
 * ----------------------------
 * Reusable "Continue with GitHub" button used across the landing page (hero
 * and closing CTA). It submits the `signInWithGithub` server action, which
 * kicks off better-auth's GitHub OAuth flow and returns the user to the
 * dashboard.
 *
 * We keep the button as a `useFormStatus`-aware submit so it shows a spinner
 * and disables itself between the click and the browser redirect.
 */

import { useFormStatus } from "react-dom";
import { GithubLogo } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { signInWithGithub } from "@/features/auth/actions";

type GitHubSignInButtonProps = {
  size?: "default" | "lg";
  label?: string;
  className?: string;
  /** Optional post-login redirect path passed through the OAuth round-trip. */
  callbackUrl?: string;
};

function SubmitButton({
  size = "default",
  label = "Continue with GitHub",
  className,
}: Pick<GitHubSignInButtonProps, "size" | "label" | "className">) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size={size}
      disabled={pending}
      aria-busy={pending}
      className={cn(className)}
    >
      {pending ? <Spinner className="size-4" /> : <GithubLogo weight="fill" className="size-4" />}
      {pending ? "Redirecting…" : label}
    </Button>
  );
}

export function LandingGitHubButton({
  size = "default",
  label = "Continue with GitHub",
  className,
  callbackUrl,
}: GitHubSignInButtonProps) {
  return (
    <form action={signInWithGithub}>
      {callbackUrl ? <input type="hidden" name="callbackUrl" value={callbackUrl} /> : null}
      <SubmitButton size={size} label={label} className={className} />
    </form>
  );
}
