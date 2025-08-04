'use client'

import { useEffect, useState } from 'react'

import { IGetStartedCommand, IGetStartedData } from './get-started.type'

const GetStarted = ({ data }: IGetStartedData) => {
  const { title, description, commands } = data

  const [displayedCommands, setDisplayedCommands] = useState<
    IGetStartedCommand[]
  >([])
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')

  useEffect(() => {
    if (currentCommandIndex >= commands.length) return

    const currentCommand = commands[currentCommandIndex]

    if (currentText.length < currentCommand.command.length) {
      const timer = setTimeout(() => {
        setCurrentText(currentCommand.command.slice(0, currentText.length + 1))
      }, 50)
      return () => {
        return clearTimeout(timer)
      }
    } else {
      const timer = setTimeout(() => {
        setDisplayedCommands((prev) => {
          return [...prev, currentCommand]
        })
        setCurrentCommandIndex((prev) => {
          return prev + 1
        })
        setCurrentText('')
      }, 800)
      return () => {
        return clearTimeout(timer)
      }
    }
  }, [currentText, currentCommandIndex, commands])

  return (
    <section
      id='get-started'
      className='bg-gradient-to-br from-gray-100 to-gray-50 px-4 py-20 sm:px-6 lg:px-8'
    >
      <div className='mx-auto max-w-4xl text-center'>
        <h2 className='mb-4 text-3xl font-bold text-gray-900 md:text-4xl'>
          {title}
        </h2>
        <p className='mb-8 text-lg text-gray-600'>{description}</p>
        <div className='mb-8 overflow-hidden rounded-lg border border-gray-700 bg-black shadow-xl'>
          <div className='flex items-center gap-2 bg-gray-600 px-4 py-2'>
            <div className='flex gap-2'>
              <div className='h-3 w-3 rounded-full bg-red-500'></div>
              <div className='h-3 w-3 rounded-full bg-yellow-500'></div>
              <div className='h-3 w-3 rounded-full bg-green-500'></div>
            </div>
          </div>

          <div className='min-h-[60px] p-4 text-left'>
            <div className='space-y-2 font-mono text-sm'>
              {displayedCommands.map((command: IGetStartedCommand) => {
                return (
                  <div
                    key={command.id}
                    className='flex items-center'
                  >
                    <span className='text-white'>{command.command}</span>
                  </div>
                )
              })}
              {currentCommandIndex < commands.length && (
                <div
                  className='flex items-center'
                  key={currentCommandIndex}
                >
                  <span className='text-white'>{currentText}</span>
                  <span className='ml-1 animate-pulse text-white'>|</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GetStarted
