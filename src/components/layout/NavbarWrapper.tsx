import { Suspense } from "react";
import { NavbarClient } from "./Navbar";

export function Navbar() {
  return (
    <Suspense fallback={null}>
      <NavbarClient />
    </Suspense>
  );
}
