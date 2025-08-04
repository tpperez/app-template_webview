import { IStatsData, IStatsItem } from './stats.type'

const TechStats = ({ data }: IStatsData) => {
  const { items } = data

  return (
    <section className='bg-white py-16'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <ul className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          {items.map((item: IStatsItem) => {
            return (
              <li
                key={item.id}
                className='rounded-xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-6 text-center shadow-sm transition-shadow hover:shadow-md'
              >
                <div className='mb-2 text-2xl font-bold text-gray-900 md:text-3xl'>
                  {item.title}
                </div>
                <div className='text-sm text-gray-600 md:text-base'>
                  {item.subtitle}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export default TechStats
