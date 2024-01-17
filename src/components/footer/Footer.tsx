import type { FC, ReactNode } from 'react'
import { ArrowUpRightIcon, HeartIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

import CapitalizedTitle from '../text/CapitalizedTitle'
import InstagramIcon from '../icon/InstagramIcon'
import FacebookIcon from '../icon/FacebookIcon'
import XIcon from '../icon/XIcon'
import GitHubIcon from '../icon/GitHubIcon'

interface LinkSubsectionProps {
  title: string
  links: {
    href: string
    text: ReactNode
  }[]
}

interface LinkCondensedListProps {
  links: {
    href: string
    socialType: SocialType
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

const LinkCondensedList = ({ links }: LinkCondensedListProps) => {
  return (
    <div className="mb-10 w-full flex-1 text-center lg:text-left">
      <div className="mt-8 flex flex-col items-center lg:items-start">
        {links.map(({ href, socialType }) => (
          <Link
            key={href}
            className="mb-5 w-fit text-sm transition duration-500 hover:text-clementine"
            href={href}
            target="_blank"
          >
            <SocialLink type={socialType} displayText={false} />
          </Link>
        ))}
      </div>
    </div>
  )
}

enum SocialType {
  Instagram = 'instagram',
  Facebook = 'facebook',
  X = 'X',
  Github = 'github',
  Mail = 'mail',
  LinkedIn = 'linkedin',
}

interface SocialLinkProps {
  type: SocialType
  displayText: boolean
}

const SocialLink = ({ type, displayText }: SocialLinkProps) => {
  const icon = {
    instagram: <InstagramIcon className="mr-2" />,
    facebook: <FacebookIcon className="mr-2" />,
    X: <XIcon className="mr-2" />,
    github: <GitHubIcon className="mr-2" />,
    mail: <GitHubIcon className="mr-2" />, // TODO
    linkedin: <GitHubIcon className="mr-2" />, // TODO
  }

  const textToDisplay = {
    instagram: 'Instagram',
    facebook: 'Facebook',
    X: 'X',
    github: 'GitHub',
    mail: 'Mail',
    linkedin: 'Linkedin', // TODO
  }

  console.log(type, displayText)
  return (
    <span className="group flex items-center">
      {icon[type]}
      {displayText && (
        <span className="group-hover:fill-clementine">
          {textToDisplay[type]}
        </span>
      )}
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
          <LinkCondensedList
            links={[
              {
                href: 'mailto:info@toriis.earth',
                socialType: SocialType.Mail,
              },
              {
                href: 'mailto:info@toriis.earth', // TODO
                socialType: SocialType.Github,
              },
              {
                href: 'mailto:info@toriis.earth', // TODO
                socialType: SocialType.LinkedIn,
              },
              {
                href: 'mailto:info@toriis.earth', // TODO
                socialType: SocialType.X,
              },
              {
                href: 'mailto:info@toriis.earth', // TODO
                socialType: SocialType.Instagram,
              },
            ]}
          />
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
                text: (
                  <SocialLink type={SocialType.Instagram} displayText={true} />
                ),
              },
              {
                href: 'https://X.com/secsuiuc',
                text: <SocialLink type={SocialType.X} displayText={true} />,
              },
              {
                href: 'https://www.facebook.com/SECSUIUC',
                text: (
                  <SocialLink type={SocialType.Facebook} displayText={true} />
                ),
              },
            ]}
          />
          <LinkSubsection
            title="Follow Hack4Impact UIUC"
            links={[
              {
                href: 'https://www.instagram.com/hack4impactuiuc/',
                text: (
                  <SocialLink type={SocialType.Instagram} displayText={true} />
                ),
              },
              {
                href: 'https://github.com/hack4impact-uiuc',
                text: (
                  <SocialLink type={SocialType.Github} displayText={true} />
                ),
              },
              {
                href: 'https://www.facebook.com/h4iuiuc/',
                text: (
                  <SocialLink type={SocialType.Facebook} displayText={true} />
                ),
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
