import Logo from '@/app/components/ui/logo'
import { INavLink } from '@/app/types/nav-link'

import { IFooterData, IFooterSectionLink } from './footer.type'

const Footer = ({ data }: IFooterData) => {
  const { text, sectionLink, copyrightText } = data

  return (
    <footer className='bg-black bg-gradient-to-r py-12 text-white'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'>
        <div className='grid gap-10 md:grid-cols-3'>
          <div>
            <Logo
              variant='light'
              className='mb-4'
            />
            <p className='text-gray-300'>{text}</p>
          </div>

          {sectionLink.map((section: IFooterSectionLink) => {
            return (
              <div key={section.id}>
                <h3 className='mb-4 font-semibold'>{section.title}</h3>

                <ul className='space-y-2 text-gray-300'>
                  {section.links.map((link: INavLink) => {
                    return (
                      <li key={link.id}>
                        <a
                          href={link.href}
                          className='transition-colors hover:text-white'
                        >
                          {link.text}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>

        <div className='mt-10 border-t border-gray-700 pt-8 text-center text-gray-400'>
          {copyrightText}
        </div>
      </div>
    </footer>
  )
}

export default Footer
