import React from "react";
import { Document, Page, View, Text, StyleSheet} from '@react-pdf/renderer';
import {data, columns, columns_select} from "./data"
import JSZip from 'jszip';
import { saveAs } from 'file-saver';


interface CrearPDFProps {
  id: number;
  option: number;
}

const style_pdf = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  row: {
    flexDirection: 'row',
    borderBottom: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
    padding: 2,
  },
  cell: {
    flex: 1,
    fontSize: 10,
  },
});

const getFileNameWithoutExtension = (filename: string) => {
  return filename.split('.')[0];
};

/* URL con toda la informcaión de los componentes: https://react-pdf.org/components#view */

export const CrearPDF = ({ id, option }: CrearPDFProps) => {
  const filteredData = data.filter(item => item.key === id);
  console.log("El documento es:" + Document)

  switch (option) {
    case 1:
      return (
        <Document>
      <Page size="A4" style={style_pdf.page}>
        {/* Mapeo de datos fuera del bloque View */}
        {filteredData.map((item) => (
          <View key={item.key} style={style_pdf.section}>
            <Text>Paciente: {getFileNameWithoutExtension(item.name)}</Text>
            <Text style={style_pdf.cell}>
              <Text style={style_pdf.row}>
              Nombre: {" "}
            </Text>
            <Text style={style_pdf.row}>
              {item.name}
            </Text>
            </Text>
            <Text style={style_pdf.cell}>
              <Text style={style_pdf.row}>
              Fecha de creación: {" "}
            </Text>
            <Text style={style_pdf.row}>
              {item.creation_date}
            </Text>
            </Text>
            <Text style={style_pdf.cell}>
              <Text style={style_pdf.row}>
              Fecha de actualización: {" "}
            </Text>
            <Text style={style_pdf.row}>
              {item.last_update_date}
            </Text>
            </Text>
            {/* Agrega más contenido según sea necesario */}
          </View>
        ))}
        {/* Fin del mapeo de datos */}
      </Page>
    </Document>
  )
  case 2:
    return(
      <Document>
      <Page size="A4" style={style_pdf.page}>
        {/* Mapeo de datos fuera del bloque View */}
        {filteredData.map((item) => (
          <View key={item.key} style={style_pdf.section}>
            <Text>Paciente: {getFileNameWithoutExtension(item.name)}</Text>
            <Text style={style_pdf.cell}>
              <Text style={style_pdf.row}>
              Nombre: {" "}
            </Text>
            <Text style={style_pdf.row}>
              {item.name}
            </Text>
            </Text>
            <Text style={style_pdf.cell}>
              <Text style={style_pdf.row}>
              Fecha de creación: {" "}
            </Text>
            <Text style={style_pdf.row}>
              {item.creation_date}
            </Text>
            </Text>
            <Text style={style_pdf.cell}>
              <Text style={style_pdf.row}>
              Fecha de actualización: {" "}
            </Text>
            <Text style={style_pdf.row}>
              {item.last_update_date}
            </Text>
            </Text>
            {/* Agrega más contenido según sea necesario */}
          </View>
        ))}
        {/* Fin del mapeo de datos */}
      </Page>
    </Document>
    )
  }
}

