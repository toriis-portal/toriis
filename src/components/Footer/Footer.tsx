import type { ReactNode } from 'react'
import { ArrowUpRightIcon, HeartIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

import CapitalizedTitle from '../Text/CapitalizedTitle'
import InstagramIcon from '../Icon/InstagramIcon'
import FacebookIcon from '../Icon/FacebookIcon'
import TwitterIcon from '../Icon/TwitterIcon'
import GitHubIcon from '../Icon/GitHubIcon'

interface LinkSubsectionProps {
  title: string
  links: {
    href: string
    text: ReactNode
  }[]
}

const LinkSubsection = ({ title, links }: LinkSubsectionProps) => {
  return (
    <div className="w-1/3">
      <h3 className="text-lg">{title}</h3>
      <div className="mt-8 flex flex-col">
        {links.map(({ href, text }) => (
          <a
            key={href}
            className="mb-5 w-fit text-sm transition duration-500 hover:text-clementine"
            href={href}
          >
            {text}
          </a>
        ))}
      </div>
    </div>
  )
}

interface SocialLinkProps {
  type: 'instagram' | 'facebook' | 'twitter' | 'github'
}

const SocialLink = ({ type }: SocialLinkProps) => {
  const icon = {
    instagram: <InstagramIcon className="mr-2" />,
    facebook: <FacebookIcon className="mr-2" />,
    twitter: <TwitterIcon className="mr-2" />,
    github: <GitHubIcon className="mr-2" />,
  }

  const displayText = {
    instagram: 'Instagram',
    facebook: 'Facebook',
    twitter: 'Twitter',
    github: 'GitHub',
  }

  return (
    <span className="group flex items-center">
      {icon[type]}
      <span className="group-hover:fill-clementine">{displayText[type]}</span>
    </span>
  )
}

export const Footer = () => (
  <footer>
    <div className="bg-darkTeal p-10 text-white">
      <div className="flex flex-wrap">
        <div className="w-1/2 pl-14">
          <CapitalizedTitle className="text-xl" />

          <div className="mb-4">
            <p className="mt-8 text-sm">Can’t find what you are looking for?</p>
            <p className="text-sm">Contact us through email to get in touch!</p>
          </div>

          <a
            className="bg-red text-clementine"
            href="mailto:uiuc.secs@gmail.com"
          >
            uiuc.secs@gmail.com
          </a>
        </div>

        <div className="flex w-1/2">
          <LinkSubsection
            title="About us"
            links={[
              {
                href: 'https://www.secsillinois.org/',
                text: (
                  <span className="flex underline underline-offset-4">
                    SECS <ArrowUpRightIcon className="ml-1 w-5" />
                  </span>
                ),
              },
              {
                href: 'https://uiuc.hack4impact.org/',
                text: (
                  <span className="flex underline underline-offset-4">
                    Hack4Impact UIUC <ArrowUpRightIcon className="ml-1 w-5" />
                  </span>
                ),
              },
            ]}
          />
          <LinkSubsection
            title="Follow SECS"
            links={[
              {
                href: 'https://www.instagram.com/secsillinois/',
                text: <SocialLink type="instagram" />,
              },
              {
                href: 'https://twitter.com/SECSillinois',
                text: <SocialLink type="twitter" />,
              },
              {
                href: 'https://www.facebook.com/SECSillinois',
                text: <SocialLink type="facebook" />,
              },
            ]}
          />
          <LinkSubsection
            title="Follow Hack4Impact UIUC"
            links={[
              {
                href: 'https://www.instagram.com/hack4impactuiuc/',
                text: <SocialLink type="instagram" />,
              },
              {
                href: 'https://github.com/hack4impact-uiuc',
                text: <SocialLink type="github" />,
              },
              {
                href: 'https://www.facebook.com/hack4impact',
                text: <SocialLink type="facebook" />,
              },
            ]}
          />
        </div>
      </div>
    </div>

    <div className="flex bg-lightBlue py-3 pl-24 text-sm">
      Made with <HeartIcon className="mx-2 w-5" /> by the Hack4Impact UIUC &
      SECS teams!
    </div>
  </footer>
)

export default Footer
