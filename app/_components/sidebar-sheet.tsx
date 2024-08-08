import { CalendarIcon, HomeIcon, LogIn, LogOut } from "lucide-react"
import { Button } from "./ui/button"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quickSearchOption } from "../_constants/quickSearchOptions"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarImage } from "./ui/avatar"

const SidebarSheet = () => {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Menu</SheetTitle>
        <div className="flex flex-row items-center justify-between border-b-2 border-solid pb-4">
          <div className="flex flex-row gap-2">
            <Avatar>
              <AvatarImage src="https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </Avatar>
            <div className="flex flex-col items-start">
              <p className="max-w-[150px] truncate font-bold">
                Victor Emanoel M Cabral
              </p>
              <p className="max-w-[150px] truncate text-xs text-gray-300">
                victtoremmanoel@outlook.com
              </p>
            </div>
          </div>
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
            <Image src={option.imageUrl} alt="test" width={20} height={20} />
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
  )
}

export default SidebarSheet
