'use client'
import MyTable from './table/mytable'
import DragnDrop from './table/dragndrop'
// 1. import `NextUIProvider` component
import {Button} from '@nextui-org/button'
import React, { useState, useReducer } from "react";
import RenderFile from './table/RenderFile';
import { Document, PDFViewer, PDFDownloadLink} from '@react-pdf/renderer';
import { CrearPDF } from './table/renderPdf';



export default function Home() {
  const [file, setFile] = useState<File | null>(null);



  const handleUpload = () => {
    const formData = new FormData();
    if (file !== null){
      const formData = new FormData();
      formData.append('myFile', file);
      /* 
      No sé donde se sube el archivo, pero se sube con el nombre myFile
      Video de referencia que he usado: https://www.youtube.com/watch?v=qEM6-C_n068&list=PLQKg8mIgoxKpabc2THMtnSJNBLIezc4C2&index=8
      */
    }
  }

  const handleClear = () => {
    if (file !== null) {
      setFile(null)
  }
}

  const styleTittle = {
    color: 'violet',
    fontSize: '2rem',  // Tamaño grande
    marginTop: '20px',  // Margen en la parte superior
  };

  const styleBox = {
    margin: "1rem",
    paddingLeft: '9rem',
    paddingRight: '9rem',
  }
  return (  
    <main className="py-24 home">
      <header className="flex flex-col items-center justify-center min-h-screen py-2 header-table">
      <h1 className='tittle-report'>VarReport</h1>
      </header>
      <div style={
        {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          paddingLeft: '10rem',
          paddingRight: '10rem',
          paddingBottom: '3rem',
        }
      }>
        <DragnDrop setFile={setFile}/>
        {file && <RenderFile file={file} name={file.name}/>}

        <div/>
        {file && (
        <div className='flex justify-center items-center w-full p-4 my-2'>
          <Button style={{marginRight: '1rem'}} className='mx-2' onClick={handleUpload}>Upload</Button>
          <Button className='mx-2' onClick={handleClear}>Clear</Button>
        </div>
      )}
      </div>
      <div style={styleBox}>
        <div style={styleTittle}>
        <h1 className='tittle-table'>VCF Files Uploaded</h1>
        </div>
        <MyTable/>
      </div>
    </main>

  )
  }
