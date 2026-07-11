export function MobilePrototype({ children }: { children: React.ReactNode }) {
  return (
    <div className="mobile-prototype relative flex min-h-dvh w-full flex-col overflow-hidden bg-bg-default">
      {children}
    </div>
  );
}
