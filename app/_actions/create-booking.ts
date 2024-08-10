"use server"

import { db } from "../_lib/prisma"

interface CreateBookingProps {
  serviceId: string
  userId: string
  date: Date
}

const CreateBooking = async ({
  serviceId,
  userId,
  date,
}: CreateBookingProps) => {
  await db.booking.create({
    data: {
      serviceId,
      userId,
      date,
    },
  })
}

export default CreateBooking
