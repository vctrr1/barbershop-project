"use client"

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
import { deleteBooking } from "../_actions/delete-booking"
import { toast } from "sonner"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { useState } from "react"
import BookingSummary from "./booking-sumary"
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
  const [isSheetOpen, setSheetOpen] = useState(false)
  const isConfirmed = isFuture(booking.date)

  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id)
      setSheetOpen(false)
      toast.success("Cancelado com sucesso!")
    } catch (error) {
      console.error(error)
    }
  }
  const handleSheetOpenChange = (isOpen: boolean) => {
    setSheetOpen(isOpen)
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild className="w-full min-w-[80%]">
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
          <BookingSummary
            barbershop={booking.service.barbershop}
            service={booking.service}
            selectDate={booking.date}
          />
          <div className="mb-10 space-y-3">
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
              <Dialog>
                <DialogTrigger className="w-full">
                  <Button variant="destructive" className="w-full">
                    Cancelar Reserva
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[80%]">
                  <DialogHeader>
                    <DialogTitle>Você deseja cancelar sua reserva?</DialogTitle>
                    <DialogDescription>Ação irreversível.</DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex flex-row gap-3">
                    <DialogClose asChild>
                      <Button variant="secondary" className="w-full">
                        Voltar
                      </Button>
                    </DialogClose>
                    <DialogClose className="w-full">
                      <DialogClose asChild>
                        <SheetClose asChild>
                          <Button
                            variant="destructive"
                            onClick={handleCancelBooking}
                            className="w-full"
                          >
                            Confirmar
                          </Button>
                        </SheetClose>
                      </DialogClose>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem
