import { GitPullRequestIcon, WarningCircleIcon } from "@phosphor-icons/react/dist/ssr";

import { LandingGitHubButton } from "@/components/landing/github-sign-in-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Human-readable copy for the error codes Better Auth appends to the callback
 * URL when the OAuth handshake fails. Unknown codes fall back to a generic line
 * so we never leak raw internal identifiers to the user.
 */
const ERROR_MESSAGES: Record<string, string> = {
  access_denied:
    "You cancelled the GitHub authorization. Try again when you're ready.",
  account_not_linked:
    "That GitHub account is already linked to a different sign-in method.",
  invalid_state: "Your sign-in link expired. Please start again.",
  oauth_failed: "GitHub couldn't complete the sign-in. Please try again.",
};

function messageForError(code?: string): string | null {
  if (!code) return null;
  return ERROR_MESSAGES[code] ?? "We couldn't sign you in. Please try again.";
}

type SignInCardProps = {
  /** Sanitised post-login redirect path passed through the OAuth round-trip. */
  callbackUrl?: string;
  /** The `?error=` code Better Auth appended, if the last attempt failed. */
  errorCode?: string;
};

export function SignInCard({ callbackUrl, errorCode }: SignInCardProps) {
  const error = messageForError(errorCode);

  return (
    <Card className="w-full max-w-sm border-border/60 shadow-xl shadow-primary/5">
      <CardHeader className="items-center text-center">
        <span className="mx-auto grid size-11 place-items-center rounded-2xl bg-primary/15 text-primary">
          <GitPullRequestIcon weight="bold" className="size-6" />
        </span>
        <CardTitle className="mt-3 text-xl">Sign in to MG7</CardTitle>
        <CardDescription>
          Connect your GitHub account to start reviewing pull requests.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {error && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive"
          >
            <WarningCircleIcon
              weight="fill"
              className="mt-0.5 size-4 shrink-0"
            />
            <span>{error}</span>
          </div>
        )}

        <LandingGitHubButton
          size="lg"
          label="Continue with GitHub"
          callbackUrl={callbackUrl}
          className="w-full"
        />
      </CardContent>

      <CardFooter className="justify-center">
        <p className="text-center text-xs text-muted-foreground">
          By continuing you agree to our Terms of Service and Privacy Policy.
        </p>
      </CardFooter>
    </Card>
  );
}
