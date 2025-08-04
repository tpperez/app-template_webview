import { IBenefitsProps } from './components/benefits/benefits.type'
import { IGetStartedProps } from './components/get-started/get-started.type'
import { IHeroProps } from './components/hero/hero.type'
import { IStackProps } from './components/stack/stack.type'
import { IStatsProps } from './components/stats/stats.type'

export interface IHomeViewData {
  data: IHomeViewProps
}

export interface IHomeViewProps {
  hero: IHeroProps
  stats: IStatsProps
  stack: IStackProps
  benefits: IBenefitsProps
  getStarted: IGetStartedProps
}
