import React, {useEffect, Key} from "react";
import "../mytable.css"; 
import {
  Select,
  Input,
  SelectItem,
} from "@nextui-org/react";import {Button} from "@nextui-org/button";
import {columns_select} from "../data"
import {PiArrowDownFill} from "react-icons/pi";
import {HiTrash} from "react-icons/hi";
import {BiMenuAltLeft} from "react-icons/bi";
/*import "react-datepicker/dist/react-datepicker.css";*/
import {HandleZip} from "../../drag_and_drop/createPdf";
import arrayIdentificadoresRef from "../mytable";
import {data} from "../data";


/* The `interface TopContentProps` is defining the type of props that the `TopContent` component
expects to receive. */
interface TopContentProps {
    filterValue: string;
    onClear: () => void;
    onSearchChange: (value?: string) => void;
    setValue: (value: Set<any>) => void;
    selectValue: any; // Reemplaza 'any' con el tipo correcto
    selectedKeys: Array<Number>; // Reemplaza 'any' con el tipo correcto
  }




/* The code is defining a functional component called `TopContent` that takes in several props:
`filterValue`, `onClear`, `onSearchChange`, `setValue`, `selectValue`, and `selectedKeys`. */
export const TopContent = ({ filterValue, onClear, onSearchChange, setValue, selectValue, selectedKeys }: TopContentProps) => {
  const arrayIdentificadores = React.useRef<number[]>([]);

  useEffect(() => {
    let arrayKeys: string[] = Array.from(selectedKeys).map(key => key.toString());
    if (arrayKeys[0] === 'a') {
      arrayIdentificadores.current = Array.from({length: data.length}, (_, i) => i + 1);
    } else {
      arrayIdentificadores.current = arrayKeys.map(Number);
    }
  }, [selectedKeys, data.length]);

    return(
        <div className="flex flex-col gap-4" id="fondo-blanco">
                <div className="flex gap-4 h-full"
                style={{
                  display: "flex",
                  backgroundColor: "white",
                }}>
                  <div className="w-1/4 h-full" id="input-filter">
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
                  className="max-w-xs select-box"
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
              className="my-button-all" onClick={() => {HandleZip(arrayIdentificadores.current)}}
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
}