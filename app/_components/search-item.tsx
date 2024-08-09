"use client"

import { SearchIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"

//Usando react hook form

const formSchema = z.object({
  search: z.string().trim().min(1, {
    message: "Digite algo para buscar!",
  }),
})

const SearchItem = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  })

  const router = useRouter()

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    router.push(`/barbershop?search=${data.search}`)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex w-full gap-2"
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Pesquise barbearias aqui!"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          <SearchIcon />
        </Button>
      </form>
    </Form>
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
