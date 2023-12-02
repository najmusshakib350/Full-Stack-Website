"use client";
import { Provider as P } from "react-redux";
import { store } from "./store";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return <P store={store}>{children}</P>;
};
