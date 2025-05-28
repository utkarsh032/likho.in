import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {

  const query = (await searchParams).query;

  const posts = [
    {
      _id: 1,
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1, name: "Andrian" },
      description: "This is a Description",
      image: "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2UlMjByb2JvdHxlbnwwfHwwfHx8MA%3D%3D",
      category: "Robots",
      title: "We Robots"
    }
  ]
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
    </>
  );
}
