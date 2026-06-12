import React from "react";
import ReactQueryProvider from "./providers/reaqt-query-provider";
import { TanStackDevtools } from "@tanstack/react-devtools";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    // ReactQueryProvider
    <ReactQueryProvider>
      {/* <ReactQueryDevtools */}
      <TanStackDevtools config={{ defaultOpen: false }} />
      {children}
    </ReactQueryProvider>
  );
}
