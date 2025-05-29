import React from 'react'
import Ping from '@/components/Ping'
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'

export default async function View({ id }: { id: string }) {
  const { views: totalViews } = await client.withConfig({ useCdn: false }).fetch(STARTUP_VIEWS_QUERY, { id })
  return (
    <div className='view-container '>
      <div className='absolute -top-2 '>
        <Ping />
      </div>
      <p className='view-text'>
        <span className="font-black">{totalViews} {totalViews == 1 ? 'view' : 'views'}</span>
      </p>
    </div>
  )
}
