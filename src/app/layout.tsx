import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Developers Needs — Minecraft Resource Marketplace",
    template: "%s | Developers Needs",
  },
  description:
    "Your ultimate destination for premium Minecraft resources. Browse plugins, setups, maps, configs, and more from talented developers.",
  keywords: [
    "Minecraft",
    "plugins",
    "resources",
    "marketplace",
    "server",
    "mods",
    "maps",
    "setups",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        <SessionProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#0f172a",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#e2e8f0",
              },
            }}
          />
        </SessionProvider>
      </body>
    </html>
  );
}
