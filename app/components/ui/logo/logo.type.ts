import { type VariantProps } from 'class-variance-authority'

import { logoVariants } from './logo.variant'

export interface ILogoProps extends VariantProps<typeof logoVariants> {
  variant: 'dark' | 'light'
  className?: string
}
