import type { FC, ReactNode } from 'react'
import { ArrowUpRightIcon, HeartIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

import CapitalizedTitle from '../text/CapitalizedTitle'
import InstagramIcon from '../icon/InstagramIcon'
import FacebookIcon from '../icon/FacebookIcon'
import TwitterIcon from '../icon/TwitterIcon' // TODO: update to X
import GitHubIcon from '../icon/GitHubIcon'

interface LinkSubsectionProps {
  title: string
  links: {
    href: string
    text: ReactNode
  }[]
}

const LinkSubsection = ({ title, links }: LinkSubsectionProps) => {
  return (
    <div className="mb-10 w-full flex-1 text-center lg:text-left">
      <h3 className="text-lg">{title}</h3>
      <div className="mt-8 flex flex-col items-center lg:items-start">
        {links.map(({ href, text }) => (
          <Link
            key={href}
            className="mb-5 w-fit text-sm transition duration-500 hover:text-clementine"
            href={href}
            target="_blank"
          >
            {text}
          </Link>
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

export const Footer: FC = () => (
  <footer>
    <div className="bg-darkTeal p-10 text-white">
      <div className="flex flex-wrap">
        <div className="mb-5 w-full text-center md:mb-0 lg:w-1/2 lg:pl-14 lg:text-left">
          <CapitalizedTitle className="justify-center pr-2 text-sm sm:text-base md:m-0 md:text-base lg:justify-start lg:text-xl" />

          <div className="mb-4">
            <p className="mt-8 text-sm">Can’t find what you are looking for?</p>
            <p className="text-sm">Get in touch!</p>
          </div>

          <Link
            className="bg-red text-clementine"
            href="mailto:info@toriis.earth"
          >
            info@toriis.earth
          </Link>
        </div>

        <div className="flex w-full flex-wrap lg:w-1/2">
          <LinkSubsection
            title="About Our Collaborators"
            links={[
              {
                href: 'https://secsatuiuc.web.illinois.edu',
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
                href: 'https://www.instagram.com/secsuiuc',
                text: <SocialLink type="instagram" />,
              },
              {
                href: 'https://twitter.com/secsuiuc',
                text: <SocialLink type="twitter" />,
              },
              {
                href: 'https://www.facebook.com/SECSUIUC',
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
                href: 'https://www.facebook.com/h4iuiuc/',
                text: <SocialLink type="facebook" />,
              },
            ]}
          />
        </div>
      </div>
    </div>

    <div className="flex bg-lightBlue px-6 py-3 text-sm sm:px-0 md:pl-10 lg:pl-24">
      Made with <HeartIcon className="mx-2 w-5" /> by the Hack4Impact UIUC &
      SECS teams!
    </div>
  </footer>
)

export default Footer
