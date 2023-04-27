import type { FC } from 'react'

import {
  PrimaryNavBar,
  ToTopButton,
  HighlightedTitle,
  SecondaryNavBar,
  ClimateClock,
  CompanyDetailsAccordion,
} from '../../components'
import { ContentWrapper } from '../../utils/content'
import { FinancialCase, InstitutionalDivestments } from '../../sections'
import type { CaseEntry, LinkEntry, ListEntry } from '../../types'

export const getServerSideProps = async () => {
  console.log('help')
  const contentClient = new ContentWrapper()
  const homeEntries = await contentClient.getAllHomePageEntries()
  const LinkEntries = await contentClient.getFossilFuelPageLinks('link', 'Link')
  const FossilFuelEntries = await contentClient.getFossilFuelPageLinks(
    'link',
    'FossilFuelPage',
  )
  const ListEntries = homeEntries['list']
  const caseEntries = await contentClient.get('case')
  return {
    props: {
      caseEntries,
      LinkEntries: LinkEntries,
      FossilFuelEntries: FossilFuelEntries,
      ListEntries: ListEntries,
    },
  }
}

interface FossilFuelProps {
  caseEntries: CaseEntry[]
  ListEntries: ListEntry[]
  FossilFuelEntries: LinkEntry[]
  LinkEntries: LinkEntry[]
}

const FossilFuelPage: FC<FossilFuelProps> = ({
  caseEntries,
  ListEntries,
  FossilFuelEntries,
  LinkEntries,
}) => {
  console.log('hi')
  console.log(LinkEntries)

  const content =
    'A temperature increase of 2 °C by the year 2100 would mean 5 times the floods, storms, drought and heat waves as there are now. This means increased risks of local species extinction, catastrophic biodiversity loss and great detriment to food security. Terrestrial, wetland and ocean ecosystems that serve all life, including humans will experience severe changes to everyday life. Human migration and climate refugee situations are already underway.\n \nIn 2018 the IPCC reported with high confidence that any increase in global temperatures, even by tenths of a degree, will affect human health negatively. They project increased cases of heat-related illness and mortality, malaria, dengue, and undernutrition. Fossil fuel related emissions account for about 65% of the excess mortality rate attributable to air pollution.\nThese risks increase for those living in urban areas as well as impoverished and disadvantaged communities.\n It is vital we put in the effort to bolster environmental justice for groups that are hit by the effects of climate change the hardest.'
  const navItems = [
    { path: 'uofiInvestments', text: 'University of Illinois Investments' },
    { path: 'dirtyIndustry', text: 'The Dirty Industry UIUC Supports' },
    { path: 'whyFossilFuelsAreBad', text: 'Why Are Fossil Fuels Bad' },
    { path: 'warning', text: 'What 1.5C Warning Means' },
    { path: 'financialCase', text: 'The Case For Institutional Divestments' },
    { path: 'divestedSchools', text: 'Schools That Have Divested ' },
    { path: 'divestedInstitutions', text: 'Institutions That Have Divested' },
  ]
  return (
    <>
      <PrimaryNavBar />
      <ToTopButton />
      <div className="flex justify-center">
        <HighlightedTitle
          title="Fossil Fuels"
          size="large"
          color="clementine"
        />
      </div>
      <SecondaryNavBar navItems={navItems} />

      {/* Placeholders for fossil fuel page sections: */}
      <div id="uofiInvestments" className="pt-20"></div>
      <div id="dirtyIndustry" className="pt-20"></div>
      <div id="whyFossilFuelsAreBad" className="pt-20"></div>
      <div id="warning" className="pt-20"></div>

      <div id="financialCase" className="pt-20">
        <FinancialCase entries={caseEntries} />
      </div>

      {/* More placeholders for fossil fuel page sections: */}
      <div id="divestedSchools" className="pt-20"></div>
      <div id="divestedInstitutions" className="pt-20"></div>
      <ClimateClock />
      <div className="my-20 w-full bg-lightClementine p-20">
        <HighlightedTitle
          title="What 1.5 C Warming Means"
          size="medium"
          color="clementine"
        />
        <CompanyDetailsAccordion
          content={content}
          className="bg-white"
        ></CompanyDetailsAccordion>
        <InstitutionalDivestments
          linkEntries={FossilFuelEntries}
          subscriptEntries={LinkEntries}
          listEntries={ListEntries}
          title="Relevant Links"
        />
      </div>
    </>
  )
}

export default FossilFuelPage
