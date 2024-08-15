import { Card, CardContent } from "./ui/card"

const Footer = () => {
  return (
    <Card className="rounded-none">
      <CardContent className="py-3 text-center">
        <p className="text-[10px] text-gray-400">
          © 2024 Copyright <span className="font-bold">VCTRR</span>
        </p>
      </CardContent>
    </Card>
  )
}

export default Footer
