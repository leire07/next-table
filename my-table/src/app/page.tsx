'use client'
import MyTable from './table/mytable'
import DragnDrop from './drag_and_drop/dragndrop'
// 1. import `NextUIProvider` component
import { Button } from '@nextui-org/button'
import React, { useState } from "react";
import RenderFile from './drag_and_drop/RenderFile';

export default function Home() {
  const [files, setFiles] = useState<File[]>([]);

  const handleUpload = () => {
    const formData = new FormData();
    if (files.length > 0) {
      files.forEach((file, index) => {
        formData.append('myFile' + index, file);
      });
      /* 
      I don't know where the file is uploaded, but it will upload with the name "myFile"
      Video reference: https://www.youtube.com/watch?v=qEM6-C_n068&list=PLQKg8mIgoxKpabc2THMtnSJNBLIezc4C2&index=8
      */
    }
  }

  const handleClear = () => {
    if (files !== null) {
      setFiles([]);
    }
  }

  const styleTittle = {
    color: 'violet',
    fontSize: '2rem',
    marginTop: '20px',
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
        <DragnDrop setFiles={setFiles} />
        {files.map((file, index) => <RenderFile key={index} file={file} name={file.name} />)}

        <div />
        {files.length != 0 && (
          <div className='flex justify-center items-center w-full p-4 my-2'>
            <Button style={{ marginRight: '1rem', backgroundColor:'#E395FF'}} className='mx-2' onClick={handleUpload}>Upload</Button>
            <Button style={{backgroundColor:'#E395FF'}} className='mx-2' onClick={handleClear}>Clear</Button>
          </div>
        )}
      </div>
      <div style={styleBox}>
        <div style={styleTittle}>
          <h1 className='tittle-table'>VCF Files Uploaded</h1>
        </div>
        <MyTable />
      </div>
    </main>

  )
}
