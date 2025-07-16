'use client'
import * as React from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  ColumnFiltersState,
} from '@tanstack/react-table'
import { PokemonDetails, PokemonModalDetails, PokemonTableProps } from '@/types/pokemon'
import { useRouter } from 'next/router'
import PokemonModal from './PokemonModal'
import { getPokemonByName } from '@/services/pokemonAPI'

const columnHelper = createColumnHelper<PokemonDetails>()


const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => info.getValue(),
    footer: info => info.column.id,
    filterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId);
      if (typeof value === 'string' && typeof filterValue === 'string') {
        return value.toLowerCase().includes(filterValue.toLowerCase());
      }
      return false;
    },
    enableColumnFilter: true,
  }),
  columnHelper.accessor('url', {
    header: 'Details URL',
    cell: info => (<a href={info.getValue()}  rel="noopener noreferrer" className='text-[var(--primary-url)] cursor-pointer'>
      View
  </a>),
    footer: info => info.column.id,
  }),
]



const PokemonTable: React.FC<PokemonTableProps> = ({  pokemons, count, page  }) => {
  const router = useRouter();
  const pageSize = 20;
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const data = React.useMemo(() => pokemons, [pokemons]);
  const [selectedPokemon, setSelectedPokemon] = React.useState({} as PokemonModalDetails)
  const [isOpen, setIsOpen] = React.useState(false)
  let selectedPokemonObj: PokemonModalDetails = {
    baseExperience: '',
    weight: '',
    height: '',
    order: '',
    name: ''
  }
  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnFilters
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true
  })

  const pageCount = Math.ceil((count ?? 0) / pageSize);
  const goToPage = (newPage: number) => {
    router.push({
      pathname: "/",
      query: { page: newPage },
    });
  };

  const handleRowClick = async (name: string) =>{
    if(data?.length === 0){
      setIsOpen(true)
      data.forEach((element: any) => {
        selectedPokemonObj = {
          weight: element.weight,
          height: element.height,
          name:element.name,
          order: element.order,
          baseExperience: element.base_experience
        }
      });
      setSelectedPokemon(selectedPokemonObj)
    }
    else{
      const response = await getPokemonByName(name)
      if(response){
        setIsOpen(true)
        selectedPokemonObj = {
          name:response.name,
          weight: response.weight,
          height: response.height,
          order: response.order,
          baseExperience: response.base_experience,
          
        }
        setSelectedPokemon(selectedPokemonObj)
      }
    }
    
  }
    return (
      <div className="p-2 w-full">
        <form method="GET" className="mb-4 w-full">
          <input
            name="name"
            placeholder="Search by exact name (e.g., pikachu)"
            className="border px-3 py-2 mr-2 rounded w-1/2 bg-white"
          />
          <button
            type="submit"
            className="bg-[var(--primary-button)] text-white px-4 py-2 rounded cursor-pointer"
          >
            Search
          </button>
        </form>
        <h1 className='text-center text-xl text-white p-2 font-bold'>List of Pokémons</h1>
      <table className='w-full bg-[var(--primary-table-background)]  border-[var(--primary-text-border)] '>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className='text-[var(--primary-headings)] p-4 bg-[var(--primary-table-header-bg)]'>
              {headerGroup.headers.map(header => (
                <th key={header.id} className='p-4 border-1 border-[var(--primary-text-border)]'>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className='text-center text-[var(--primary-headings)] cursor-pointer hover:bg-[var(--primary-active-state-hover)] '
            onClick={() => handleRowClick(row.original.name)}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className='p-1 border-1 border-[var(--primary-text-border)]'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
     
      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          disabled={!page || page <= 1}
          onClick={() => page && goToPage(page - 1)}
          className="px-3 py-1  rounded disabled:cursor-not-allowed disabled:opacity-80 cursor-pointer bg-[var(--primary-button)] text-white"
        >
          Prev
        </button>

        <span>
          Page {page} of {pageCount}
        </span>

        <button
          disabled={!page || page >= pageCount}
          onClick={() => page && goToPage(page + 1)}
          className="px-3 py-1  rounded disabled:cursor-not-allowed disabled:opacity-80 cursor-pointer bg-[var(--primary-button)] text-white"
        >
          Next
        </button>
      </div>
      {isOpen && <PokemonModal onClose={() => setIsOpen(false)}><div className='flex flex-col'>
        <h1 className='font-bold p-4 text-center text-lg text-[var(--primary-headings)]'>Selected Pokémon Details</h1>
        {Object.entries(selectedPokemon).map(([key, value,], index) => (
          <><div className='flex flex-row' key={index}><label className='font-semibold text-xl p-1 text-[var(--primary-active-state)]'>{key.toUpperCase()} :</label><span className='font-light text-xl p-1'>{value}</span></div></>
        ))}</div></PokemonModal>}
    </div>
    )
}

export default PokemonTable;



