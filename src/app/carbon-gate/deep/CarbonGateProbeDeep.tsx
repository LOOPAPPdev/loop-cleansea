"use client";
// GATE 0 PROBE — temporary. Delete after the Carbon go/no-go decision.
// Exercises: interactive state (Modal), forms, DataTable render-props, icons.
import { useRef, useState } from "react";
import { Button } from "@carbon/react/es/components/Button/index.js";
import { DataTable } from "@carbon/react/es/components/DataTable/DataTable.js";
import { Table } from "@carbon/react/es/components/DataTable/Table.js";
import TableBody from "@carbon/react/es/components/DataTable/TableBody.js";
import TableCell from "@carbon/react/es/components/DataTable/TableCell.js";
import TableContainer from "@carbon/react/es/components/DataTable/TableContainer.js";
import TableHead from "@carbon/react/es/components/DataTable/TableHead.js";
import TableHeader from "@carbon/react/es/components/DataTable/TableHeader.js";
import TableRow from "@carbon/react/es/components/DataTable/TableRow.js";
import { InlineNotification } from "@carbon/react/es/components/Notification/Notification.js";
import { Modal } from "@carbon/react/es/components/Modal/index.js";
import { TextInput } from "@carbon/react/es/components/TextInput/index.js";
import { Grid } from "@carbon/react/es/components/Grid/Grid.js";
import Column from "@carbon/react/es/components/Grid/Column.js";
import { Tile } from "@carbon/react/es/components/Tile/Tile.js";
import { Add } from "@carbon/icons-react/es/generated/bucket-0.js";

const headers = [
  { key: "name", header: "Workflow" },
  { key: "area", header: "Área" },
  { key: "status", header: "Status" },
];
const rows = [
  { id: "1", name: "Triagem de leads", area: "Vendas", status: "Ativo" },
  { id: "2", name: "Fechamento mensal", area: "Finanças", status: "Piloto" },
  { id: "3", name: "Onboarding", area: "Pessoas", status: "Ativo" },
];

export function CarbonGateProbeDeep() {
  const [open, setOpen] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const [email, setEmail] = useState("");
  const invalid = email.length > 0 && !email.includes("@");

  return (
    <Grid><Column sm={4} md={8} lg={4}><Tile>Tile (deep import).</Tile></Column><Column sm={4} md={8} lg={12}>
    <div className="carbon-gate__stack">
      <InlineNotification kind="info" title="Gate 0" subtitle="Carbon probe renderizado." hideCloseButton />
      <TextInput
        id="gate-email"
        labelText="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        invalid={invalid}
        invalidText="Informe um e-mail válido."
      />
      <div>
        <Button ref={launcherRef} size="lg" renderIcon={Add} onClick={() => setOpen(true)}>
          Abrir modal
        </Button>
      </div>
      <DataTable rows={rows} headers={headers}>
        {({ rows: r, headers: h, getTableProps, getHeaderProps, getRowProps }) => (
          <TableContainer title="Workflows">
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {h.map((header) => {
                    const { key, ...rest } = getHeaderProps({ header });
                    return <TableHeader key={key} {...rest}>{header.header}</TableHeader>;
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {r.map((row) => {
                  const { key, ...rest } = getRowProps({ row });
                  return (
                    <TableRow key={key} {...rest}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>
      <Modal
        open={open}
        launcherButtonRef={launcherRef}
        modalHeading="Modal Carbon"
        primaryButtonText="Confirmar"
        secondaryButtonText="Cancelar"
        onRequestClose={() => setOpen(false)}
        onRequestSubmit={() => setOpen(false)}
      >
        <p>Esc fecha e devolve o foco.</p>
      </Modal>
    </div>
    </Column></Grid>
  );
}
