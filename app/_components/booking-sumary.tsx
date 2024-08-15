import { format } from "date-fns"
import { Card, CardContent } from "./ui/card"
import { Barbershop, BarbershopService } from "@prisma/client"
import { ptBR } from "date-fns/locale"

interface BookingSummaryProps {
  service: Pick<BarbershopService, "name" | "price">
  barbershop: Pick<Barbershop, "name">
  selectDate: Date
}

const BookingSummary = ({
  service,
  barbershop,
  selectDate,
}: BookingSummaryProps) => {
  return (
    <Card className="mb-6 mt-3">
      <CardContent className="space-y-3 p-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold">{service.name}</h2>
          <p className="text-sm font-bold">
            {Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(service.price))}
          </p>
        </div>
        <div className="flex items-center justify-between text-gray-400">
          <h2 className="text-sm">Data</h2>
          <p className="text-sm">
            {format(selectDate, "d 'de' MMM", {
              locale: ptBR,
            })}
          </p>
        </div>
        <div className="flex items-center justify-between text-gray-400">
          <h2 className="text-sm">Horário</h2>
          <p className="text-sm">
            {format(selectDate, "HH:mm", {
              locale: ptBR,
            })}
          </p>
        </div>
        <div className="flex items-center justify-between text-gray-400">
          <h2 className="text-sm">Barbearia</h2>
          <p className="text-sm">{barbershop.name}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingSummary
