import type { ReactNode } from 'react'
import { ArrowUpRightIcon, HeartIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

import InstagramIcon from '../../assets/instagram-logo.svg'
import FacebookIcon from '../../assets/facebook-logo.svg'
import TwitterIcon from '../../assets/twitter-logo.svg'
import GitHubIcon from '../../assets/github-logo.svg'
import CapitalizedTitle from '../Text/CapitalizedTitle'

interface LinkSubsectionProps {
  title: string
  links: {
    href: string
    text: ReactNode
  }[]
}

const LinkSubsection = ({ title, links }: LinkSubsectionProps) => {
  return (
    <div className="w-1/6">
      <h3 className="text-xl">{title}</h3>
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
  const icon: string = {
    instagram: InstagramIcon as string,
    facebook: FacebookIcon as string,
    twitter: TwitterIcon as string,
    github: GitHubIcon as string,
  }[type]

  const displayText = type.charAt(0).toUpperCase() + type.slice(1)

  return (
    <span className="flex">
      <Image
        className="mr-2 w-5 hover:text-inherit"
        src={icon}
        alt={`${type} logo`}
      />
      {displayText}
    </span>
  )
}

export const Footer = () => (
  <footer>
    <div className="bg-darkTeal p-10 text-white">
      <div className="flex">
        <div className="w-1/2 pl-14">
          <CapitalizedTitle
            center={false}
            xSpacing="space-x-1"
            textSize="text-xl"
            paddingTop="pt-0"
          />

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

    <div className="flex bg-lightBlue py-3 pl-24 text-sm">
      Made with <HeartIcon className="mx-2 w-5" /> by the Hack4Impact UIUC &
      SECS teams!
    </div>
  </footer>
)

export default Footer
