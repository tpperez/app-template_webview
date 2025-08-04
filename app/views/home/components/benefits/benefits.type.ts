export interface IBenefitsData {
  data: IBenefitsProps
}

export interface IBenefitsProps {
  title: string
  description: string
  items: IBenefitsItem[]
}

export interface IBenefitsItem {
  id: string
  image: {
    alt?: string
    url: string
    height: number
    width: number
  }
  title: string
  description: string
}
