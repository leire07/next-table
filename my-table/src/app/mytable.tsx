import React, { Key } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Pagination, user} from "@nextui-org/react";
import {Button} from "@nextui-org/button";
import {users} from "./data"

function handleDetailedReport(row:any) {
  // Handle view detailed report button click
}

function handleDownloadDetailedReport(row:any) {
  // Handle download detailed report button click
}

const columns = [
  {
    key: "name",
    label: "FILE NAME",
  },
  {
    key: "creation_date",
    label: "UPLOAD DATE",
  },
  {
    key: "last_update_date",
    label: "LAST REPORT DATE",
  },
  {
    key: "Detailed_report",
    label: "DETAILED REPORT",
  },
  {
    key: "Summary_report",
    label: "SUMMARY REPORT",
  },
  {
    key: "Actions",
    label: "ACTIONS",
  }
];

/** Para filtrar por el nombre de la columna */
function getCellContent(item: any, columnKey: Key) {
  const stringKey = columnKey.toString();
  if (stringKey === "Detailed_report") {
    return (
      <>
      <div className="button-container">
      <button className="my-button" onClick={() => console.log(false)}>Eye</button>
      <button className="my-button" onClick={() => console.log(false)}>Arrow</button>
      </div>
      
      </>
    );
  } 
  else if (stringKey === "Summary_report") {
    return (
      <>
      <div className="button-container">
      <button className="my-button" onClick={() => console.log(false)}>Eye</button>
      <button className="my-button" onClick={() => console.log(false)}>Arrow</button>
      </div>
      
      </>
    );
  }
  else if (stringKey === "Actions") {
    return (
      <>
      <div className="button-container">
      <button className="my-button" onClick={() => console.log(false)}>Refresh</button>
      <button className="my-button" onClick={() => console.log(false)}>Delete</button>
      </div>
      
      </>
    );
    }else {
    return getKeyValue(item, columnKey);
  }
}


export default function App() {

  /** Pagination */

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const pages = Math.ceil(users.length / rowsPerPage);

  return (
    <Table 
        aria-label="Example table with dynamic content" 
        className="my-table"
        selectionMode="multiple" 
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="warning"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
              className="pagination-button"
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return users.slice(start, end);
      }, [page])}>
        {(item) => (
          <TableRow key={item.key}>
            {columns.map((column) => (
              <TableCell key={column.key}>
                {getCellContent(item, column.key)}
              </TableCell>
            ))}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
