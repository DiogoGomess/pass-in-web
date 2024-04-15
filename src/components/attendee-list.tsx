import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from 'lucide-react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt'
import { Table } from './table/table'
import { TableHeader } from './table/table-header'
import { TableData } from './table/table-data'
import { TableRow } from './table/table-row'
import { IconButton } from './icon-button'
import { ChangeEvent, useEffect, useState } from 'react'

dayjs.extend(relativeTime)
dayjs.locale('pt')

interface Attendee {
    id: string
    name: string,
    email: string,
    createdAt: string,
    checkedInAt: string | null
}
export function AttendeeList() {
    const [search, setSearch] = useState(() => {
        const url = new URL(window.location.toString())

        if (url.searchParams.has('search')) {
            return url.searchParams.get('search') ?? ''
        }
        return ''
    })
    const [page, setPage] = useState(() => {
        const url = new URL(window.location.toString())

        if (url.searchParams.has('page')) {
            return Number(url.searchParams.get('page'))
        }
        return 1
    })
    const [attendees, setAttendees] = useState<Attendee[]>([])

    const [total, setTotal] = useState(0)
    const totalPages = total > 0 ? Math.ceil(total / 10) : 1;

    useEffect(() => {
        const url = new URL("https://pass-in-backend-cbnn.onrender.com/events/93a60ea9-7ea3-49d1-b17d-cbedb9740fff/attendees")

        url.searchParams.set('pageIndex', String(page - 1))

        if (search.length > 0) {
            url.searchParams.set('query', search)
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setAttendees(data.attendees);
                setTotal(data.total);
            })
    }, [page, search])

    function setCurrentPage(page: number) {
        const url = new URL(window.location.toString());

        url.searchParams.set('page', String(page))
        window.history.pushState({}, "", url)

        setPage(page)
    }

    function setCurrentSearch(search: string) {
        const url = new URL(window.location.toString());

        url.searchParams.set('search', search)
        window.history.pushState({}, "", url)

        setSearch(search)
    }

    function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
        setCurrentSearch(event.target.value)
        setCurrentPage(1)
    }

    function goToFirstPage() {
        setCurrentPage(1)
    }
    function goToPreviousPage() {
        setCurrentPage(page - 1)
    }
    function goToNextPage() {
        setCurrentPage(page + 1)
    }
    function goToLastPage() {
        setCurrentPage(totalPages)
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex gap-3">
                <p className="font-bold text-2xl text-zinc-200">Participantes</p>
                <div className="flex items-center gap-3 border border-white/10 rounded-lg px-3 py-1.5 w-72">
                    <Search className='size-4 text-emerald-300' />
                    <input onChange={onSearchInputChanged}
                        value={search}
                        type="text" placeholder="Buscar participante..."
                        className="bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm focus:ring-0"
                    />
                </div>
            </div>
            <Table>
                <thead>
                    <tr className='border-b border-white/10'>
                        <TableHeader>
                            <input type="checkbox" className='bg-black/20 size-4 rounded border-white/10' />
                        </TableHeader>
                        <TableHeader>Código</TableHeader>
                        <TableHeader>Participante</TableHeader>
                        <TableHeader>Data de inscrição</TableHeader>
                        <TableHeader>Data do check-in </TableHeader>
                        <TableHeader style={{ width: 64 }}></TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {attendees.map((attendee) => {
                        return (
                            <TableRow key={attendee.id}>
                                <TableData>
                                    <input type="checkbox" className='bg-black/20 size-4 rounded border-white/10' />
                                </TableData>
                                <TableData>{attendee.id}</TableData>
                                <TableData>
                                    <div className='flex flex-col'>
                                        <span className='font-semibold text-zinc-50'>{attendee.name}</span>
                                        <p>{attendee.email}</p>
                                    </div>
                                </TableData>
                                <TableData>{dayjs().to(attendee.createdAt)}</TableData>
                                <TableData>
                                    {attendee.checkedInAt === null
                                        ? <span className='text-zinc-400'>Não fez check in</span>
                                        : dayjs().to(attendee.checkedInAt)}
                                </TableData>
                                <TableData>
                                    <IconButton transparent={true} className='bg-black/20 p-1.5 border border-white/10 rounded-md'>
                                        <MoreHorizontal className='size-4' />
                                    </IconButton>
                                </TableData>
                            </TableRow>
                        )
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <TableData colSpan={3}>Mostrando {attendees.length} de {total} itens</TableData>
                        <TableData colSpan={3} className='text-right'>
                            <div className='inline-flex items-center gap-8'>
                                <span>Página {page} de {totalPages}</span>
                                <div className='inline-flex gap-1.5'>
                                    <IconButton onClick={goToFirstPage} disabled={page === 1}>
                                        <ChevronsLeft className='size-4' />
                                    </IconButton>
                                    <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                                        <ChevronLeft className='size-4' />
                                    </IconButton>
                                    <IconButton onClick={goToNextPage} disabled={page === totalPages}>
                                        <ChevronRight className='size-4' />
                                    </IconButton>
                                    <IconButton onClick={goToLastPage} disabled={page === totalPages} >
                                        <ChevronsRight className='size-4' />
                                    </IconButton>
                                </div>
                            </div>
                        </TableData>
                    </tr>
                </tfoot>
            </Table>
        </div>
    )
}