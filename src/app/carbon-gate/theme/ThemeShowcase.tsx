"use client";
// GATE 1 PREVIEW — Carbon components in the Loop theme. Deep imports only (rule 1).
import { useRef, useState } from "react";
import { Button } from "@carbon/react/es/components/Button/index.js";
import { TextInput } from "@carbon/react/es/components/TextInput/index.js";
import { Tile } from "@carbon/react/es/components/Tile/Tile.js";
import { InlineNotification } from "@carbon/react/es/components/Notification/Notification.js";
import { Modal } from "@carbon/react/es/components/Modal/index.js";
import { DataTable } from "@carbon/react/es/components/DataTable/DataTable.js";
import { Table } from "@carbon/react/es/components/DataTable/Table.js";
import TableBody from "@carbon/react/es/components/DataTable/TableBody.js";
import TableCell from "@carbon/react/es/components/DataTable/TableCell.js";
import TableContainer from "@carbon/react/es/components/DataTable/TableContainer.js";
import TableHead from "@carbon/react/es/components/DataTable/TableHead.js";
import TableHeader from "@carbon/react/es/components/DataTable/TableHeader.js";
import TableRow from "@carbon/react/es/components/DataTable/TableRow.js";
import { Add } from "@carbon/icons-react/es/generated/bucket-0.js";

const kinds = ["primary", "secondary", "tertiary", "ghost", "danger"] as const;
const notes = [
  { kind: "info", title: "Info", subtitle: "Mensagem informativa." },
  { kind: "success", title: "Sucesso", subtitle: "Workflow publicado." },
  { kind: "warning", title: "Atenção", subtitle: "Revise os dados." },
  { kind: "error", title: "Erro", subtitle: "Falha ao salvar." },
] as const;
const headers = [
  { key: "name", header: "Workflow" },
  { key: "area", header: "Área" },
  { key: "status", header: "Status" },
];
const rows = [
  { id: "1", name: "Triagem de leads", area: "Vendas", status: "Ativo" },
  { id: "2", name: "Fechamento mensal", area: "Finanças", status: "Piloto" },
];

export function ThemeShowcase() {
  const [open, setOpen] = useState(false);
  const launcher = useRef<HTMLButtonElement>(null);
  const [email, setEmail] = useState("nome@empresa");
  const invalid = email.length > 0 && !/^\S+@\S+\.\S+$/.test(email);

  return (
    <div className="showcase">
      <section aria-labelledby="sc-buttons" className="showcase__block">
        <h3 id="sc-buttons">Botões</h3>
        <div className="showcase__row">
          {kinds.map((k) => (
            <Button key={k} kind={k} size="lg">{k}</Button>
          ))}
          <Button size="lg" disabled>disabled</Button>
          <Button ref={launcher} size="lg" renderIcon={Add} onClick={() => setOpen(true)}>Abrir modal</Button>
        </div>
      </section>

      <section aria-labelledby="sc-fields" className="showcase__block">
        <h3 id="sc-fields">Campos</h3>
        <div className="showcase__grid">
          <TextInput id="sc-name" labelText="Nome" placeholder="Seu nome" helperText="Como aparece no contrato." />
          <TextInput
            id="sc-email"
            labelText="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            invalid={invalid}
            invalidText="Informe um e-mail válido."
            // Carbon sets only aria-errormessage (uneven screen-reader support).
            // Loop wrapper rule: also link the error via aria-describedby.
            aria-describedby={invalid ? "sc-email-error-msg" : undefined}
          />
          <TextInput id="sc-off" labelText="Desativado" disabled defaultValue="Somente leitura" />
        </div>
      </section>

      <section aria-labelledby="sc-notes" className="showcase__block">
        <h3 id="sc-notes">Notificações</h3>
        <div className="showcase__grid">
          {notes.map((n) => (
            <InlineNotification key={n.kind} kind={n.kind} title={n.title} subtitle={n.subtitle} lowContrast hideCloseButton />
          ))}
          {notes.slice(0, 2).map((n) => (
            <InlineNotification key={`hc-${n.kind}`} kind={n.kind} title={n.title} subtitle="Alto contraste." hideCloseButton />
          ))}
        </div>
      </section>

      <section aria-labelledby="sc-surfaces" className="showcase__block">
        <h3 id="sc-surfaces">Superfícies</h3>
        <div className="showcase__grid">
          <Tile>Tile em layer-01 (color-surface).</Tile>
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
                          {row.cells.map((cell) => <TableCell key={cell.id}>{cell.value}</TableCell>)}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </DataTable>
        </div>
      </section>

      <Modal
        open={open}
        launcherButtonRef={launcher}
        modalHeading="Modal no tema Loop"
        primaryButtonText="Confirmar"
        secondaryButtonText="Cancelar"
        onRequestClose={() => setOpen(false)}
        onRequestSubmit={() => setOpen(false)}
      >
        <p>Esc fecha e devolve o foco ao botão.</p>
      </Modal>
    </div>
  );
}
