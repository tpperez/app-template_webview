import Image from 'next/image'

import { IStackData, IStackItem, IStackListItem } from './stack.type'

const Stack = ({ data }: IStackData) => {
  const { title, description, items } = data

  return (
    <section
      id='stack'
      className='bg-gradient-to-b from-gray-50 to-white px-4 py-20 sm:px-6 lg:px-8'
    >
      <div className='mx-auto max-w-6xl'>
        <div className='mb-16 text-center'>
          <h2 className='mb-4 text-3xl font-bold text-gray-900 md:text-4xl'>
            {title}
          </h2>
          <p className='mx-auto max-w-3xl text-lg text-gray-600'>
            {description}
          </p>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          {items.map((item: IStackItem) => {
            return (
              <div
                key={item.id}
                className='group relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 shadow-lg transition-all duration-500 hover:border-gray-300 hover:shadow-2xl'
              >
                <div className='absolute -right-4 -top-4 flex h-24 w-24 rotate-[20deg] items-center justify-center rounded-full bg-gradient-to-br from-gray-400 to-gray-600 opacity-20 grayscale'>
                  <span className='text-4xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-100'>
                    <Image
                      src={item.image.url}
                      alt={item.image.alt ? item.image.alt : 'Stack Image'}
                      height={item.image.height}
                      width={item.image.width}
                      className='h-12 w-12 object-cover'
                    />
                  </span>
                </div>
                <div className='relative'>
                  <div className='mb-6'>
                    <h3 className='text-xl font-bold text-gray-900'>
                      {item.title}
                    </h3>
                  </div>
                  <ul className='space-y-3'>
                    {item.list.items.map((item: IStackListItem) => {
                      return (
                        <li
                          className='text-gray-700'
                          key={item.id}
                        >
                          <span className='font-medium'>{item.label}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Stack
