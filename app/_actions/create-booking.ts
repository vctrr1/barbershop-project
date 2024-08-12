"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"

interface CreateBookingProps {
  serviceId: string
  userId: string
  date: Date
}
//poderia ser passado os parametros desse jeto, ja que vai pegar todos que passar
//const CreateBooking = async (params: CreateBookingProps) => {
//  await db.booking.create({
//    data: params,
//  })
//  revalidatePath("/barbershop/[id]")
//}

const CreateBooking = async ({
  serviceId,
  userId,
  date,
}: CreateBookingProps) => {
  const user = await getServerSession(authOptions)

  if (!user) {
    throw new Error("Usuário não autenticado")
  }

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
