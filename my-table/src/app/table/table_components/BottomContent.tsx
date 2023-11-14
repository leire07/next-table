import React from "react";
import "../mytable.css"; 
import {
  Pagination
} from "@nextui-org/react";/*import "react-datepicker/dist/react-datepicker.css";*/


/* The `interface BottomContentProps` defines the props that can be passed to the `BottomContent`
component. It specifies the types and structure of the props that the component expects to receive. */
interface BottomContentProps {
    filteredItems: any;
    selectedKeys: any; 
    setPage: (value: number) => void;
    page: number;
    pages: number;
  }


/**
 * The `BottomContent` component renders a section at the bottom of a page that displays information
 * about the selected items and includes a pagination component.
 * @param {BottomContentProps}  - - `selectedKeys`: A string representing the selected keys. It can be
 * either "all" or a number indicating the number of selected keys.
 * @returns The code is returning a JSX element that contains a div with the class name "py-2 px-2 flex
 * justify-between items-center". Inside the div, there is a span element that displays the number of
 * selected items out of the total number of filtered items. Below the span, there is a Pagination
 * component that allows the user to navigate between pages.
 */
export const BottomContent = ({selectedKeys, filteredItems, setPage, page, pages }: BottomContentProps) => {
    
    return(
        <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
         <Pagination
              isCompact
              showControls
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
      </div>
        );
}