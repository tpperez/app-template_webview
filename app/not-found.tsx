import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Error 404 - Page Not Found',
  description: 'Sorry, we could not find the page you were looking for...',
  robots: 'noindex, nofollow',
}

const NotFoundRoot = () => {
  return (
    <section className='flex min-h-screen flex-col'>
      <div className='flex h-screen w-full flex-col items-center justify-center'>
        <p className='text-7xl font-black text-gray-500'>404</p>
        <p className='text-sm text-gray-500'>Page Not Found</p>
      </div>
    </section>
  )
}

export default NotFoundRoot
