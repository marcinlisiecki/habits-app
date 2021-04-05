import { StatusBar } from "expo-status-bar";
import React from "react";

import Router from "./app/Router";
import Providers from "./app/Providers";

export default function App() {
  return (
    <Providers>
      <StatusBar style={"dark"} />
      <Router />
    </Providers>
  );
}
