import CopyPhoneToClipbord from "@/app/_components/button-copy-item"
import ServiceItem from "@/app/_components/service-item"
import SidebarSheet from "@/app/_components/sidebar-sheet"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  return (
    <div>
      {/* Imagem */}
      <div className="relative h-[250px] w-full">
        <Image
          fill
          src={barbershop?.imageUrl}
          alt={barbershop?.name}
          className="object-cover"
        />
        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="secondary"
              className="absolute right-4 top-4"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </div>
      {/* Infos Barbearias */}
      <div className="border-b border-solid p-5">
        <h1 className="mb-2 text-xl font-bold">{barbershop?.name}</h1>
        <div className="mb-1 flex items-center gap-1">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop?.address}</p>
        </div>
        <div className="flex items-center gap-1">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p className="text-sm">5.0 (XXX Avaliações)</p>
        </div>
      </div>
      {/* Sobre nos */}
      <div className="space-y-2 border-b border-solid p-5">
        <p className="text-sm font-bold uppercase text-gray-400">Sobre nós</p>
        <p className="text-justify text-sm">{barbershop?.description}</p>
      </div>
      {/* Serviços */}
      <div className="space-y-3 border-b border-solid p-5">
        <p className="text-sm font-bold uppercase text-gray-400">Serviços</p>
        {barbershop.services.map((service) => (
          <ServiceItem service={service} key={service.id} />
        ))}
      </div>
      {/* Contatos */}
      <div className="space-y-2 p-5">
        <p className="text-sm font-bold uppercase text-gray-400">Contatos</p>
        <div className="flex flex-col space-y-3">
          {barbershop.phones.map((phone) => (
            <CopyPhoneToClipbord phone={phone} key={phone} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarbershopPage
