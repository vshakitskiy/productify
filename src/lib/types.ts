import type { Dispatch, SetStateAction } from "react"
import type { ProductState } from "./validators/product-validator"
import type { DebouncedFunc } from "lodash-es"
import type { QueryObserverResult } from "@tanstack/react-query"
import type { QueryResult } from "@upstash/vector"
import type { Product } from "@/db"

export type FilterState = [
  ProductState, 
  Dispatch<SetStateAction<ProductState>>
]

export type DebouncedProductSubmit = DebouncedFunc<
  () => Promise<QueryObserverResult<QueryResult<Product>[], Error>>
>

export type AxiosProduct = QueryResult<Product>[]