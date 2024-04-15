import nlwIcon from '../assets/nlw-unite-icon.svg'

export function Header(){
    return(
        <div className='flex items-center gap-5 py-2 '>
            <img src={nlwIcon}/>
            <div className='flex items-center gap-5 text-sm font-medium'>
                <a className='text-zinc-300' href="">Eventos</a>
                <a href="">Participantes</a>
            </div>
        </div>
    )
}