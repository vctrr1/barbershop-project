import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import Image from "next/image"
import { signIn } from "next-auth/react"

const DialogItemLogin = () => {
  const handleLoginWithGoogle = async () => {
    await signIn("google")
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-2" variant="secondary" size="sm">
          Agendar
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
          <Image src="/google.svg" width={30} height={30} alt="goole" />
          Google
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default DialogItemLogin
