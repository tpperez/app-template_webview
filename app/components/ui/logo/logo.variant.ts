import { cva } from 'class-variance-authority'

export const logoVariants = cva(
  [
    // base
    'inline-flex shrink-0 items-center gap-3',
    // base icon
    '[&_[data-slot=logo-icon]]:flex [&_[data-slot=logo-icon]]:h-8 [&_[data-slot=logo-icon]]:w-8 [&_[data-slot=logo-icon]]:items-center [&_[data-slot=logo-icon]]:justify-center [&_[data-slot=logo-icon]]:rounded-lg [&_[data-slot=logo-icon]]:text-lg [&_[data-slot=logo-icon]]:grayscale [&_[data-slot=logo-icon]]:filter',
    // base text
    '[&_[data-slot=logo-text]]:text-xl [&_[data-slot=logo-text]]:font-bold',
  ],
  {
    variants: {
      variant: {
        dark: [
          // icon
          '[&_[data-slot=logo-icon]]:bg-gradient-to-r [&_[data-slot=logo-icon]]:from-gray-800 [&_[data-slot=logo-icon]]:to-gray-900',
          // text
          '[&_[data-slot=logo-text]]:text-gray-900',
        ],
        light: [
          // icon
          '[&_[data-slot=logo-icon]]:bg-gradient-to-r [&_[data-slot=logo-icon]]:from-gray-100 [&_[data-slot=logo-icon]]:to-gray-200',
          // text
          '[&_[data-slot=logo-text]]:text-white',
        ],
      },
    },
  },
)
