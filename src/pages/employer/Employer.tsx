import CarWashing from "@/components/car-washing/CarWashing"
import { useGetMyWashingsQuery } from "@/redux/api/car-washing"
import React from "react"

const Employer = () => {
  const {data} = useGetMyWashingsQuery()
  
  return (
    <>
      <CarWashing data={data?.data}/>
    </>
  )
}

export default React.memo(Employer)