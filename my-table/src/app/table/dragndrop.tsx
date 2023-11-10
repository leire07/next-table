import React, {  Dispatch, FunctionComponent, useCallback} from "react";
import {Button} from "@nextui-org/react";
import { useDropzone } from "react-dropzone";
import Image from 'next/image'
import folderImage from './images/purple_folder.png';
import {FaFileArrowUp} from 'react-icons//fa6';
import {IoAddCircleSharp} from 'react-icons/io5';

const DragnDrop:FunctionComponent<{setFile:Dispatch<any>}> = ({setFile}) => {

    const onDrop = useCallback(
        (acceptedFiles) => {
        setFile(acceptedFiles[0]);
        },[]);


  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
    'file/vcf': ['.vcf'],},
});

  return (
      <div {...getRootProps()} className="w-full h-80 dragndrop-container cursor-pointer focus:outline-none">
        <input {...getInputProps()} />
        <div className= {"dragndrop"}>
            <p>Upload VCF file</p>
            {
                isDragReject ? <p>Lo siento, esta aplicacioón no soporta este archivo.</p>:
                <div style={
                    {
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }
                
                }>
                    <FaFileArrowUp/>
                    <p className="dragndrop-text">Drag & Drop or click to select files</p>
                </div>
            }
            <div>
                <Button className="boton-rosa" isDisabled startContent={<IoAddCircleSharp size="1.5rem"/>}>
                    Upload
                </Button>
            </div>
        </div>
      </div>
  );
};

export default DragnDrop;