"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";

// CSS FILES
import "react-toastify/dist/ReactToastify.min.css";
import 'react-circular-progressbar/dist/styles.css';

const queryClient = new QueryClient();

export default function Providers({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        newestOnTop={false}
        theme="colored"
        stacked
        hideProgressBar
      />

      {children}
    </QueryClientProvider>
  );
}
