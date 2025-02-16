import { useEffect, useState } from "react"

interface Products {
  id: number,
  thumbnail: string,
  title: string
}

const App = () => {
  const [data, setData] = useState([])
  useEffect(()=>{
    const fetchData = async ()=>{
      const response = await fetch("https://dummyjson.com/products")
      response
        .json()
        .then(res => {
          setData(res.products)
        })
    }
    fetchData()
  }, [])
  
  
  return (
    <div >
      <h2 className="text-center text-red-500">Car Wash</h2>
      <div className="flex gap-3 flex-wrap">
        {
          data?.map((item:Products) => (
            <div key={item.id}>
              <img src={item.thumbnail} className="w-[300px]" alt="" />
              <h3>{item.title}</h3>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default App