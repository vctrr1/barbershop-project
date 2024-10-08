import { getServerSession } from "next-auth"
import Header from "../_components/header"
import { authOptions } from "../_lib/auth"
import BookingItem from "../_components/booking-item"
import { Button } from "../_components/ui/button"
import Link from "next/link"
import {
  getConcludedBookings,
  getConfirmedBookins,
} from "../_data/get-bookings"

const Bookings = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5">
        <h1 className="text-base">Faça login para ver seus agendamentos!!</h1>
        <Link href="/">
          <Button>Voltar</Button>
        </Link>
      </div>
    )
  }

  const ConfirmedBookings = await getConfirmedBookins()

  const ConcludedBookings = await getConcludedBookings()

  return (
    <>
      <Header />
      <div className="p-5">
        <h1 className="pb-4 text-lg font-bold">Agendamentos</h1>
        <div className="space-y-3">
          <span className="} text-sm uppercase text-gray-400">Confirmados</span>
          {ConfirmedBookings.map((booking) => (
            <BookingItem
              key={booking.id}
              booking={JSON.parse(JSON.stringify(booking))}
            />
          ))}
        </div>
        <div className="mt-4 space-y-3">
          <span className="} text-sm uppercase text-gray-400">Finalizados</span>
          {ConcludedBookings.map((booking) => (
            <BookingItem
              key={booking.id}
              booking={JSON.parse(JSON.stringify(booking))}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Bookings
