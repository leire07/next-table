'use client'
import MyTable from './mytable'
// 1. import `NextUIProvider` component
import {Button} from '@nextui-org/button'


export default function Home() {
  const styleTittle = {
    color: 'violet',
    fontSize: '2rem',  // Tamaño grande
    marginTop: '20px',  // Margen en la parte superior
  };

  const styleBox = {
    margin: "1rem",
  }

  return (  
    <main className="py-24">
      <div style={styleBox}>
        Otro contenido
      </div>
      <div style={styleBox}>
        <div style={styleTittle}>
        <h1>VCF Files Uploaded</h1>
        </div>
        <MyTable/>
      </div>
    </main>
    
  )
}
