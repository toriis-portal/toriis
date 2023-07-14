import { HighlightedTitle, Carousel } from '../../components'

const Signatories = () => {
  return (
    <div>
      <div className="flex justify-center">
        <HighlightedTitle title="Signatories" size="large" color="clementine" />
      </div>
      <Carousel carouselChildren={[]} controlSize="sm" variant="lightBlue" />
    </div>
  )
}

export default Signatories
