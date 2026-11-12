// GATE 0 PROBE — temporary. Delete after the Carbon go/no-go decision.
// Server component: tests that Carbon (Grid, Tile) can be imported from an RSC.
import type { Metadata } from "next";
import { Column, Grid, Tile } from "@carbon/react";
import { CarbonGateProbe } from "./CarbonGateProbe";
import "./carbon-gate.scss";

export const metadata: Metadata = { title: "Carbon gate", robots: { index: false, follow: false } };

export default function CarbonGatePage() {
  return (
    <div className="carbon-gate">
      <Grid>
        <Column sm={4} md={8} lg={4}>
          <Tile>Tile renderizado em server component.</Tile>
        </Column>
        <Column sm={4} md={8} lg={12}>
          <CarbonGateProbe />
        </Column>
      </Grid>
    </div>
  );
}
