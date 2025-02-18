import { useOnlineStatus } from '@/hooks/useOnlineStatus'
import React from 'react'
import "./style.css"

const OnlineStatus = () => {
  const {online, firstEnter} = useOnlineStatus()
  
  return firstEnter ? online ? 
  <p className='text-center bg-green-500 text-white text-sm online-status'>online</p>
  :
  <p className='text-center bg-red-500 text-white text-sm'>offline</p>
  :
  <></>
}

export default React.memo(OnlineStatus)