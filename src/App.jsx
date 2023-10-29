import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { StopWatch } from "./components/StopWatch/StopWatch";

export function App() {
  return (
    <>
      <header>
        <h1>Tidsrapportering</h1>
        <p>
          En enkel app som räknar tiden du lägger på en viss uppgift och sparar
          det som en arbetsuppgift nedan.
        </p>
      </header>
      <main>
        <StopWatch />
      </main>
    </>
  );
}

export default App;
