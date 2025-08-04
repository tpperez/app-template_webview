'use client'

import { useState } from 'react'

import Logo from '@/app/components/ui/logo'
import { INavLink } from '@/app/types/nav-link'

import { IHeaderData } from './header.type'

const Header = ({ data }: IHeaderData) => {
  const { links } = data

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className='sticky top-0 z-50 bg-white/90 shadow-sm backdrop-blur-md'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between py-4'>
          <Logo variant='dark' />

          <nav className='hidden space-x-8 lg:flex'>
            {links.map((link: INavLink) => {
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className='text-gray-600 transition-colors hover:text-gray-900'
                >
                  {link.text}
                </a>
              )
            })}
          </nav>

          <button
            className='text-gray-600 lg:hidden'
            onClick={() => {
              return setIsMenuOpen(!isMenuOpen)
            }}
          >
            <div className='relative flex h-6 w-6 flex-col items-center justify-center'>
              <span
                className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45' : '-translate-y-1.5'
                }`}
              ></span>
              <span
                className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45' : 'translate-y-1.5'
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className='border-b border-gray-200 bg-white/90 py-4 shadow-lg backdrop-blur-md lg:hidden'>
          <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
            <nav className='flex flex-col space-y-4'>
              <ul>
                {links.map((link: INavLink) => {
                  return (
                    <li
                      key={link.id}
                      className='my-2'
                    >
                      <a
                        href={link.href}
                        className='text-gray-600 transition-colors hover:text-gray-900'
                        onClick={() => {
                          return setIsMenuOpen(false)
                        }}
                      >
                        {link.text}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
