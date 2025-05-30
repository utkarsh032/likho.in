import { auth } from '@/auth'
import UserStartUps from '@/components/UserStartUps'
import { client } from '@/sanity/lib/client'
import { AUTHOR_BY_ID_QUERY } from '@/sanity/lib/queries'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export const experimental_ppr = true;


const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id
  const session = await auth()
  console.log('session:', session)
  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id })
  if (!user) return notFound()
  return (
    <section className='profile_container'>
      <div className='profile_card'>
        <div className='profile_title'>
          <h3 className='text-3xl font-extrabold  uppercase text-center'>{user.name}</h3>
        </div>

        <Image
          src={user.image}
          alt={user.name}
          width={220}
          height={220}
          className='profile_image'
        />

        <p className='text-3xl font-bold mt-7 text-center'>{user?.username}</p>
        <p className='text-3xl font-bold mt-7 text-center'>{user?.bio}</p>
      </div>

      <div className='flex-1 flex flex-col gap-5 profile_content'>
        <div className='profile_section_header'>
          <h2 className='profile_section_title'>
            {session?.id === id ? 'Your' : 'All'} StartUps
          </h2>
        </div>
        <ul className='card-grid-sm'>
          {/* Your startup items here */}
          <UserStartUps id={id}/>
        </ul>
      </div>
    </section>
  )
}

export default page
