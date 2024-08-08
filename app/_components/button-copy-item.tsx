"use client"

import { SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"

interface PhoneItemProps {
  phone: string
}

const CopyPhoneToClipbord = ({ phone }: PhoneItemProps) => {
  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone)
    toast.success("Telefone Copiado com Sucesso!")
  }

  return (
    <div className="flex justify-between" key={phone}>
      {/* Esquerda */}
      <div className="flex items-center gap-2">
        <SmartphoneIcon />
        <h3>{phone}</h3>
      </div>
      {/* Direita */}
      <Button
        size="sm"
        variant="secondary"
        onClick={() => handleCopyPhone(phone)}
      >
        Copiar
      </Button>
    </div>
  )
}

export default CopyPhoneToClipbord
