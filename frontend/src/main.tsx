import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";
import "./index.css";
import {
  QueryClient,
  QueryClientProvider,
  QueryCache,
  MutationCache,
} from "@tanstack/react-query";
import ReactDOMClient from "react-dom/client";
import { ThemeProvider, Toaster } from "@gravity-ui/uikit";

Toaster.injectReactDOMClient(ReactDOMClient);

const toaster = new Toaster();

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 5 * 60 * 1000,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      toaster.add({
        title: `Что-то пошло не так ${error.message}`,
        name: "errorToast",
      });
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      toaster.add({
        title: `Что-то пошло не так!`,
        content: `${error.message}. Проверьте данные ещё раз`,
        name: "errorToast",
      });
    },
  }),
});

const domNode = document.getElementById("root")!;
const root = createRoot(domNode);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme="light">
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
