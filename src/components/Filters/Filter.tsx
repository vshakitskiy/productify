import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { Slider } from "../ui/slider"
import { cn } from "@/lib/utils"
import type { DebouncedProductSubmit, FilterState } from "@/lib/types"

type FiltersProps = {
  filterState: FilterState,
  debouncedSubmit: DebouncedProductSubmit
}

const Filter = ({ filterState, debouncedSubmit }: FiltersProps) => {
  const [ filter, setFilter ] = filterState
  
  const COLOR_FILTERS = {
    id: "color",
    name: "Color",
    options: [
      { label: "White", value: "white" },
      { label: "Beige", value: "beige" },
      { label: "Blue", value: "blue" },
      { label: "Green", value: "green" },
      { label: "Purple", value: "purple" },
    ]
  } as const
  
  const SIZE_FILTERS = {
    id: "size",
    name: "Size",
    options: [
      { label: "S", value: "S" },
      { label: "M", value: "M" },
      { label: "L", value: "L" },
    ]
  } as const
  
  const PRICE_FILTERS = {
    is: "price",
    name: "Price",
    options: [
      { label: "Any price", value: [0, 100] },
      { label: "Under 20$", value: [0, 20] },
      { label: "Under 40$", value: [0, 40] }
    ]
  } as const
  
  const SUBCATEGORIES = [
    { name: "T-Shirts", selected: true, href: "#" },
    { name: "Hoodies", selected: false, href: "#" },
    { name: "Sweatshirts", selected: false, href: "#" },
    { name: "Accessoried", selected: false, href: "#" },
  ] as const
  
  const DEFAULT_CUSTOM_PRICE = [0, 100] as [number, number]

  const minPrice = Math.min(filter.price.range[0], filter.price.range[1])
  const maxPrice = Math.max(filter.price.range[0], filter.price.range[1])

  const applyArrayFilter = ({
    category, value
  }: {
    category: keyof Omit<typeof filter, "price" | "sort">,
    value: string
  }) => {
    const isFilterApplied = filter[category].includes(value as never)
    if (isFilterApplied) {
      setFilter(prev => ({
        ...prev,
        [category]: prev[category].filter(v => v !== value)
      }))
    } else {
      setFilter(prev => ({
        ...prev,
        [category]: [...prev[category], value]
      }))
    }

    debouncedSubmit()
  }

  return (
    <>
      <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm-sm font-medium text-gray-900">
        {SUBCATEGORIES.map((category) => (
          <li key={category.name}>
            <button 
              className="disabled:cursor-not-allowed disabled:opacity-60"
              disabled={!category.selected}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
      <Accordion type="multiple" className="animate-none">
        <AccordionItem value="color">
          <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
            <span className="font-medium text-gray-900">Color</span>
          </AccordionTrigger>
          <AccordionContent className="pt-6 animate-none">
            <ul className="space-y-4">
              {COLOR_FILTERS.options.map((option, i) => (
                <li 
                  key={option.value}
                  className="flex items-center"  
                >
                  <input 
                    type="checkbox"
                    onChange={() => {
                      applyArrayFilter({
                        category: "color",
                        value: option.value
                      })
                    }}
                    checked={filter.color.includes(option.value)}
                    id={`color-${i}`} 
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"  
                  />
                  <label htmlFor={`color-${i}`} className="ml-3 text-sm text-gray-600">
                    {option.label}
                  </label>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
              
        <AccordionItem value="size">
          <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
            <span className="font-medium text-gray-900">Size</span>
          </AccordionTrigger>
          <AccordionContent className="pt-6 animate-none">
            <ul className="space-y-4">
              {SIZE_FILTERS.options.map((option, i) => (
                <li 
                  key={option.value}
                  className="flex items-center"  
                >
                  <input 
                    type="checkbox"
                    onChange={() => {
                      applyArrayFilter({
                        category: "size",
                        value: option.value
                      })
                    }}
                    checked={filter.size.includes(option.value)}
                    id={`size-${i}`} 
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"  
                  />
                  <label htmlFor={`size-${i}`} className="ml-3 text-sm text-gray-600">
                    {option.label}
                  </label>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="py-3 text-sm text-gray-400 hover:text-gray-500">
            <span className="font-medium text-gray-900">Price</span>
          </AccordionTrigger>
          <AccordionContent className="pt-6 animate-none">
            <ul className="space-y-4">
              {PRICE_FILTERS.options.map((option, i) => (
                <li 
                  key={option.label}
                  className="flex items-center"  
                >
                  <input 
                    type="radio"
                    onChange={() => {
                      setFilter((prev) => ({
                        ...prev,
                        price: {
                          isCustom: false,
                          range: [...option.value]
                        }
                      }))
                      debouncedSubmit()
                    }}
                    checked={
                      !filter.price.isCustom &&
                            filter.price.range[0] === option.value[0] && 
                            filter.price.range[1] === option.value[1]
                    }
                    id={`price-${i}`} 
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"  
                  />
                  <label htmlFor={`price-${i}`} className="ml-3 text-sm text-gray-600">
                    {option.label}
                  </label>
                </li>
              ))}
              <li className="flex justify-center flex-col gap-2">
                <div className="flex items-center">
                  <input 
                    type="radio"
                    onChange={() => {
                      setFilter((prev) => ({
                        ...prev,
                        price: {
                          isCustom: true,
                          range: [0, 100]
                        }
                      }))
                      debouncedSubmit()
                    }}
                    checked={filter.price.isCustom}
                    id={`price-${PRICE_FILTERS.options.length}`} 
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"  
                  />
                  <label htmlFor={`price-${PRICE_FILTERS.options.length}`} className="ml-3 text-sm text-gray-600">
                          Custom
                  </label>
                </div>
                <div className="flex justify-between">
                  <p className="font-medium">Price</p>
                  <div>
                    {filter.price.isCustom 
                      ? minPrice.toFixed(0) 
                      : filter.price.range[0].toFixed(0)
                    } $ -{" "}
                    {filter.price.isCustom
                      ? maxPrice.toFixed(0)
                      : filter.price.range[1].toFixed(0)
                    } $
                  </div>
                </div>

                <Slider
                  className={cn({
                    "opacity-50": !filter.price.isCustom
                  })}
                  disabled={!filter.price.isCustom}
                  onValueChange={range => {
                    const [newMin, newMax] = range

                    setFilter((prev) => ({
                      ...prev,
                      price: {
                        isCustom: true,
                        range: [newMin, newMax]
                      }
                    }))
                    debouncedSubmit()
                  }}
                  value={filter.price.isCustom 
                    ? filter.price.range 
                    : DEFAULT_CUSTOM_PRICE
                  }
                  min={DEFAULT_CUSTOM_PRICE[0]}
                  max={DEFAULT_CUSTOM_PRICE[1]}
                  defaultValue={DEFAULT_CUSTOM_PRICE}
                  step={5}
                />
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}

export default Filter