import { SITE_NAME } from '@/app/constants/config'
import cn from '@/app/utils/cn'

import type { ILogoProps } from './logo.type'
import { logoVariants } from './logo.variant'

const Logo = ({ variant, className }: ILogoProps) => {
  return (
    <p className={cn(logoVariants({ variant }), className)}>
      <span data-slot='logo-icon'>⚛️</span>
      <span data-slot='logo-text'>{SITE_NAME}</span>
    </p>
  )
}

export default Logo
