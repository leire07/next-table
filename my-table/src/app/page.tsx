'use client'
import MyTable from './table/mytable'
import DragnDrop from './table/dragndrop'
// 1. import `NextUIProvider` component
import {Button} from '@nextui-org/button'
import React, { useState } from "react";



export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const styleTittle = {
    color: 'violet',
    fontSize: '2rem',  // Tamaño grande
    marginTop: '20px',  // Margen en la parte superior
  };

  const styleBox = {
    margin: "1rem",
    paddingLeft: '3rem',
    paddingRight: '3rem',
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
          paddingLeft: '3rem',
          paddingRight: '3rem',
        }
      }>
        <DragnDrop setFile={setFile}/>
        {
          file && <p>{file.name}</p>
        }
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
