import { ComponentProps } from "react";

interface TableRowProps extends ComponentProps<'tr'>{}

export function TableRow(props: TableRowProps){
    return(
        <tr {...props} className='py-3 px-4 border-b border-white/10 hover:bg-white/5 '></tr>
    )
}