import type { Metadata } from 'next'

import ViewHome from '@/app/views/home'

import getHomeData from './queries'

export const metadata: Metadata = {
  title: 'Home',
  description: 'This is home page of the application.',
}

const PageHome = async () => {
  const { success, data, error } = await getHomeData()

  if (!success || !data) {
    console.error('Error fetching page data:', error)
    return null
  }

  const { home } = data

  return <ViewHome data={home} />
}

export default PageHome
