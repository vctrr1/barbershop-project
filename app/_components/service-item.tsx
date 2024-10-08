"use client"

import { Barbershop, BarbershopService, Booking } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import { NotebookText } from "lucide-react"
import Image from "next/image"
import { Button } from "./ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useEffect, useState } from "react"
import { isPast, isToday, set } from "date-fns"
import CreateBooking from "../_actions/create-booking"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { getBookins } from "../_actions/get-bookins"
import DialogItemLogin from "./dialog-item-login"
import BookingSummary from "./booking-sumary"

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name">
}

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
]

interface GetTimeListProps {
  bookings: Booking[]
  selectedDay: Date
}

const getTimeList = ({ bookings, selectedDay }: GetTimeListProps) => {
  return TIME_LIST.filter((time) => {
    const hour = Number(time.split(":")[0])
    const minutes = Number(time.split(":")[1])

    const timeIsOnThePast = isPast(set(new Date(), { hours: hour, minutes }))
    if (timeIsOnThePast && isToday(selectedDay)) {
      return false
    }
    const hasBookinOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes,
    )
    if (hasBookinOnCurrentTime) {
      return false
    }
    return true
  })
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession()

  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  const [dayBooking, setDayBooking] = useState<Booking[]>([])
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) return
      const bookings = await getBookins({
        date: selectedDay,
        serviceId: service.id,
      })
      setDayBooking(bookings)
    }
    fetch()
  }, [selectedDay, service.id])

  const handleDaySelect = (date: Date | undefined) => {
    setSelectedDay(date)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }
  const handleBookingSheetOpenChange = () => {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBooking([])
    setBookingSheetIsOpen(false)
  }

  const handleCreateBookin = async () => {
    try {
      if (!selectedDay || !selectedTime) return
      const hour = Number(selectedTime?.split(":")[0])
      const minute = Number(selectedTime?.split(":")[1])
      const newDate = set(selectedDay, {
        minutes: minute,
        hours: hour,
      })
      await CreateBooking({
        serviceId: service.id,
        date: newDate,
      })
      handleBookingSheetOpenChange()
      toast.success("Reserva criada com sucesso!")
    } catch (error) {
      console.log(error)
      toast.error("Falha ao criar a reserva!")
    }
  }

  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        <div className="relative min-h-[120px] min-w-[120px]">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.description}</p>
          <div className="flex items-center justify-between pt-2">
            <p className="font-bold text-primary">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
            </p>
            <Sheet
              open={bookingSheetIsOpen}
              onOpenChange={handleBookingSheetOpenChange}
            >
              {data?.user ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setBookingSheetIsOpen(true)}
                >
                  Agendar
                </Button>
              ) : (
                <DialogItemLogin buttonType="booking" variant="outline" />
              )}
              <SheetContent className="px-0">
                <SheetHeader className="">
                  <SheetTitle className="text-lg">Faça sua reserva</SheetTitle>
                </SheetHeader>
                <div className="border-b border-solid py-4">
                  <Calendar
                    disabled={{ dayOfWeek: [0] }}
                    mode="single"
                    locale={ptBR}
                    selected={selectedDay}
                    onSelect={handleDaySelect}
                    fromDate={new Date()}
                    styles={{
                      head_cell: {
                        width: "100%",
                        textTransform: "capitalize",
                      },
                      cell: {
                        width: "100%",
                      },
                      button: {
                        width: "100%",
                      },
                      nav_button_previous: {
                        width: "32px",
                        height: "32px",
                      },
                      nav_button_next: {
                        width: "32px",
                        height: "32px",
                      },
                      caption: {
                        textTransform: "capitalize",
                      },
                    }}
                  />
                </div>
                {selectedDay && (
                  <div className="flex gap-2 overflow-x-auto border-b border-solid px-4 py-5 [&::-webkit-scrollbar]:hidden">
                    {getTimeList({ bookings: dayBooking, selectedDay }).map(
                      (time) => (
                        <Button
                          key={time}
                          variant={
                            selectedTime === time ? "default" : "outline"
                          }
                          className="rounded-lg"
                          onClick={() => handleTimeSelect(time)}
                        >
                          {time}
                        </Button>
                      ),
                    )}
                  </div>
                )}
                {selectedTime && selectedDay && (
                  <>
                    <div className="p-4">
                      <BookingSummary
                        barbershop={barbershop}
                        service={service}
                        selectDate={set(selectedDay, {
                          hours: Number(selectedTime?.split(":")[0]),
                          minutes: Number(selectedTime?.split(":")[1]),
                        })}
                      />
                    </div>
                    <SheetFooter className="px-4">
                      <SheetClose asChild>
                        <Button
                          type="submit"
                          className="gap-2"
                          onClick={handleCreateBookin}
                        >
                          <NotebookText size={20} />
                          Agendar
                        </Button>
                      </SheetClose>
                    </SheetFooter>
                  </>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
