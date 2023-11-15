import React, { useState, useEffect,  } from "react";
import "./mytable.css"; 
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Selection,
  SortDescriptor,
} from "@nextui-org/react";import {Button} from "@nextui-org/button";
import {data, columns} from "./data"
/*import "react-datepicker/dist/react-datepicker.css";*/
import {filterDate} from "../utils";
import { PDFViewer} from '@react-pdf/renderer';
import { CrearPDF } from '../drag_and_drop/renderPdf';
import { TopContent } from "./table_components/TopContent";
import {useRenderCell} from "./table_components/renderCell";
import { BottomContent } from "./table_components/BottomContent";
import { on } from "events";
type User = typeof data[0];


export default function App() {


  const [page, setPage] = React.useState(1);
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  const [selectValue, setValue] =  React.useState<Selection>(new Set([]));
  const [listPdfs, setlistPdfs] = useState<number[]>([]);
  /*
  const [dateStart, setDateStart] = React.useState<Date | null>(null);
  const [dateEnd, setDateEnd] = React.useState<Date | null>(null);
  */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [identificador, setId] = useState<number | null>(null);
  const arrayIdentifiersRef = React.useRef<number[]>([]);
  const [optionButton, setOptionButton] = useState<number | null>(null);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });  

  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, the
  effect is triggered whenever the `selectedKeys` or `data.length` values change. */
  useEffect(() => {
    let arrayKeys: string[] = Array.from(selectedKeys).map(key => key.toString());
    if (arrayKeys[0] === 'a') {
      arrayIdentifiersRef.current = Array.from({length: data.length}, (_, i) => i + 1);
      setlistPdfs(arrayIdentifiersRef.current);
    } else {
      arrayIdentifiersRef.current = arrayKeys.map(Number);
      setlistPdfs(arrayIdentifiersRef.current);
    }
    console.log("array de ids" + arrayIdentifiersRef.current);

  }, [selectedKeys, data.length]);

  const hasSearchFilter = Boolean(filterValue);


  /* The code is using the `useMemo` hook to memoize the filtered items based on the `data`,
  `hasSearchFilter`, `filterValue`, and `statusFilter` variables. */
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


  
  const renderCell = useRenderCell({ setIsModalOpen, setId, setOptionButton });


  /* The `items` constant is using the `useMemo` hook to memoize a subset of the `filteredItems` array
  based on the current `page` and `rowsPerPage` values. */
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);


  /* Order and filter columns */
  /* The `sortedItems` constant is using the `useMemo` hook to memoize a sorted subset of the `items`
  array based on the current `sortDescriptor` and `selectValue` values. */
  const sortedItems = React.useMemo(() => {    
    let state = 0
    let sortedData = [...items];
    let uploaded_data = [...items];
    
    let last_report_data = data.filter((item) => item.last_update_date !== null);
    //If the selected field of the item is equal to upload_date, order by upload date    
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
      //We update the status of the page
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      uploaded_data = uploaded_data.slice(start, end);

    //If the selected field of the item is equal to last_reported, sort by last report date
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

      //If the selected field of the item is equal to none, it takes the default sorting
    } else if (Array.from(selectValue).toString() == "none") {
      state = 0;
      sortedData = sortedData.sort((a: User, b: User) => {
        const first = a[sortDescriptor.column as keyof User] as number;
        const second = b[sortDescriptor.column as keyof User] as number;
        const cmp = first < second ? -1 : first > second ? 1 : 0;
  
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
      
    }
    /* Depending on the filter it will return some data or another */
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

  const topContent = React.useMemo(() => {
    return(
      <div>
        <TopContent 
          filterValue={filterValue}
          onClear={onClear}
          onSearchChange={onSearchChange}
          setValue={setValue}
          selectValue={selectValue}
          selectedKeys={arrayIdentifiersRef.current}
        />
        {/* Otros componentes y JSX aquí */}
      </div>
    );
  }, [filterValue, onClear, onSearchChange, setValue, selectValue, arrayIdentifiersRef.current]);

  const bottomContent = React.useMemo(() => {
    return (
      <BottomContent
        filteredItems={filteredItems}
        selectedKeys={selectedKeys}
        setPage={setPage}
        page={page}
        pages={pages}
      />
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter, filteredItems.length]);

  /* Table content and aspect */
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
            >{renderCell(item, columnKey)}
            </TableCell>}
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
                <Button onClick={() => setIsModalOpen(false)}>Close PDF</Button>
              </div>
            </div>
          )}

  </div>
  );
}


