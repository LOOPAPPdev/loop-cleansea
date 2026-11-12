// GATE 0 PROBE — temporary. Bundle-size comparison: deep imports, no barrel.
import type { Metadata } from "next";
import { CarbonGateProbeDeep } from "./CarbonGateProbeDeep";
import "../carbon-gate.scss";

export const metadata: Metadata = { title: "Carbon gate (deep)", robots: { index: false, follow: false } };

export default function CarbonGateDeepPage() {
  return (
    <div className="carbon-gate">
      <CarbonGateProbeDeep />
    </div>
  );
}
