import { INavLink } from '@/app/types/nav-link'

export interface IFooterData {
  data: IFooterProps
}

export interface IFooterProps {
  text: string
  copyrightText: string
  sectionLink: IFooterSectionLink[]
}

export interface IFooterSectionLink {
  id: string
  title: string
  links: INavLink[]
}
