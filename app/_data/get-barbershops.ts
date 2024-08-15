"use server"

import { db } from "../_lib/prisma"

interface GetBarbershopProps {
  title?: string
  service?: string
  id: string
}

export const getBarbershopByServiceOrName = async (
  searchParams: GetBarbershopProps,
) => {
  return db.barbershop.findMany({
    where: {
      OR: [
        searchParams.title
          ? {
              name: {
                contains: searchParams?.title,
                mode: "insensitive",
              },
            }
          : {},
        searchParams.service
          ? {
              services: {
                some: {
                  name: {
                    contains: searchParams.service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  })
}

export const getBarbershopById = async (params: GetBarbershopProps) => {
  return db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })
}
