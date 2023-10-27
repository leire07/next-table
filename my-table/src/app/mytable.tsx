import React, { Key, useState, useEffect } from "react";
import {
  Table,
  Select,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  SelectItem,
  getKeyValue
} from "@nextui-org/react";import {Button} from "@nextui-org/button";
import {data, columns} from "./data"
import {Tooltip} from "@nextui-org/tooltip";
import {AiOutlineEye} from "react-icons/ai";
import {PiArrowDownFill} from "react-icons/pi";
import {LuRefreshCw} from "react-icons/lu";
import {HiTrash} from "react-icons/hi";
import {BsSearch} from "react-icons/bs";
import {capitalize, handleDetailedReport, handleDownloadDetailedReport, handleRegenerate, handleDelete} from "./utils";
import { color } from "framer-motion";
import { Icon } from "next/dist/lib/metadata/types/metadata-types";

const INITIAL_VISIBLE_COLUMNS = ["FILE NAME", "UPLOAD DATE", "LAST REPORT DATE", "DETAILED REPORT", "SUMMARY REPORT", "ACTIONS"];

type User = typeof data[0];

export default function App() {

  /** Pagination */

  const [page, setPage] = React.useState(1);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...data];
  
    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
  
    return filteredUsers;
  }, [data, hasSearchFilter, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);


  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number;
      const second = b[sortDescriptor.column as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);


  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      console.log("value", value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])


  /* Contenido de la parte superior de la tabla */
  const topContent = React.useMemo(() => {
    let columns_select = [
      { key: "upload_date", label: "Upload Date" },
      { key: "last_reported", label: "Last Reported" },
    ];
    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-end h-full">
          <div className="w-1/4 h-full caja-filter">
            <Input
              isClearable
              placeholder="Search by name..."
              startContent={<BsSearch />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
          </div>
          <div className="w-2/4 h-full caja-select">
          <Select
            label="Filtrar por..."
            placeholder="Selecciona un filtro"
            className="h-full max-h-full"
          >
            {columns_select.map((column) => (
              <SelectItem key={column.key} value={column.key} className="item-select">
                {column.label}
              </SelectItem>
            ))}
          </Select>
          </div>
        </div>
</div>
    );
  }, [filterValue,statusFilter,visibleColumns,onSearchChange,onRowsPerPageChange,data.length,hasSearchFilter,
  ]);

  /* Contenido de la paginación */
  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
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
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter, filteredItems.length]);

  /* Renderizar celdas, importante para el filtrado, botones y contenido de las celdas*/
  const renderCell = React.useCallback((item: User, columnKey: React.Key) => {
    const requiresUserValidation = item.requires_user_validation;

    console.log("item", item);

    switch (columnKey) {
      case "Detailed_report":
        return (
          <div className="button-container">
        <Tooltip content="Visualizar" style={{ color: 'orange'}} isDisabled={requiresUserValidation ? true : false}>
        <Button
          isIconOnly
          isDisabled={requiresUserValidation ? true : false}
          className="my-button"
          onClick={() => handleDetailedReport(item.key) }>
        <AiOutlineEye size="1.5rem"/>
        </Button>
        </Tooltip>
        <Tooltip content="Descargar" style={{ color: 'orange'}} isDisabled={requiresUserValidation ? true : false}>
        <Button 
        isIconOnly
        isDisabled={requiresUserValidation ? true : false} 
        className="my-button" onClick={() => handleDownloadDetailedReport(item.key)}>
        <PiArrowDownFill size="1.5rem"/>
        </Button>
        </Tooltip>
        </div>
        );
        case "Summary_report":
          return(
            <div className="button-container">
        <Tooltip content="Visualizar" style={{ color: 'orange'}} isDisabled={requiresUserValidation ? true : false}>
        <Button
          isIconOnly
          isDisabled={requiresUserValidation ? true : false}
          className="my-button"
          onClick={() => handleDetailedReport(item.key)}>
        <AiOutlineEye size="1.5rem"/>
        </Button>
        </Tooltip>
        <Tooltip content="Descargar" style={{ color: 'orange'}} isDisabled={requiresUserValidation ? true : false}>
        <Button 
        isIconOnly
        isDisabled={requiresUserValidation ? true : false} 
        className="my-button" onClick={() => handleDownloadDetailedReport(item.key)}>
        <PiArrowDownFill size="1.5rem"/>
        </Button>
        </Tooltip>
        </div>
          );
        case "Actions":
          return(
            <div className="button-container">
        <Tooltip content="Regenerar" style={{ color: 'orange'}}>
        <Button 
        isIconOnly
        isDisabled={requiresUserValidation ? true : false} 
        className="my-button" onClick={() => handleRegenerate(item.key)}>
        <LuRefreshCw size="1.5rem"/>
        </Button>
        </Tooltip>
        <Tooltip content="Eliminar" style={{ color: 'orange'}}>
        <Button 
        isIconOnly
        isDisabled={requiresUserValidation ? true : false} 
        className="my-button" onClick={() => handleDelete(item.key)}>
        <HiTrash size="1.5rem"/>
        </Button>
        </Tooltip>
        </div>
          );
      default:
        const cellValue = item[columnKey as keyof typeof item];
        return cellValue;
    }
  }, []);


  /* Contenido de la tabla y aspecto */
  return (
    <div className="my-table-container">
    <Table 
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      className="my-table"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
    >
      <TableHeader  columns={columns}>
        {(column) => <TableColumn className="alinear-celda" key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={sortedItems}>
        {(item: typeof sortedItems[0]) => (  // Aquí definimos el tipo de item
          <TableRow key={item.key}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  
  </div>
  );
}
