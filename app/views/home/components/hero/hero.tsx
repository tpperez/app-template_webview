'use client'

import React, { useEffect, useState } from 'react'

import { SITE_NAME } from '@/app/constants/config'

import { IHeroData } from './hero.type'

const Hero = ({ data }: IHeroData) => {
  const { description } = data

  const [typewriterText, setTypewriterText] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  // typewriter effect
  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < description.length) {
        setTypewriterText(description.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)

        setInterval(() => {
          setShowCursor((prev) => {
            return !prev
          })
        }, 500)
      }
    }, 50)

    return () => {
      return clearInterval(timer)
    }
  }, [description])

  return (
    <section className='bg-gradient-to-b from-white to-gray-100 px-4 py-20 sm:px-8 lg:px-10'>
      <div className='mx-auto max-w-4xl text-center'>
        <h1 className='mb-6 text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl'>
          {SITE_NAME}
        </h1>

        <p className='mx-auto max-w-3xl text-lg text-gray-600 sm:text-xl'>
          {typewriterText}
          <span
            className={`ml-1 inline-block h-5 w-0.5 bg-gray-600 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}
          ></span>
        </p>
      </div>
    </section>
  )
}

export default Hero
