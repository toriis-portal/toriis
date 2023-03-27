import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import type { FC } from 'react'

interface SearchBarProps {
  setCompanySearchQuery: (query: string) => void
}

const SearchBar: FC<SearchBarProps> = ({ setCompanySearchQuery }) => {
  return (
    <>
      <form
        className="w-full px-56"
        onSubmit={(e: React.SyntheticEvent) => {
          e.preventDefault()
          const target = e.target as typeof e.target & {
            company_name: { value: string }
          }
          const input: string = target.company_name.value
          setCompanySearchQuery(input.toUpperCase())
        }}
      >
        <label htmlFor="company_name">
          <div className="flex flex-row items-center">
            <MagnifyingGlassIcon className="absolute h-6 stroke-current stroke-1 pl-4 text-darkGray	" />
            <input
              type="text"
              id="company_name"
              name="company_name"
              placeholder="Search by Company Name"
              className="grow rounded pl-14"
            />
            <button
              type="submit"
              className="underline-offset-6 ml-6 flex items-center justify-center rounded-full bg-black px-6 text-white underline"
            >
              Search
            </button>
          </div>
        </label>
      </form>
    </>
  )
}

export default SearchBar
