import { Avatar } from "./ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"
import { Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import Image from "next/image"
import CopyPhoneToClipbord from "./button-copy-item"
import { Button } from "./ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog"
interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true
        }
      }
    }
  }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const isConfirmed = isFuture(booking.date)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="mt-2 min-w-[90%]">
          <CardContent className="flex justify-between p-0">
            {/* Esquerda */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge
                className="w-fit"
                variant={isConfirmed ? "default" : "destructive"}
              >
                {isConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>
              <h3 className="font-semibold">{booking.service.name}</h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={booking.service.barbershop.imageUrl} />
                </Avatar>
                <p className="text-sm">{booking.service.barbershop.name}</p>
              </div>
            </div>
            {/* Direita */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm capitalize">
                {format(booking.date, "MMM", {
                  locale: ptBR,
                })}
              </p>
              <p className="text-2xl">
                {format(booking.date, "dd", {
                  locale: ptBR,
                })}
              </p>
              <p className="text-sm">
                {format(booking.date, "HH:mm", {
                  locale: ptBR,
                })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="w-[90%]">
        <SheetHeader className="mt-5">
          <SheetTitle className="text-center">
            Informações da reserva
          </SheetTitle>
        </SheetHeader>
        <div className="relative mt-4 flex h-[180px] w-full items-end">
          <Image
            src="/map.png"
            alt="map"
            fill
            className="rounded-lg object-cover"
          />
          <Card className="z-50 mx-4 mb-3 w-full">
            <CardContent className="flex items-center gap-3 px-4 py-3">
              <Avatar>
                <AvatarImage src={booking.service.barbershop.imageUrl} />
              </Avatar>
              <div>
                <h3 className="font-bold">{booking.service.barbershop.name}</h3>
                <p className="truncate text-sm">
                  {booking.service.barbershop.address}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mt-5">
          <Badge
            className="w-fit"
            variant={isConfirmed ? "default" : "destructive"}
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>
          <Card className="mb-6 mt-3">
            <CardContent className="space-y-3 p-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">{booking.service.name}</h2>
                <p className="text-sm font-bold">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(booking.service.price))}
                </p>
              </div>
              <div className="flex items-center justify-between text-gray-400">
                <h2 className="text-sm">Data</h2>
                <p className="text-sm">
                  {format(booking.date, "d 'de' MMM", {
                    locale: ptBR,
                  })}
                </p>
              </div>
              <div className="flex items-center justify-between text-gray-400">
                <h2 className="text-sm">Horário</h2>
                <p className="text-sm">
                  {format(booking.date, "HH:mm", {
                    locale: ptBR,
                  })}
                </p>
              </div>
              <div className="flex items-center justify-between text-gray-400">
                <h2 className="text-sm">Barbearia</h2>
                <p className="text-sm">{booking.service.barbershop.name}</p>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-3">
            {booking.service.barbershop.phones.map((phone) => (
              <CopyPhoneToClipbord phone={phone} key={phone} />
            ))}
          </div>
        </div>
        <SheetFooter className="mt-7">
          <div className="flex items-center gap-3">
            <SheetClose asChild>
              <Button variant="outline" className="w-full">
                Voltar
              </Button>
            </SheetClose>
            {isConfirmed && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    Cancelar
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="w-[90%]">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-base">
                      Tem certeza que deseja cancelar o agendamento?
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="justify-between">
                    <AlertDialogCancel>Voltar</AlertDialogCancel>
                    <AlertDialogAction
                      asChild
                      className="bg-d93f3f hover:bg-d93f3f"
                    >
                      <Button variant="destructive">Confirmar</Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem
