"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
import { LanguageProvider } from "../components/LanguageProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </Provider>
  );
}
