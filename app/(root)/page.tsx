import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {

  const query = (await searchParams).query;
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY })

  return (
    <>
      {/* Special Container */}
      <section className="special-container pattern">
        <h1 className="heading ">Pitch Your Startup,<br />Connect with enterpenur</h1>

        <p className="sub-heading">Submit Ideas, Votes on Pitches, and Get Noticed</p>

        <SearchForm query={query} />
      </section>

      {/* All Starrtup Cards */}
      <section className="section_container">
        <p className="text-2xl font-bold">
          {query ? `Search Result for : ${query}` : "All StartUp"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups found</p>
          )}
        </ul>

      </section>

      {/* SanityLive */}
      <SanityLive />
    </>
  );
}
