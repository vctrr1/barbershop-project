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
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"
import { Card, CardContent } from "./_components/ui/card"

export default async function Home() {
  const session = await getServerSession(authOptions)
  const barbershop = await db.barbershop.findMany({})
  const barbershopPopular = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  //se o usuario n estiver logado n faz a query para db e retorna uma lista vazia
  const confirmedBookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: (session?.user as any).id,
          date: {
            gte: new Date(),
          },
        },
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
        },
        orderBy: {
          date: "asc",
        },
      })
    : []

  return (
    <div>
      <Header />
      {/* Conteudo Geral */}
      <div className="p-5">
        {/* Nome Usuario e dia */}
        <h2 className="text-xl font-bold">
          Olá,{" "}
          {session?.user
            ? session.user.name?.split(" ").slice(0, 1)
            : "Bem indo"}
          !
        </h2>
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
              <Link href={`/barbershop?service=${option.title}`}>
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
        {session?.user && (
          <>
            <div className="mt-5">
              <h4 className="uppercase text-gray-400">Agendamentos</h4>
            </div>
            {confirmedBookings.length > 0 ? (
              <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                {confirmedBookings.map((booking) => (
                  <BookingItem booking={booking} key={booking.id} />
                ))}
              </div>
            ) : (
              <Card className="mt-2">
                <CardContent className="p-4">
                  <div className="flex justify-center">
                    <h2 className="text-gray-400">Sem agendamentos</h2>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Barbearias */}
        <h4 className="mt-5 uppercase text-gray-400">Recomendados</h4>
        <div className="mt-2 flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {barbershop.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        {/* Barbearias Populares*/}
        <h4 className="mt-5 uppercase text-gray-400">Recomendados</h4>
        <div className="mt-2 flex gap-4 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {barbershopPopular.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}
