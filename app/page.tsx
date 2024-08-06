import { SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"

export default function Home() {
  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Ola, Victor!</h2>
        <p>Segunda Feira, 05 Agosto.</p>
        <div className="mt-4 flex items-center gap-2">
          <Input placeholder="Pesquise Aqui." />
          <Button>
            <SearchIcon />
          </Button>
        </div>
        <div className="relative mt-5 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
            alt="Agendar"
          />
        </div>
      </div>
    </div>
  )
}
