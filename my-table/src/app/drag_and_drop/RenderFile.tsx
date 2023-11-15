import { FunctionComponent} from "react";
import {ImProfile} from 'react-icons/im';

/* Show the icon with the name of the file when drag and drop is loaded */
const RenderFile:FunctionComponent<{
    file: File | null,
    name: string | null
}> = ({file, name}) => {

    if (!file) {
        return null;
    }
    return (
        <div className="flex justify-center items-center w-full p-4 my-2">
            <ImProfile className="mx-2"/>
            <span className="mx-2">{name}</span>
        </div>
    )
}

export default RenderFile;