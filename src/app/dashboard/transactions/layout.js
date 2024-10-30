import SendRecieveCard from '@/components/SendRecieveCard'
import React from 'react'

const layout = ({ children }) => {
  return (
    <div>
      <SendRecieveCard />
      {children}
    </div>
  )
}

export default layout