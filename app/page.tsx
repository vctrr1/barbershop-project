import { Button } from "./_components/ui/button"
import Image from "next/image"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import { quickSearchOption } from "./_constants/quickSearchOptions"
import BookingItem from "./_components/booking-item"
import DateItem from "./_components/date-item"
import SearchItem from "./_components/search-item"
import Header from "./_components/header"
import Link from "next/link"

export default async function Home() {
  const barbershop = await db.barbershop.findMany({})

  return (
    <div>
      <Header />
      {/* Conteudo Geral */}
      <div className="p-5">
        {/* Nome Usuario e dia */}
        <h2 className="text-xl font-bold">Ola, Victor!</h2>
        {/**componente de boas vintas e data */}
        <DateItem />
        {/* Input Pesquisa, esta dentro de uma div para o componente filho (botão) nao atrabalha o espaçamento do pai que é a pag principal */}
        <div className="mt-4">
          <SearchItem />
        </div>
        {/* Busca Rapida */}
        <div className="mt-5 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOption.map((option) => (
            <Button
              className="gap-2"
              variant="secondary"
              key={option.title}
              asChild
            >
              <Link href={`/barbershop?search=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  width={16}
                  height={16}
                  alt={option.title}
                />
                <p className="capitalize">{option.title}</p>
              </Link>
            </Button>
          ))}
        </div>

        {/* Banner */}
        <div className="relative mt-5 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
            alt="Agendar"
          />
        </div>

        {/* Agendamentos */}
        <BookingItem />

        {/* Barbearias */}
        <h4 className="mt-5 uppercase text-gray-400">Recomendados</h4>
        <div className="mt-2 flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {barbershop.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>{" "}
      {/* Fim conteudo geral */}
    </div>
  )
}
