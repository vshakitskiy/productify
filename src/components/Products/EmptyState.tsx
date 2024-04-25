import { XCircle } from "lucide-react"

const EmptyState = () => {
  return (
    <div className="relative col-span-full h-80 bg-gray-50 dark:bg-gray-800 w-full p-12 flex flex-col items-center justify-center">
      <XCircle className="h-8 w-8 text-red-500" />
      <h3 className="font-semibold text-xl mt-2">No products found</h3>
      <p className="text-zinc-500 dark:text-zinc-300 text-sm">
        We found no search results for there filters.
      </p>
    </div>
  )
}

export default EmptyState