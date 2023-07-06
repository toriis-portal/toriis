import { HighlightedTitle } from '../../components'
const Letter = () => {
  return (
    <div className="flex flex-col justify-center">
      {/* TODO: fix page centering */}
      <HighlightedTitle
        title="An Open Letter"
        size="large"
        color="clementine"
      />
      <div className="space-y-4 px-60">
        <p>
          Dear Mr. Tim Killeen, Mr. Jim Moore, Mr. Robert Jones, Ms. Susan
          Martinis, and Ms. Madhu Khanna, Mr. Benson, and the University of
          Illinois Board of Trustees,
        </p>
        {/* TODO: double check </p><p> instead of br for accessibility (semantic pause vs visual pause) */}
        <p>
          I. We students of sustainability are writing you to express our
          concerns about Objective 9.1 of the Illinois Climate Action Plan
          (iCAP) 2020. Objective 9.1 assigns Chancellor Jones with the
          responsibility of overseeing the full divestment from fossil fuel
          companies by FY2025. The Office of the Chancellor consulted with the
          iCAP Advisory Teams (formerly, SWATeams) throughout the iCAP 2020
          writing process, and the Office ultimately approved this iCAP goal
          previous to its publication. Despite Chancellor Jones&apos;s
          designation as the “responsible party” of Objective 9.1, we are aware
          that the power to divest lies with the University of Illinois
          Foundation (UIF) and the University of Illinois System (UIS).
          Regardless, because Chancellor Jones agreed to the language in
          Objective 9.1, the Office of the Chancellor maintains the
          responsibility to fulfill this promise. We as students are very
          concerned about the success of divestment. Chancellor Jones&apos;s
          April 15, 2021 letter addressed to Mr. Killeen and Mr. Moore is
          particularly scary: The letter is saturated with vague terminology
          that fails to directly address the topic of divestment – much less
          delineate an action plan. In fact, the letter entirely lacks the word
          “divest.” Chancellor Jones merely requests that Mr. Tim Killeen
          “continue to evaluate investment opportunities and exposures for both
          their financial risk and return along with environmental, social and
          governance factors.” While this statement purports to support
          investment evaluation, it fails to explicitly mention divestment from
          fossil fuels. We find Chancellor Jones&apos;s letter detrimental to
          campus climate action because it poses divestment as an issue that
          ought to be ignored and actively evaded.
        </p>
        <p>
          II. At the University of Illinois Urbana-Champaign, students have
          organized in support of divestment from fossil fuel companies for over
          a decade. UIUC Beyond Coal (eventually absorbed by Students for
          Environmental Concerns) was established in 2009. Seventy-five percent
          of the student body voted in favor of full divestment from fossil
          fuels in 2019. It is the administration&apos;s responsibility to
          listen to student voices, and we have been advocating for divestment
          from fossil fuels for 13 years.
        </p>
        <p>
          III. The first higher education institution to announce fossil fuel
          divestment was a full decade ago. Unity College&apos;s divested
          endowment has grown from $12 million in 2012 to over $18 million
          today. Ten years ago, Unity College set a precedent for universities
          worldwide, ultimately leading to a January 2020 unanimous resolution
          from the Association of Big 10 Students, demanding that all Big 10
          universities divest from fossil fuels. Several Big 10 universities
          subsequently laid out their plans to divest, like the University of
          Michigan, the University of Minnesota system, and Rutgers. Other
          universities across the country have also been working towards
          divestment and ultimately net-zero carbon emissions, including but not
          limited to the Hampshire College, College of the Atlantic, San
          Francisco State University, the University of California system,
          Harvard, and Yale. The University of Illinois claims to be an
          innovator, pioneer, and leader, yet our peers are leaving us in the
          dust. As evidenced by Unity College&apos;s excellence, we are behind
          the curve by ten years. It is embarrassing that we drag our feet in
          climate action while other institutions, including other Big 10
          universities, move ahead with admirable climate initiatives. No longer
          is fossil fuel divestment a radical pursuit; it has already become the
          norm.
        </p>
      </div>
    </div>
  )
}

export default Letter
