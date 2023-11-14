import React from 'react';
import { Page, Text, View, Document, StyleSheet, pdf } from '@react-pdf/renderer';
import {data} from "../table/data"
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

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

// Obtiene el nombre del archivo sin la extensión
/**
 * The function `getFileNameWithoutExtension` takes a filename as input and returns the filename
 * without its extension.
 * @param {string} filename - The `filename` parameter is a string that represents the name of a file,
 * including its extension.
 * @returns The function `getFileNameWithoutExtension` returns the filename without the extension.
 */
const getFileNameWithoutExtension = (filename: string) => {
  return filename.split('.')[0];
};

// Crea el documento
/**
 * The function `getPdf` takes an array of PDF IDs, filters the data based on those IDs, and generates
 * PDF documents for each filtered data item.
 * @param {number[]} listaPdfs - An array of numbers representing the IDs of the PDFs to be processed.
 */
async function getPdf(listaPdfs: number[]) {
  console.log(listaPdfs)
  const pdfs = [];
  const names = [];
  for(let i = 0; i < listaPdfs.length ; i++) {
  const id = listaPdfs[i];
  console.log("el contenido es " + id)
  const filteredData = data.filter(item => item.key === id);
  console.log(`Processing file ${i + 1}: ${filteredData.map((item) => item.name)}`);
  // Si requiresUserValidation es false, pasa al siguiente id
  if (filteredData[0].requires_user_validation || filteredData[0].is_regenerating) {
    continue;
  }
  const MyDocument = () =>{
    console.log("entra en my document")
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

/**
 * The function creates and downloads a zip file containing multiple PDFs with corresponding names.
 * @param {Blob[]} pdfs - An array of Blob objects representing the PDF files to be included in the zip
 * file.
 * @param {string[]} names - An array of strings representing the names of the PDF files. Each name
 * corresponds to a PDF in the `pdfs` array.
 */
async function createAndDownloadZip(pdfs: Blob[], names: string[]) {
  const zip = new JSZip();

  pdfs.forEach((pdf, index) => {
    zip.file(`${names[index]}.pdf`, pdf);
  });

  const content = await zip.generateAsync({ type: 'blob' });
  const currentDate = new Date().toLocaleDateString('es-ES');

  saveAs(content, `${currentDate}.zip`);
}

/**
 * The HandleZip function takes in a list of IDs, retrieves corresponding PDFs and names, and creates
 * and downloads a zip file containing the PDFs if all PDFs were successfully generated.
 * @param {number[]} listaIds - An array of numbers representing the IDs of the PDFs to be generated
 * and included in the zip file.
 */
export const HandleZip = async (listaIds: number[]) => {
  const { pdfs, names } = await getPdf(listaIds);

  if (pdfs.every(pdf => pdf !== null && pdf !== undefined)) {
    await createAndDownloadZip(pdfs, names);
  } else {
    console.error('Not all PDFs were generated');
  }
};

export default HandleZip;