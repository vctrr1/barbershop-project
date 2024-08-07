import { Avatar } from "./ui/avatar"
import { AvatarImage } from "@radix-ui/react-avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"

//TODO recive bookingItems with props

const BookingItem = () => {
  return (
    <>
      {/* Como precisa renderizar varios elementos usa-se fragment <></> */}
      <div className="mt-5">
        <h4 className="uppercase text-gray-400">Agendamentos</h4>
      </div>
      <Card className="mt-2">
        <CardContent className="flex justify-between p-0">
          {/* Esquerda */}
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge className="w-fit">Confirmado</Badge>
            <h3 className="font-semibold">Corte de Cabelo</h3>
            <div className="flex items-center gap-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
              </Avatar>
              <p className="text-sm">Barbearia Test</p>
            </div>
          </div>
          {/* Direita */}
          <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
            <p className="text-sm">Agosto</p>
            <p className="text-2xl">05</p>
            <p className="text-sm">22:00</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BookingItem
