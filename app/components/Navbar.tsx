import { auth, signOut, signIn } from '@/auth'
import Link from 'next/link'
import React from 'react'
import { FaFeather } from 'react-icons/fa'

export default async function Navbar() {
  const session = await auth()
  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
      <nav className='flex justify-between items-center'>
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <div className="flex items-center transition-transform duration-200">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary-700">
              <FaFeather size={20} />
            </div>
            <div className="ml-1 flex items-baseline">
              <span className="font-bold text-2xl text-primary-700">L</span>
              <span className="font-semibold text-lg text-primary-800">ikho.in</span>
            </div>
          </div>
        </Link>

        {/* NavItems */}
        <div className='flex items-center gap-5'>
          {
            session && session?.user ? (
              <>
                <Link
                  href='/startup/create'
                  className="px-4 py-2 text-primary-800 hover:text-secondary-700 hover:bg-gray-50 rounded-md transition-colors duration-200 font-medium"
                >
                  Create
                </Link>

                <form action={async () => {
                  'use server'
                  await signOut()
                }}>
                  <button
                    type="submit"
                    className="px-4 py-2 text-primary-800 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200 font-medium"
                  >
                    Logout
                  </button>
                </form>


                <Link
                  href={`/user/${session?.id}`}
                  className="flex items-center gap-2 px-3 py-2 bg-secondary-700 text-white rounded-md hover:bg-primary-700 transition-colors duration-200 font-medium"
                >
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                    {session?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  {session?.user?.name}
                </Link>
              </>
            ) : (
              <form action={async () => {
                'use server'
                await signIn('github')
              }}>
                <button
                  type="submit"
                  className="px-6 py-2 bg-secondary-700 text-white rounded-md hover:bg-primary-700 transition-colors duration-200 font-medium flex items-center gap-2"
                >
                  Login
                </button>
              </form>
            )
          }
        </div>

      </nav>
    </header >
  )
}
