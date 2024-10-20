import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "~/styles/globals.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "frere memoir",
  description: "花束問題のアプリケーション",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <TRPCReactProvider>
          <MantineProvider>
            {children}
            <Notifications />
          </MantineProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
