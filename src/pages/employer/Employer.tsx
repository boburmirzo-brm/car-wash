import CarWashing from "@/components/car-washing/CarWashing"
import React from "react"

const Employer = () => {
  return (
    <>
      <CarWashing role={"ADMIN"}/>
    </>
  )
}

export default React.memo(Employer)