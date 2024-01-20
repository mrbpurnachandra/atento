import * as React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-4 sm:mx-8 md:max-w-3xl md:mx-auto">{children}</main>
  );
}
