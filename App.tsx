import { StatusBar } from "react-native";
import React from "react";

import Router from "./app/Router";
import Providers from "./app/Providers";

export default function App() {
  return (
    <Providers>
      <StatusBar
        backgroundColor={"transparent"}
        barStyle={"light-content"}
        hidden={false}
        translucent={true}
      />
      <Router />
    </Providers>
  );
}
