import { SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { Badge } from "./_components/ui/badge"
import { Card, CardContent } from "./_components/ui/card"
import { Avatar } from "./_components/ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"

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
          <Button className="gap-2" variant="secondary">
            <Image src="./cabelo.svg" width={16} height={16} alt={"cabelo"} />
            Cabelo
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image src="./barba.svg" width={16} height={16} alt={"barba"} />
            Barba
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image
              src="./massagem.svg"
              width={16}
              height={16}
              alt={"massagem"}
            />
            massagem
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image
              src="./acabamento.svg"
              width={16}
              height={16}
              alt={"acabamento"}
            />
            acabamento
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image
              src="./hidratacao.svg"
              width={16}
              height={16}
              alt={"hidratacao"}
            />
            hidratacao
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image
              src="./sobrancelha.svg"
              width={16}
              height={16}
              alt={"sobrancelha"}
            />
            sobrancelha
          </Button>
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
        <div className="mt-5">
          <h4 className="uppercase text-gray-400">Agendamentos</h4>
        </div>
        <Card className="mt-2">
          <CardContent className="flex justify-between p-0">
            {/* Esquerda */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">Corte de Cabelo</h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                </Avatar>
                <p className="text-sm">Barbearia Test</p>
              </div>
            </div>
            {/* Direita */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">05</p>
              <p className="text-sm">22:00</p>
            </div>
          </CardContent>
        </Card>
        <h4 className="mt-5 uppercase text-gray-400">Recomendados</h4>
        <div className="mt-2 flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershop.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
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
