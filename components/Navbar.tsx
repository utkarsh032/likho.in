import { auth, signOut, signIn } from '@/auth'
import { BadgePlus, LogOut } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { FaFeather, FaGithub, FaSignOutAlt } from 'react-icons/fa'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default async function Navbar() {
  const session = await auth()

  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans border-b border-gray-100'>
      <nav className='flex justify-between items-center'>
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <div className="flex items-center transition-all duration-300 ">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary-700 group-hover:bg-primary-700 group-hover:text-white transition-all duration-300 ">
              <FaFeather size={20} />
            </div>
            <div className="ml-2 flex items-baseline">
              <span className="font-bold text-2xl text-primary-700 group-hover:text-primary-800 transition-colors duration-300">L</span>
              <span className="font-semibold text-lg text-primary-800 group-hover:text-secondary-700 transition-colors duration-300">ikho.in</span>
            </div>
          </div>
        </Link>

        {/* NavItems */}
        <div className='flex items-center gap-3'>
          {session && session?.user ? (
            <>
              <Link
                href='/startup/create'
                className="flex items-center gap-2 px-4 py-2 text-primary-800 hover:text-secondary-700 hover:bg-primary-50 rounded-lg transition-all duration-200 font-medium hover:shadow-sm border border-transparent hover:border-primary-200"
              >
                <span className='max-sm:hidden flex items-center gap-4'><BadgePlus size={14} />
                  Create</span>
                <BadgePlus className='size-6 sm:hidden' />

              </Link>

              <form action={async () => {
                'use server'
                await signOut()
              }}>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 text-primary-800 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 font-medium hover:shadow-sm border border-transparent hover:border-red-200"
                >
                  <span className='max-sm:hidden flex items-center'> <FaSignOutAlt size={14} /> Logout</span>
                  <LogOut className='size-6 sm:hidden text-red-500' />
                </button>
              </form>

              <Link
                href={`/user/${session?.id}`}
                className="flex items-center gap-2 px-3 py-2 bg-secondary-700 text-white rounded-lg hover:bg-primary-700 transition-all duration-200 font-medium hover:shadow-md hover:scale-105 border border-secondary-700 hover:border-primary-700"
              >
                <Avatar className="size-10">
                  {session?.user?.image ? (
                    <AvatarImage
                      src={session.user.image}
                      alt={session.user.name || ''}
                    />
                  ) : (
                    <AvatarFallback>
                      {session?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  )}
                </Avatar>



                <span className="hidden sm:inline">{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form action={async () => {
              'use server'
              await signIn('github')
            }}>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2 bg-secondary-700 text-white rounded-lg hover:bg-primary-700 transition-all duration-200 font-medium hover:shadow-md hover:scale-105 border border-secondary-700 hover:border-primary-700"
              >
                <FaGithub size={16} />
                <span className="hidden sm:inline">Login with GitHub</span>
                <span className="sm:hidden">Login</span>
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  )
}