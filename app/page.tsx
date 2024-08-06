import { SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { Badge } from "./_components/ui/badge"
import { Card, CardContent } from "./_components/ui/card"
import { Avatar } from "./_components/ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"

export default function Home() {
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
        <Card className="mt-3">
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
      </div>
    </div>
  )
}
