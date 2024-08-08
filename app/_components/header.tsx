import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogIn, LogOut, MenuIcon } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { quickSearchOption } from "../_constants/quickSearchOptions"
import Link from "next/link"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-4">
        <Image alt="Barber" src="/logo.png" height={18} width={120} />
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div className="flex flex-row items-center justify-between border-b-2 border-solid pb-4">
                <p className="text-sm">Olá. Faça seu login!</p>
                <Button variant="outline">
                  <LogIn size={20} />
                </Button>
              </div>
            </SheetHeader>
            <div className="flex flex-col gap-2 border-b border-solid pb-4 pt-4">
              <SheetClose asChild>
                <Button className="justify-start gap-2" variant="ghost" asChild>
                  <Link href={"/"}>
                    <HomeIcon size={18} />
                    Inicio
                  </Link>
                </Button>
              </SheetClose>
              <Button className="justify-start gap-2" variant="ghost">
                <CalendarIcon size={18} />
                Agendamentos
              </Button>
            </div>
            <div className="flex flex-col gap-2 border-b border-solid pb-4 pt-4">
              {quickSearchOption.map((option) => (
                <Button
                  key={option.title}
                  className="justify-start gap-2"
                  variant="ghost"
                >
                  <Image
                    src={option.imageUrl}
                    alt={option.title}
                    width={18}
                    height={18}
                  />
                  <span className="capitalize">{option.title}</span>
                </Button>
              ))}
            </div>
            <div className="flex flex-col gap-2 pb-4 pt-4">
              <Button className="gap-2">
                <LogOut size={20} />
                Sair
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
