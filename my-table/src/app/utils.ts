import React from "react";
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const filterDate = (date: string) => {
  const dateStr = date; // Tu fecha en formato "DD-MM-YYYY"
  const [day, month, year] = dateStr.split("-");
  const isoDateStr = `${year}-${month}-${day}`; // Convertir a formato "YYYY-MM-DD"
  const date_filtered = new Date(isoDateStr); // Crear un objeto Date
  return date_filtered;
}