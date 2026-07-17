import { requireUnauth } from "@/features/auth/actions";
import { Backdrop } from "@/components/landing/backdrop";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUnauth();
  return (
    <div className="relative flex min-h-full flex-1 flex-col items-center justify-center px-4 py-12">
      <Backdrop />
      {/* Focused glow directly behind the auth card. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 size-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl"
      />
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}
