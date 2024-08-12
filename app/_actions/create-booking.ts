"use server"

import { revalidatePath } from "next/cache"
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
  revalidatePath("/barbershop/[id]")
}

export default CreateBooking
