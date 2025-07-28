// app/dashboard/layout.tsx
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Optional: You can add a sidebar/header here later */}
      {children}
    </div>
  );
}
