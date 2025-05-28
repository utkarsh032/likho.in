import SearchForm from "@/components/SearchForm";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {

  const query = (await searchParams).query

  return (
    <>
      <section className="special-container pattern">
        <h1 className="heading ">Pitch Your Startup,<br />Connect with enterpenur</h1>

        <p className="sub-heading">Submit Ideas, Votes on Pitches, and Get Noticed</p>

        <SearchForm query={query} />
      </section>
    </>
  );
}
