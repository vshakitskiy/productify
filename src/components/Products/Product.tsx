import type { Product } from "@/db"

const Product = ({ product }: { product: Product }) => {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={product.imageId} 
          alt="Product Image" 
          className="h-full w-full object-cover object-center"  
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div className="">
          <h3 className="text-sm text-gray-700">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500">
            Size {product.size.toUpperCase()}, {product.color}
          </p>
        </div>
        <p className="text-sm font-medium text-gray-900">{product.price}</p>
      </div>
    </div>
  )
}

export default Product