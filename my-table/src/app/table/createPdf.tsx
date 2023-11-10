import React from 'react';
import { Page, Text, View, Document, StyleSheet, pdf } from '@react-pdf/renderer';
import {data} from "./data"
import JSZip from 'jszip';
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';
import { CrearPDF } from './renderPdf';

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


// Crea el documento
const getPdf = async (listaPdfs: number[]) => {
  console.log(listaPdfs)
  const pdfs = [];
  const names = [];
  for(let i = 0; i < listaPdfs.length ; i++) {
  const id = listaPdfs[i];
  console.log("el contenido es " + id)
  const filteredData = data.filter(item => item.key === id);
  console.log(`Processing file ${i + 1}: ${filteredData.map((item) => item.name)}`);
  // Si requiresUserValidation es false, pasa al siguiente id
  if (filteredData[0].requires_user_validation) {
    continue;
  }
  const MyDocument = () =>{
    return pdf(
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
        };
    const blob = await MyDocument().toBlob();
    pdfs.push(blob);
    names.push(filteredData[0].name);
            }
  return {pdfs, names};
}

interface CrearPDFProps {
  pdfs: Array<Blob>;
  names: Array<string>;
}

const ListPdf = async({ pdfs, names}: CrearPDFProps) => {

  const handleDownloadZip = async () => {

    const zip = new JSZip();

    pdfs.forEach((pdf: Blob, index) => {
      zip.file(`${names[index]}.pdf`, pdf);
    });

    const content = await zip.generateAsync({ type: 'blob' });

    const currentDate = new Date().toLocaleDateString('es-ES');

    saveAs(content, currentDate + '.zip');
  }

  return(handleDownloadZip);

}

export const HandleZip = async (listaIds: number[]) => {
  // Convertir los identificadores en PDFs
  const {pdfs, names} = await getPdf(listaIds);

  // Esperar a que todos los PDFs se hayan generado
  const allPdfsGenerated = pdfs.every(pdf => pdf !== null && pdf !== undefined);

  if (allPdfsGenerated) {
    // Pasar los PDFs a ListPdf
    const handleDownloadZip = await ListPdf({ pdfs, names });

    // Descargar el ZIP
    await handleDownloadZip();
  } else {
    console.error('Not all PDFs were generated');
  }
};

export default HandleZip;