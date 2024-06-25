import React from 'react'
import iconSuccess from '@/assets/icon-success-check.svg'

function Message() {
  return (
    <div className='bg-[hsl(185,_24%,_22%)] font-karla text-white px-4 py-8 flex flex-col gap-2 rounded-md w-96'>
      <div className='flex gap-4 font-bold'>
        <img src={iconSuccess} alt='icon-success' />
        <h2 className='text-xl'>Message Sent!</h2>
      </div>
      <p className='text-sm'>
        Thanks for completing the form. We'll be in touch soon!
      </p>
    </div>
  )
}

export default Message
