"use server"
import { endOfDay, startOfDay } from "date-fns"
import { db } from "../_lib/prisma"

interface GetBookinsProps {
  serviceId: string
  date: Date
}

export const getBookins = async ({ date }: GetBookinsProps) => {
  const bookings = await db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  })
  return bookings
}
