import BarbershopItem from "../_components/barbershop-item"
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
    <div className="mb-3 mt-6 p-5 text-sm font-bold uppercase text-gray-400">
      <h1 className="pb-2">
        Resultados para a busca &quot;{searchParams.search}&quot;
      </h1>
      <div className="grid grid-cols-2 gap-4">
        {barbershops.map((item) => (
          <BarbershopItem barbershop={item} key={item.id} />
        ))}
      </div>
    </div>
  )
}

export default BarbershopsPage
