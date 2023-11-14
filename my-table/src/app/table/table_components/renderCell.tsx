import React from "react";
import "../mytable.css"; 
import {Button} from "@nextui-org/button";
import {Tooltip} from "@nextui-org/tooltip";
import {AiOutlineEye} from "react-icons/ai";
import {PiArrowDownFill} from "react-icons/pi";
import {LuRefreshCw} from "react-icons/lu";
import {HiTrash} from "react-icons/hi";
/*import "react-datepicker/dist/react-datepicker.css";*/
import { PDFDownloadLink} from '@react-pdf/renderer';
import { CrearPDF } from '../../drag_and_drop/renderPdf';
import {CircularProgress} from "@nextui-org/react";
import {data} from "../data";

type User = typeof data[0];

interface renderCellProps {
    setIsModalOpen: (value: boolean) => void;
    setId: (value: number) => void;
    setOptionButton: (value: number) => void;

  }

  /* The `useRenderCell` function is a custom hook that takes in three functions (`setIsModalOpen`,
  `setId`, `setOptionButton`) as arguments and returns a memoized callback function. */
  export const useRenderCell = ({ setIsModalOpen, setId, setOptionButton }: renderCellProps) => {
    return React.useCallback((item: User, columnKey: React.Key) => {
      const requiresUserValidation = item.requires_user_validation;
      const regenerating = item.is_regenerating;
  
      switch (columnKey) {
        case "Detailed_report":
          return (
            <div className="button-container">
          <Tooltip content="Visualizar" style={{ color: 'orange'}} isDisabled={requiresUserValidation || regenerating}>
          <Button
            isIconOnly
            isDisabled={requiresUserValidation || regenerating}
            className="my-button"
            onClick={() => {setIsModalOpen(true); setId(item.key); setOptionButton(1)}}>
          <AiOutlineEye size="1.5rem"/>
          </Button>
          </Tooltip>
          {/* Esto inhabilita la descarga del PDF si is_regenerating y validation son true */}
          {!regenerating && !requiresUserValidation ? (
            <PDFDownloadLink document={<CrearPDF id={item.key} option={1} />} fileName="documento.pdf">
              <Tooltip content="Descargar" style={{ color: 'orange'}} isDisabled={requiresUserValidation || regenerating}>
                <Button 
                  isIconOnly
                  isDisabled={requiresUserValidation || regenerating} 
                  className="my-button">
                  <PiArrowDownFill size="1.5rem"/>
                </Button>
              </Tooltip>
            </PDFDownloadLink>
            ) : (
              <Tooltip content="Descargar" style={{ color: 'orange'}} isDisabled={true}>
                <Button 
                  isIconOnly
                  isDisabled={true} 
                  className="my-button">
                  <PiArrowDownFill size="1.5rem"/>
                </Button>
              </Tooltip>
            )}
          </div>
          );
          case "Summary_report":
            return(
              <div className="button-container">
          <Tooltip content="Visualizar" style={{ color: 'orange'}} isDisabled={requiresUserValidation || regenerating}>
          <Button
            isIconOnly
            isDisabled={requiresUserValidation || regenerating}
            className="my-button"
            onClick={() => {setIsModalOpen(true); setId(item.key); setOptionButton(2)}}>
          <AiOutlineEye size="1.5rem"/>
          </Button>
          </Tooltip>
          {/* Esto inhabilita la descarga del PDF si is_regenerating y validation son true */}
          {!regenerating && !requiresUserValidation ? (
            <PDFDownloadLink document={<CrearPDF id={item.key} option={1} />} fileName="documento.pdf">
              <Tooltip content="Descargar" style={{ color: 'orange'}} isDisabled={requiresUserValidation || regenerating}>
                <Button 
                  isIconOnly
                  isDisabled={requiresUserValidation || regenerating} 
                  className="my-button">
                  <PiArrowDownFill size="1.5rem"/>
                </Button>
              </Tooltip>
            </PDFDownloadLink>
            ) : (
              <Tooltip content="Descargar" style={{ color: 'orange'}} isDisabled={true}>
                <Button 
                  isIconOnly
                  isDisabled={true} 
                  className="my-button">
                  <PiArrowDownFill size="1.5rem"/>
                </Button>
              </Tooltip>
            )}
          </div>
            );
          case "Actions":
            if (regenerating == true){
              return(
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress aria-label="Loading..."/>
                </div>
              );
              }else if (requiresUserValidation == false){
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
    }, [setIsModalOpen, setId, setOptionButton]);
};