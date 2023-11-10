import { FunctionComponent, useState } from "react";
import Image from 'next/image'
import {ImProfile} from 'react-icons/im';

const RenderFile:FunctionComponent<{
    file: File | null,
    name: string | null
}> = ({file, name}) => {
    const [imageLoaded, setImageLoaded] = useState(false);

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