import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface IconButtonProps extends ComponentProps<'button'> {
    transparent?:boolean
}

export function IconButton({transparent, ...props}: IconButtonProps) {
    return (
        <button {...props} className={twMerge('bg-white/10 p-1.5 border border-white/10 rounded-md', transparent ? 'bg-black/20' :  null,
          props.disabled ? 'opacity-50': null)} />
    )
}