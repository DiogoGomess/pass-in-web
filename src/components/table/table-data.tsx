import { ComponentProps } from "react";
import { twMerge } from 'tailwind-merge';
interface TableDataProps extends ComponentProps<'td'>{}

export function TableData(props: TableDataProps){
    return(
        <td {...props} className={twMerge('text-sm text-zinc-300 py-3 px-4', props.className)}></td>
    )
}