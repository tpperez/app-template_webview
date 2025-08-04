import { INavLink } from '@/app/types/nav-link'

export interface IHeaderData {
  data: IHeaderProps
}

export interface IHeaderProps {
  links: INavLink[]
}
