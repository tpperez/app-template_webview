export interface IStackData {
  data: IStackProps
}

export interface IStackProps {
  title: string
  description: string
  items: IStackItem[]
}

export interface IStackItem {
  id: string
  image: {
    alt?: string
    url: string
    height: number
    width: number
  }
  title: string
  list: {
    items: IStackListItem[]
  }
}

export interface IStackListItem {
  id: string
  label: string
}
