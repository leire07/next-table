import React, { useState, useEffect } from "react";
import "./mytable.css"; 
import {
  Table,
  Select,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  User,
  Pagination,
  Selection,
  SortDescriptor,
  SelectItem,
} from "@nextui-org/react";import {Button} from "@nextui-org/button";
import {data, columns, columns_select} from "./data"
import {Tooltip} from "@nextui-org/tooltip";
import {AiOutlineEye} from "react-icons/ai";
import {PiArrowDownFill} from "react-icons/pi";
import {LuRefreshCw} from "react-icons/lu";
import {HiTrash} from "react-icons/hi";
import {BiMenuAltLeft} from "react-icons/bi";
/*import "react-datepicker/dist/react-datepicker.css";*/
import {filterDate} from "../utils";
import { Document, PDFViewer, PDFDownloadLink} from '@react-pdf/renderer';
import { CrearPDF } from './renderPdf';
import {HandleZip} from "./createPdf";


const INITIAL_VISIBLE_COLUMNS = ["FILE NAME", "UPLOAD DATE", "LAST REPORT DATE", "DETAILED REPORT", "SUMMARY REPORT", "ACTIONS"];

type User = typeof data[0];


export default function App() {


  const [page, setPage] = React.useState(1);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const [selectValue, setValue] =  React.useState<Selection>(new Set([]));
  const [dateStart, setDateStart] = React.useState<Date | null>(null);
  const [dateEnd, setDateEnd] = React.useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [identificador, setId] = useState<number | null>(null);
  const arrayIdentificadoresRef = React.useRef<number[]>([]);
  const [optionButton, setOptionButton] = useState<number | null>(null);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  useEffect(() => {
    let arrayKeys: string[] = Array.from(selectedKeys).map(key => key.toString());
    if (arrayKeys[0] === 'a') {
      arrayIdentificadoresRef.current = Array.from({length: data.length}, (_, i) => i + 1);
    } else {
      arrayIdentificadoresRef.current = arrayKeys.map(Number);
    }
    console.log(arrayIdentificadoresRef.current); // Debería mostrar el valor actualizado
  }, [selectedKeys, data.length]);
  

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

  /* Ordenar y filtrar columnas */
  const sortedItems = React.useMemo(() => {    
    let state = 0
    let sortedData = [...items];
    let uploaded_data = [...items];
    
    let last_report_data = data.filter((item) => item.last_update_date !== null);

    if (Array.from(selectValue).toString() == "upload_date") {
      state = 1;
      uploaded_data = data.sort((a, b) => {
        const dateA = new Date(a.creation_date);
        const dateB = new Date(b.creation_date);
      
        if (dateA < dateB) {
          return -1;
        } else if (dateA > dateB) {
          return 1;
        } else {
          return 0;
        }
      }
      );
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      uploaded_data = uploaded_data.slice(start, end);

    }else if (Array.from(selectValue).toString() == "last_reported") {
      state = 2;
      last_report_data = data.sort((a, b) => {
        const dateA = new Date(filterDate(a.last_update_date));
        const dateB = new Date(filterDate(b.last_update_date));
        console.log(dateA, dateB);
      
        if (dateA < dateB) {
          return -1;
        } else if (dateA > dateB) {
          return 1;
        } else {
          return 0;
        }
      }
      );
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      last_report_data = last_report_data.slice(start, end);

    } else if (Array.from(selectValue).toString() == "none") {
      state = 0;
      sortedData = sortedData.sort((a: User, b: User) => {
        const first = a[sortDescriptor.column as keyof User] as number;
        const second = b[sortDescriptor.column as keyof User] as number;
        const cmp = first < second ? -1 : first > second ? 1 : 0;
  
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
      
    }
    /* Dependiedno del filtro devolverá unos datos u otros */
    if (state ==1 ){
      return uploaded_data;
    }else if (state == 2){
      return last_report_data;
    }else if (state == 0){
      return sortedData;
    }
    

  }, [sortDescriptor, items, selectValue,items, items.length, page, pages, hasSearchFilter, filteredItems.length]);


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

  console.log(selectedKeys)
  /* Contenido de arriba de la tabla */
  const topContent = React.useMemo(() => {
    return(
    <div className="flex flex-col gap-4" id="fondo-blanco">
            <div className="flex gap-4 h-full"
            style={{
              display: "flex",
              backgroundColor: "white",
            }}>
              <div className="w-1/4 h-full caja-filter" id="input-filter">
                <Input
                  label="Filter"
                  isClearable
                  placeholder="Search by name..."
                  /* startContent={<BsSearch />} */
                  value={filterValue}
                  onClear={() => onClear()}
                  onValueChange={onSearchChange}
                />
              </div>
              <div className="w-2/4 h-full">
            <Select
              style={{backgroundColor:"transparent"}}
              /* label="Ordenar por:" */
              placeholder="Selecciona una opción"
              startContent={<BiMenuAltLeft color="#F17F16"/>}
              className="max-w-xs caja-select"
              selectedKeys={Array.from(selectValue)}
              onSelectionChange={(keys) => setValue(new Set(keys))}
            >
              {columns_select.map((cd) => (
                <SelectItem key={cd.value} value={cd.value} className="item-select">
                  {cd.label}
                </SelectItem>
              ))}
            </Select>
            </div>
            {
            /* //Filtrar por fechas comentado por ahora
            <div className="data-picker-container">
              <AiOutlineCalendar size="1.5rem"></AiOutlineCalendar>
            <DatePicker
            dateFormat="dd/MM/yyyy"
            className="data-picker"
              selected={dateStart}
              selectsStart
              startDate={dateStart}
              endDate={dateEnd} // add the endDate to your startDate DatePicker now that it is defined
              onChange={date => setDateStart(date || new Date())}
            />
            </div>
            <div className="data-picker-container">
            <AiOutlineCalendar size="1.5rem"></AiOutlineCalendar>
            <DatePicker
            dateFormat="dd/MM/yyyy"
            className="data-picker"
              selected={dateEnd}
              selectsEnd
              startDate={dateStart}
              endDate={dateEnd}
              minDate={dateStart}
              onChange={date => setDateEnd(date || new Date())}
            />
            </div>
            
            <div>
          <Button
          className="my-button-date" onClick={() => handleSearch()}
          isIconOnly>
          <BsSearch size="1.5rem"/>
          </Button>
          <Button 
          className="my-button-date" onClick={() => handleSearch()}
          isIconOnly>
          <RxCross2 size="1.5rem"/>
          </Button>
          </div>
          */
        }
            <div style={
            {
              marginLeft: "auto",
            }
          }>
          <Button isDisabled={selectedKeys.size === 0}
          className="my-button-all" onClick={() => {HandleZip(arrayIdentificadoresRef.current)}}
          isIconOnly>
          <PiArrowDownFill size="1.5rem"/>
          </Button>
          <Button isDisabled={selectedKeys.size === 0}
          className="my-button-all" onClick={() => {setValue;}}
          isIconOnly>
          <HiTrash size="1.5rem"/>
          </Button>
          </div> 
          </div>
            </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter, filteredItems.length, selectValue, onSearchChange, filterValue, onClear, dateStart, dateEnd]);

  /* Contenido de debajo de la tabla */
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
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter, filteredItems.length]);


  /* Renderizar celdas, importante para el filtrado, botones y contenido de las celdas*/
  const renderCell = React.useCallback((item: User, columnKey: React.Key) => {
    const requiresUserValidation = item.requires_user_validation;

    switch (columnKey) {
      case "Detailed_report":
        return (
          <div className="button-container">
        <Tooltip content="Visualizar" style={{ color: 'orange'}} isDisabled={requiresUserValidation ? true : false}>
        <Button
          isIconOnly
          isDisabled={requiresUserValidation ? true : false}
          className="my-button"
          onClick={() => {setIsModalOpen(true); setId(item.key); setOptionButton(1)}}>
        <AiOutlineEye size="1.5rem"/>
        </Button>
        </Tooltip>
        <PDFDownloadLink document={<CrearPDF id={item.key} option={1} />} fileName="documento.pdf">
        <Tooltip content="Descargar" style={{ color: 'orange'}} isDisabled={requiresUserValidation ? true : false}>
        <Button 
        isIconOnly
        isDisabled={requiresUserValidation ? true : false} 
        className="my-button">
        <PiArrowDownFill size="1.5rem"/>
        </Button>
        </Tooltip>
        </PDFDownloadLink>
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
          onClick={() => {setIsModalOpen(true); setId(item.key); setOptionButton(2)}}>
        <AiOutlineEye size="1.5rem"/>
        </Button>
        </Tooltip>
        <PDFDownloadLink document={<CrearPDF id={item.key} option={2} />} fileName="documento.pdf">
        <Tooltip content="Descargar" style={{ color: 'orange'}} isDisabled={requiresUserValidation ? true : false}>
        <Button 
        isIconOnly
        isDisabled={requiresUserValidation ? true : false} 
        className="my-button" onClick={() => console.log("xd")}>
        <PiArrowDownFill size="1.5rem"/>
        </Button>
        </Tooltip>
        </PDFDownloadLink>
        </div>
          );
        case "Actions":
          if (requiresUserValidation == false){
          return(
            <div className="button-container">
        <Tooltip content="Regenerar" style={{ color: 'orange'}}>
        <Button 
        isIconOnly
        className="my-button"
        isDisabled={requiresUserValidation ? true : false} 
        onClick={() => console.log("Boton regenerar")}>
        <LuRefreshCw size="1.5rem"/>
        </Button>
        </Tooltip>
        <Tooltip content="Eliminar" style={{ color: 'orange'}}>
        <Button 
        isIconOnly
        isDisabled={requiresUserValidation ? true : false} 
        className="my-button" 
        onClick={() => (console.log("Boton borrar"))}>
        <HiTrash size="1.5rem"/>
        </Button>
        </Tooltip>
        </div>
          );
          }else{
            return(
              <div>
          <Tooltip content="Validar" style={{color: 'orange'}}>
          <Button 
          className="my-button" onClick={() => (console.log("validar"))}>
            Assembly
          </Button>
          </Tooltip>
          </div>
            );
          }
      default:
        const cellValue = item[columnKey as keyof typeof item];
        return cellValue;
    }
  }, []);



  /* Contenido de la tabla y aspecto */
  return (
    <div>
    <Table
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        textAlign: "center"
      }}
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
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
      <TableHeader
      style={{ textAlign: "center" }}
        columns={columns}>
        {(column) => <TableColumn
        key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
      items={sortedItems}>
        {(item) => (  // Aquí definimos el tipo de item
          <TableRow   key={item.key}>
            {(columnKey) => <TableCell
            >{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>

    {isModalOpen && identificador !== null && optionButton !== null && (
            <div className="modal">
              <div className="modal-content">
                <PDFViewer style={{ width: "100%", height: "90vh" }}>
                  <CrearPDF id={identificador} option={optionButton} />
                </PDFViewer>
                <Button onClick={() => setIsModalOpen(false)}>Cerrar PDF</Button>
              </div>
            </div>
          )}

  </div>
  );
}


