export interface IStatsData {
  data: IStatsProps
}

export interface IStatsProps {
  items: IStatsItem[]
}

export interface IStatsItem {
  id: string
  title: string
  subtitle: string
}
