"use client"

import { CalendarIcon, HomeIcon, LogOut } from "lucide-react"
import { Button } from "./ui/button"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quickSearchOption } from "../_constants/quickSearchOptions"
import Link from "next/link"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"
import DialogItemLogin from "./dialog-item-login"

const SidebarSheet = () => {
  const { data } = useSession()

  const handleSignOutGoogle = async () => {
    await signOut()
  }

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="pb-3">Menu</SheetTitle>
        <div className="flex w-full flex-row items-center justify-between border-b border-solid pb-4">
          {!data?.user ? (
            <>
              <h2 className="text-[15px] font-bold">Faça seu login!</h2>
              <DialogItemLogin buttonType={""} />
            </>
          ) : (
            <div className="flex flex-row items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={data?.user?.image as string}
                  alt="user image"
                />
              </Avatar>
              <div className="flex w-full flex-col items-start">
                <p className="truncate text-sm font-bold">
                  {data?.user?.name?.split(" ").slice(0, 2).join(" ")}
                </p>
                <p className="w-full min-w-0 truncate text-xs text-gray-300">
                  {data?.user?.email}
                </p>
              </div>
            </div>
          )}
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
          <SheetClose key={option.title} asChild>
            <Button
              key={option.title}
              className="justify-start gap-2"
              variant="ghost"
              asChild
            >
              <Link href={`/barbershop?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  alt="test"
                  width={20}
                  height={20}
                />
                <span className="capitalize">{option.title}</span>
              </Link>
            </Button>
          </SheetClose>
        ))}
      </div>
      {data?.user && (
        <div className="flex flex-col gap-2 pb-4 pt-4">
          <Button className="my-3 gap-2" onClick={handleSignOutGoogle}>
            <LogOut size={20} />
            Sair
          </Button>
        </div>
      )}
    </SheetContent>
  )
}

export default SidebarSheet
