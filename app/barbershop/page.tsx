import BarbershopItem from "../_components/barbershop-item"
import Header from "../_components/header"
import SearchItem from "../_components/search-item"
import { db } from "../_lib/prisma"

interface BarbeshopPageProps {
  searchParams: {
    search?: string
  }
}

const BarbershopsPage = async ({ searchParams }: BarbeshopPageProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams?.search,
        mode: "insensitive",
      },
    },
  })

  return (
    <div>
      <Header />
      <div className="my-6 px-5">
        <SearchItem />
      </div>
      <div className="px-5">
        <h1 className="mb-2 text-sm font-bold uppercase text-gray-400">
          Resultados para a busca &quot;{searchParams.search}&quot;
        </h1>
        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((item) => (
            <BarbershopItem barbershop={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarbershopsPage
