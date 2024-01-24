import type { FC, ReactNode } from 'react'
import { ArrowUpRightIcon, HeartIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

import CapitalizedTitle from '../text/CapitalizedTitle'
import InstagramIcon from '../icon/InstagramIcon'
import FacebookIcon from '../icon/FacebookIcon'
import XIcon from '../icon/XIcon'
import GitHubIcon from '../icon/GitHubIcon'
import MainIcon from '../icon/MailIcon'
import LinkedInIcon from '../icon/LinkedIn'
import ThreadsIcon from '../icon/ThreadsIcon'

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
    <div className="w-full flex-1 text-center md:mb-10 lg:text-left">
      <h3 className="hidden text-lg md:inline">{title}</h3>
      <div className="mt-4 flex flex-col md:mt-8 md:items-center lg:items-start">
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
    <div className="mt-4 flex items-center">
      {links.map(({ href, socialType }) => (
        <Link
          key={href}
          className="mr-3 w-fit transition duration-500 hover:text-clementine"
          href={href}
          target="_blank"
        >
          <SocialLink type={socialType} displayText={false} />
        </Link>
      ))}
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
  Threads = 'threads',
}

interface SocialLinkProps {
  type: SocialType
  displayText: boolean
}

const SocialLink = ({ type, displayText }: SocialLinkProps) => {
  const icon = {
    instagram: <InstagramIcon className="" />,
    facebook: <FacebookIcon className="" />,
    X: <XIcon className="" />,
    github: <GitHubIcon className="" />,
    mail: <MainIcon className="" />,
    linkedin: <LinkedInIcon className="" />,
    threads: <ThreadsIcon className="" />,
  }

  const textToDisplay = {
    instagram: 'Instagram',
    facebook: 'Facebook',
    X: 'X',
    github: 'GitHub',
    mail: 'info@toriis.earth',
    linkedin: 'Linkedin',
    threads: 'Threads',
  }

  return (
    <span className="group flex items-center">
      {icon[type]}
      {displayText && (
        <span className="ml-2 group-hover:fill-clementine">
          {textToDisplay[type]}
        </span>
      )}
    </span>
  )
}

const FooterMobileHeader: FC<{ text: string }> = ({ text }) => {
  return (
    <p className="mb-2 pb-3 uppercase underline decoration-clementine  underline-offset-[14px]">
      {text}
    </p>
  )
}

export const Footer: FC = () => (
  <footer>
    <div className="bg-darkTeal p-10 text-white">
      <div className="flex flex-wrap">
        <div className="flex-col space-y-8 md:hidden">
          <div>
            <FooterMobileHeader text="Contact Us" />
            <p className="text-sm">Can’t find what you are looking for?</p>
            <p className="text-sm">Get in touch!</p>
            <LinkSubsection
              title="Follow SECS"
              links={[
                {
                  href: 'mailto:info@toriis.earth',
                  text: (
                    <SocialLink type={SocialType.Mail} displayText={true} />
                  ),
                },
              ]}
            />
          </div>
          <div>
            <FooterMobileHeader text="Follow Us" />
            <LinkCondensedList
              links={[
                {
                  href: 'https://github.com/toriis-portal/toriis',
                  socialType: SocialType.Github,
                },
                {
                  href: 'https://www.linkedin.com/company/toriis/',
                  socialType: SocialType.LinkedIn,
                },
                {
                  href: 'https://twitter.com/toriis_earth',
                  socialType: SocialType.X,
                },
                {
                  href: 'https://www.instagram.com/toriis.earth',
                  socialType: SocialType.Instagram,
                },
                {
                  href: 'https://www.threads.net/@toriis.earth',
                  socialType: SocialType.Threads,
                },
              ]}
            />
          </div>
          <div>
            <FooterMobileHeader text="About our collaborators" />
            <span className="mt-4 flex underline underline-offset-4">
              SECS <ArrowUpRightIcon className="ml-1 w-5" />
            </span>
            <LinkCondensedList
              links={[
                {
                  href: 'https://www.instagram.com/toriis.earth', //TODO
                  socialType: SocialType.Instagram,
                },

                {
                  href: 'https://twitter.com/toriis_earth', //TODO
                  socialType: SocialType.X,
                },
                {
                  href: 'https://github.com/toriis-portal/toriis', //TODO
                  socialType: SocialType.Facebook,
                },
              ]}
            />
            <span className="mt-4 flex underline underline-offset-4">
              Hack4Impact UIUC <ArrowUpRightIcon className="ml-1 w-5" />
            </span>
            <LinkCondensedList
              links={[
                {
                  href: 'https://www.instagram.com/toriis.earth', //TODO
                  socialType: SocialType.Instagram,
                },

                {
                  href: 'https://twitter.com/toriis_earth', //TODO
                  socialType: SocialType.Github,
                },
                {
                  href: 'https://github.com/toriis-portal/toriis', //TODO
                  socialType: SocialType.Facebook,
                },
              ]}
            />
          </div>
        </div>
        <div className="hidden md:flex">
          <div className="mb-5 w-full text-center md:mb-0 lg:w-1/2 lg:pl-14 lg:text-left">
            <CapitalizedTitle className="justify-center pr-2 text-sm sm:text-base md:m-0 md:text-base lg:justify-start lg:text-xl" />
            <div className="mb-4">
              <p className="mt-8 text-sm">
                Can’t find what you are looking for?
              </p>
              <p className="text-sm">Get in touch!</p>
            </div>
            <LinkCondensedList
              links={[
                {
                  href: 'mailto:info@toriis.earth',
                  socialType: SocialType.Mail,
                },
                {
                  href: 'https://github.com/toriis-portal/toriis',
                  socialType: SocialType.Github,
                },
                {
                  href: 'https://www.linkedin.com/company/toriis/',
                  socialType: SocialType.LinkedIn,
                },
                {
                  href: 'https://twitter.com/toriis_earth',
                  socialType: SocialType.X,
                },
                {
                  href: 'https://www.instagram.com/toriis.earth',
                  socialType: SocialType.Instagram,
                },
                {
                  href: 'https://www.threads.net/@toriis.earth',
                  socialType: SocialType.Threads,
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
                    <SocialLink
                      type={SocialType.Instagram}
                      displayText={true}
                    />
                  ),
                },
                {
                  href: 'https://twitter.com/secsuiuc',
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
                    <SocialLink
                      type={SocialType.Instagram}
                      displayText={true}
                    />
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
    </div>

    <div className="flex bg-lightBlue px-6 py-3 text-sm sm:px-0 md:pl-10 lg:pl-24">
      Made with <HeartIcon className="mx-2 w-5" /> by the Hack4Impact UIUC &
      SECS teams!
    </div>
  </footer>
)

export default Footer
