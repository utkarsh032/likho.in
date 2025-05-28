import SearchFormReset from "@/components/SearchFormReset"
import { FaSearch } from "react-icons/fa"

export default function SearchForm({ query }: { query?: string }) {

  return (
    <form action='/' className='search-form'>
      <input name="query" defaultValue={query} className="search-input" placeholder="Search Here..." />

      <div className="flex gap-2">
        {query && <SearchFormReset />}

        <button type='submit' className="search-btn text-white">
          <FaSearch />
        </button>

      </div>
    </form>
  )
}
