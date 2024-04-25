"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PropsWithChildren } from "react"
import type { ThemeProviderProps } from "next-themes/dist/types"


const client = new QueryClient()

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => 
  <NextThemesProvider {...props}>
    {children}
  </NextThemesProvider>


const Providers = ({ children }: PropsWithChildren<{}>) =>
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  </ThemeProvider>


export default Providers