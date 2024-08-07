import { Card, CardContent } from "./ui/card"

const Footer = () => {
  return (
    <Card>
      <CardContent className="py-6 text-center">
        <p className="text-[10px] text-gray-400">
          © 2023 Copyright <span className="font-bold">VCTRR</span>
        </p>
      </CardContent>
    </Card>
  )
}

export default Footer
