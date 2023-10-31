import React from "react";
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

//Funciones de los botones de la tabla, busca por ID

export function handleDetailedReport(row:any) {
    console.log("Entra en handleDetailedReport")
  }
  
export function handleDownloadDetailedReport(row:any) {
    // Handle download detailed report button click
    console.group("Entra en handleDownloadDetailedReport")
}

export function handleRegenerate(row:any) {
    // Handle view detailed report button click
    console.log("Entra en handleRegenerate")
  }

export function handleDelete(row:any) {
    // Handle view detailed report button click
    console.log("Entra en handleDelete")
}

export function handleAssembly(row:any) {
  // Handle view detailed report button click
  console.log("Entra en handleAssembly")
}