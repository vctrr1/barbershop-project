import Footer from "@/app/_components/footer"
import ServiceItem from "@/app/_components/service-item"
import { Button } from "@/app/_components/ui/button"
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
    <>
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
          <Button
            size="icon"
            variant="secondary"
            className="absolute right-4 top-4"
          >
            <MenuIcon />
          </Button>
        </div>
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

        <div className="space-y-2 border-b border-solid p-5">
          <p className="text-sm font-bold uppercase text-gray-400">Sobre nós</p>
          <p className="text-justify text-sm">{barbershop?.description}</p>
        </div>

        <div className="space-y-3 border-b border-solid p-5">
          <p className="text-sm font-bold uppercase text-gray-400">Serviços</p>
          {barbershop.services.map((service) => (
            <ServiceItem service={service} key={service.id} />
          ))}
        </div>

        <div className="space-y-2 border-b border-solid p-5">
          <p className="text-sm font-bold uppercase text-gray-400">Contatos</p>
          <div className="flex flex-col space-y-4">
            {barbershop.phones.map((phone, index) => (
              <h3 key={index}>{phone}</h3>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default BarbershopPage
