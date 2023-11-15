import React, {  Dispatch, FunctionComponent, useCallback} from "react";
import {Button} from "@nextui-org/react";
import { useDropzone } from "react-dropzone";
import {FaFileArrowUp} from 'react-icons//fa6';
import {IoAddCircleSharp} from 'react-icons/io5';

/* The code defines a functional component called `DragnDrop` that takes a prop `setFiles` of type
`Dispatch<any>`. */
const DragnDrop:FunctionComponent<{setFiles:Dispatch<any>}> = ({setFiles}) => {

    const onDrop = useCallback(
    (acceptedFiles) => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
    },[setFiles]);


  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
    'file/vcf': ['.vcf'],},
});

  /* The `return` statement in the code is returning the JSX (JavaScript XML) code that represents the
  structure and content of the component's UI. */
  return (
      <div {...getRootProps()} className="w-full h-80 dragndrop-container cursor-pointer focus:outline-none">
        <input {...getInputProps()} />
        <div className= {"dragndrop"}>
            <p>Upload VCF file</p>
            {
                isDragReject ? <p>Sorry, this application does not support this file.</p>:
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
                <Button className="pink-button" isDisabled startContent={<IoAddCircleSharp size="1.5rem"/>}>
                    Upload
                </Button>
            </div>
        </div>
      </div>
  );
};

export default DragnDrop;