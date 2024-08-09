"use client"

import { SearchIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation"

const SearchItem = () => {
  const [search, setSearch] = useState("")
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(`/barbershop?search=${search}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <Input
        placeholder="Pesquise Aqui."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button type="submit">
        <SearchIcon />
      </Button>
    </form>
  )
}

export default SearchItem

// Jeito simples de fazer, mas o componente é renderizado a cada letra digitada, isso é aceitavel em pequenos formularios como esse de pesquisa
//const SearchItem = () => {
//
//    const [search, setSearch] = useState("")
//    const router = useRouter()
//
//    const handleSubmit = (e) => {
//        e.preventDefault()
//        router.push(`/barbershop?search=${search}`)
//    }
//
//    return (
//        <form onSubmit={handleSubmit} className="flex items-center gap-2">
//            <Input placeholder="Pesquise Aqui."
//                value={search}
//                onChange={(e) => setSearch(e.target.value)}
//            />
//            <Button type="submit">
//              <SearchIcon />
//            </Button>
//        </form>
//    );
//}
//
//export default SearchItem;
