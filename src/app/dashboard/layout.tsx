"use client";

import DashboardNavbar from "@/components/DashboardNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardNavbar />
      <main className="pt-20 px-6">{children}</main>
    </>
  );
}
