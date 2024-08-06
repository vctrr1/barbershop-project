import { SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import { quickSearchOption } from "./_constants/quickSearchOptions"
import BookingItem from "./_components/booking-item"

export default async function Home() {
  const barbershop = await db.barbershop.findMany({})

  return (
    <div>
      <Header />
      {/* Conteudo Geral */}
      <div className="p-5">
        {/* Nome Usuario e dia */}
        <h2 className="text-xl font-bold">Ola, Victor!</h2>
        <p>Segunda Feira, 05 Agosto.</p>

        {/* Input Pesquisa */}
        <div className="mt-4 flex items-center gap-2">
          <Input placeholder="Pesquise Aqui." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        {/* Busca Rapida */}
        <div className="mt-5 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOption.map((option) => (
            <Button className="gap-2" variant="secondary" key={option.title}>
              <Image
                src={option.imageUrl}
                width={16}
                height={16}
                alt={option.title}
              />
              {option.title}
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
      {/* footer */}
      <footer>
        <Card>
          <CardContent className="px-5 py-6 text-center">
            <p className="text-[10px] text-gray-400">
              © 2023 Copyright <span className="font-bold">VCTRR</span>
            </p>
          </CardContent>
        </Card>
      </footer>
    </div>
  )
}
