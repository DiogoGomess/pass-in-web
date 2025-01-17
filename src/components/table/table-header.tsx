import { ComponentProps } from "react";

interface TableHeaderProps extends ComponentProps<'th'>{}

export function TableHeader(props: TableHeaderProps){
    return(
        <th className='font-semibold text-sm py-3 px-4 text-left' {...props}></th>
    )
}