import { type Product, db } from "."
import { config } from "dotenv"

config()

const PRICES = [
  9.99, 
  19.99, 
  29.99, 
  39.99, 
  49.99
] as const
const getRandomPrice = () =>
  PRICES[Math.floor(Math.random() * PRICES.length)]

const COLORS = [
  "white", 
  "beige", 
  "blue", 
  "green", 
  "purple"
] as const

const SIZES = [
  "S",
  "M",
  "L"
] as const

const seed = async () => {
  const products: Product[] = []

  // Filling 3 example products.
  new Array(3).fill(null).forEach((_, i) => 
    COLORS.forEach(color => 
      SIZES.forEach(size =>
        products.push({
          id: `${color}-${size}-${i + 1}`,
          imageId: `/${color}_${i + 1}.png`,
          color,
          name: `${
            color.slice(0, 1).toUpperCase() + color.slice(1)
          } shirt ${i}`,
          size,
          price: getRandomPrice(),
        }) 
      )
    )
  )

  const SIZE_MAP = {
    S: 0,
    M: 1,
    L: 2
  }

  const COLOR_MAP = {
    white: 0,
    beige: 1,
    blue: 2,
    green: 3,
    purple: 4
  }

  await db.upsert(
    products.map((product) => ({
      id: product.id,
      vector: [COLOR_MAP[product.color], SIZE_MAP[product.size], product.price],
      metadata: product,
    }))
  )
}

seed()