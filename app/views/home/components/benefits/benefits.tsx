import Image from 'next/image'

import { IBenefitsData, IBenefitsItem } from './benefits.type'

const Benefits = ({ data }: IBenefitsData) => {
  const { title, description, items } = data

  return (
    <section
      id='benefits'
      className='bg-white py-20'
    >
      <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <div className='mb-16 text-center'>
          <h2 className='mb-4 text-3xl font-bold text-gray-900 md:text-4xl'>
            {title}
          </h2>
          <p className='mx-auto max-w-2xl text-lg text-gray-600'>
            {description}
          </p>
        </div>

        <div className='grid gap-8 md:grid-cols-2'>
          {items.map((item: IBenefitsItem) => {
            return (
              <div
                key={item.id}
                className='flex items-start space-x-4 rounded-xl border border-gray-100 bg-gradient-to-r from-gray-50 to-white p-6 transition-all duration-300 hover:shadow-lg'
              >
                <div className='flex-shrink-0'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-gray-900 to-gray-700 text-2xl grayscale'>
                    <Image
                      src={item.image.url}
                      alt={item.image.alt ? item.image.alt : 'Stack Image'}
                      height={item.image.height}
                      width={item.image.width}
                      className='h-6 w-6 object-cover'
                    />
                  </div>
                </div>
                <div className='flex-1'>
                  <h3 className='mb-2 text-xl font-semibold text-gray-900'>
                    {item.title}
                  </h3>
                  <p className='leading-relaxed text-gray-600'>
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Benefits
