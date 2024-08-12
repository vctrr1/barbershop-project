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
import { LogInIcon } from "lucide-react"

interface DialogItemLoginProps {
  buttonType: string
  variant?:
    | "default"
    | "link"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
}

const DialogItemLogin = ({ buttonType, variant }: DialogItemLoginProps) => {
  const handleLoginWithGoogle = async () => {
    await signIn("google")
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-2" size="sm" variant={variant}>
          {buttonType === "booking" ? "Agendar" : <LogInIcon size={18} />}
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
