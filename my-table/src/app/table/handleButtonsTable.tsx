import React from "react";
import {data} from "./data";

export const MyHandler = (id: number, option: number) => {
    function handleDetailedReport(id: number) {
    console.log("Entra en handleDetailedReport")
  }
  
    function handleDownloadDetailedReport(id: number) {
    // Handle download detailed report button click
    console.group("Entra en handleDownloadDetailedReport")
}

    function handleRegenerate(id: number) {
    // Handle view detailed report button click
    console.log("Entra en handleRegenerate")
  }

    function handleDelete(id: number) {
    // Handle view detailed report button click
    console.log("Entra en handleDelete")
}

    function handleAssembly(id: number) {
  // Handle view detailed report button click
  console.log("Entra en handleAssembly")
}

    if (option == 1){
    handleDetailedReport(id)
    } else if (option == 2){
    handleDownloadDetailedReport(id)
    } else if (option == 3){
    handleRegenerate(id)
    } else if (option == 4){
    handleDelete(id)
    } else if (option == 5){
        handleAssembly(id)
    }
}