"use client"

import Product from "@/components/Products/Product"
import ProductSkeleton from "@/components/Products/ProductSkeleton"
import { ProductState } from "@/lib/validators/product-validator"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Filter as FilterIcon } from "lucide-react"
import { useCallback, useState } from "react"
import EmptyState from "@/components/Products/EmptyState"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Filter from "@/components/Filters/Filter"
import { debounce } from "lodash-es"
import DropdownFilter from "@/components/Filters/DropdownFilter"
import { AxiosProduct } from "@/lib/types"
import useIsMobile from "@/lib/hooks/useIsMobile"
import Theme from "@/components/Theme"

const Home = () => {
  const [sheet, setSheet] = useState(false)
  const isMobile = useIsMobile(1024)

  const [filter, setFilter] = useState<ProductState>({
    sort: "none",
    color: ["white", "beige", "blue", "green", "purple"],
    price: {
      isCustom: false,
      range: [0, 100] as [number, number]
    },
    size: ["L", "M", "S"]
  })

  const { data: products, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axios.post<AxiosProduct>(
        `${process.env.NEXT_PUBLIC_URL}/api/products`, {
          filter: {
            sort: filter.sort,
            color: filter.color,
            price: filter.price.range,
            size: filter.size
          }
        }
      )
      return data
    }
  })

  const debouncedSubmit = debounce(() => refetch(), 500)
  const _debouncedSubmit = useCallback(debouncedSubmit, [])

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-6 pt-24">
        <h1 className="text-4xl font-bold pr-3 tracking-tight text-gray-900 dark:text-gray-100">
          Productify
        </h1>
        <div className="flex items-center">
          <Theme />
          <DropdownFilter 
            filterState={[filter, setFilter]}
            debouncedSubmit={_debouncedSubmit}
          />
          <Sheet open={sheet && isMobile} onOpenChange={setSheet}>
            <SheetTrigger asChild>
              <button className="-m-2 ml-3 p-2 text-gray-400 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-300 lg:hidden">
                <FilterIcon className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="py-10 overflow-y-auto">
              <Filter 
                filterState={[filter, setFilter]}
                debouncedSubmit={_debouncedSubmit}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <section className="pb-24 pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          <div className="hidden lg:block">
            <Filter
              filterState={[filter, setFilter]}
              debouncedSubmit={_debouncedSubmit}
            />
          </div>

          <ul className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products && products.length === 0 ? <EmptyState /> : products
              ? products.map(({ metadata }) => (
                <Product
                  key={`${metadata!.name} ${metadata!.color} ${metadata!.size}`} 
                  product={metadata!} 
                />
              )) : new Array(12).fill(null).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default Home