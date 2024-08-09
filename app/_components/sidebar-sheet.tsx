"use client"

import { CalendarIcon, HomeIcon, LogInIcon, LogOut } from "lucide-react"
import { Button } from "./ui/button"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quickSearchOption } from "../_constants/quickSearchOptions"
import Link from "next/link"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"

const SidebarSheet = () => {
  const { data } = useSession()
  //função que chama o signIn do next-auth, que é uma promise
  const handleLoginWithGoogle = async () => {
    await signIn("google")
  }
  const handleSignOutGoogle = async () => {
    await signOut()
  }

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Menu</SheetTitle>
        <div className="flex w-full flex-row items-center justify-between border-b border-solid pb-4">
          {!data?.user?.name ? (
            <>
              <h2 className="text-[15px] font-bold">Faça seu login!</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="p-2">
                    <LogInIcon size={20} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[80%]">
                  <DialogHeader>
                    <DialogTitle className="pt-3">Login</DialogTitle>
                    <DialogDescription>
                      Faça login com sua conta Google!
                    </DialogDescription>
                  </DialogHeader>
                  <Button onClick={handleLoginWithGoogle} className="gap-2">
                    <Image
                      src="/google.svg"
                      width={30}
                      height={30}
                      alt="goole"
                    />
                    Google
                  </Button>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <div className="flex flex-row gap-2">
              <Avatar>
                <AvatarImage
                  src={data?.user?.image as string}
                  alt="user image"
                />
              </Avatar>
              <div className="flex flex-col items-start">
                <p className="truncate font-bold">
                  {data?.user?.name?.split(" ").slice(0, 2).join(" ")}
                </p>
                <p className="truncate text-xs text-gray-300">
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
        <Button className="gap-2" onClick={handleSignOutGoogle}>
          <LogOut size={20} />
          Sair
        </Button>
      </div>
    </SheetContent>
  )
}

export default SidebarSheet
