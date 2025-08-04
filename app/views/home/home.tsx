import Benefits from './components/benefits'
import GetStarted from './components/get-started'
import Hero from './components/hero'
import Stack from './components/stack'
import Stats from './components/stats'
import type { IHomeViewData } from './home.type'

const ViewHome = ({ data }: IHomeViewData) => {
  const { hero, stats, stack, benefits, getStarted } = data

  return (
    <>
      <Hero data={hero} />
      <Stats data={stats} />
      <Stack data={stack} />
      <Benefits data={benefits} />
      <GetStarted data={getStarted} />
    </>
  )
}

export default ViewHome
