"use client"

import { useEffect, useState } from "react"

const DateItem = () => {
  const [currentDate, setCurrentDate] = useState("")

  useEffect(() => {
    const date = new Date()
    const weekday = date.toLocaleDateString("pt-BR", {
      weekday: "long",
    })
    const day = date.toLocaleDateString("pt-BR", {
      day: "numeric",
    })
    const month = date.toLocaleDateString("pt-BR", {
      month: "long",
    })

    const formatedDate = `${weekday.charAt(0).toUpperCase() + weekday.slice(1)}, ${day} ${month.charAt(0).toUpperCase() + month.slice(1)}.`

    setCurrentDate(formatedDate)
  }, [])

  return <p>{currentDate}</p>
}

export default DateItem
