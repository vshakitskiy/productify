import { ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { DebouncedProductSubmit, FilterState } from "@/lib/types"

type DropdownFilterProps = {
  filterState: FilterState,
  debouncedSubmit: DebouncedProductSubmit
}

const DropdownFilter = ({ filterState, debouncedSubmit }: DropdownFilterProps) => {
  const [filter, setFilter] = filterState

  const SORT_OPTIONS = [
    { name: "None", value: "none" },
    { name: "Price: Low to High", value: "price-asc" },
    { name: "Price: High to Low", value: "price-desc" }
  ] as const

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">  
        Sort
        <ChevronDown className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {SORT_OPTIONS.map((option) => (
          <button 
            key={option.name}
            className={cn("text-left w-full block px-4 py-2 text-sm", {
              "text-gray-900 bg-gray-100": option.value === filter.sort,
              "text-gray-500": option.value !== filter.sort
            })}
            onClick={() => {
              setFilter((prev) => ({
                ...prev,
                sort: option.value
              }))
              debouncedSubmit()
            }}
          >
            {option.name}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownFilter