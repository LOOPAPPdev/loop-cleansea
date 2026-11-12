"use client";
// GATE 0 PROBE — temporary. Delete after the Carbon go/no-go decision.
// Exercises: interactive state (Modal), forms, DataTable render-props, icons.
import { useRef, useState } from "react";
import {
  Button,
  DataTable,
  InlineNotification,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TextInput,
} from "@carbon/react";
import { Add } from "@carbon/icons-react";

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

export function CarbonGateProbe() {
  const [open, setOpen] = useState(false);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const [email, setEmail] = useState("");
  const invalid = email.length > 0 && !email.includes("@");

  return (
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
  );
}
