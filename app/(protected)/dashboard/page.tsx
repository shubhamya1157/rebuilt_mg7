import {
  GitPullRequestIcon,
  ShieldCheckIcon,
  GitMergeIcon,
  GaugeIcon,
} from "@phosphor-icons/react/dist/ssr";

import { getServerSession } from "@/features/auth/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const STATS = [
  {
    icon: GitPullRequestIcon,
    label: "Open pull requests",
    value: "—",
    hint: "Awaiting review",
  },
  {
    icon: ShieldCheckIcon,
    label: "Security signals",
    value: "—",
    hint: "Flagged this week",
  },
  {
    icon: GitMergeIcon,
    label: "Merged with MG7",
    value: "—",
    hint: "All time",
  },
  {
    icon: GaugeIcon,
    label: "Avg. risk score",
    value: "—",
    hint: "Lower is better",
  },
] as const;

export default async function DashboardPage() {
  const session = await getServerSession();
  const firstName = session?.user?.name?.split(" ")[0] ?? "there";

  return (
    <div className="relative min-h-full">
      {/* Soft cinematic wash behind the dashboard content. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="animate-glow-pulse absolute -left-20 -top-24 size-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="animate-glow-pulse absolute right-0 top-10 size-72 rounded-full bg-chart-2/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <header className="animate-fade-up">
          <p className="font-heading text-sm font-semibold uppercase tracking-widest text-primary">
            Overview
          </p>
          <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Welcome back, {firstName}.
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Here&apos;s the pulse of your review workflow. Connect a repository
            to start seeing MG7 feedback land on every pull request.
          </p>
        </header>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map(({ icon: Icon, label, value, hint }) => (
            <Card
              key={label}
              className="group relative overflow-hidden border-border/60 bg-card/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_12px_40px_-12px_var(--primary)]"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
              <CardHeader className="flex flex-row items-center justify-between gap-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {label}
                </CardTitle>
                <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                  <Icon className="size-5" weight="bold" />
                </span>
              </CardHeader>
              <CardContent>
                <p className="font-heading text-3xl font-bold tracking-tight">
                  {value}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
