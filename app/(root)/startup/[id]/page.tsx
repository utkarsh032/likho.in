import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import markdownit from 'markdown-it';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import StartupCard, { StartupTypeCard } from '@/components/StartupCard';

const md = markdownit()

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {

  const id = (await params).id;

  const [post, editorPicksData] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, {
      slug: "editor-picks-new",
    }),
  ]);

  if (!post) return notFound();

  const editorPosts = editorPicksData?.select ?? [];


  const parsedContent = md.render(post?.pitch || "");
  return (
    <>
      {/* Hero Section */}
      <section className="special-container pattern text-center py-12 px-6">
        <p className="tag tag-tri inline-block mb-4">{formatDate(post?._createdAt)}</p>
        <h1 className="heading text-4xl font-bold mb-4">{post.title}</h1>
        <p className="sub-heading text-lg text-gray-600 max-w-3xl mx-auto">{post.description}</p>
      </section>

      {/* Content Section */}
      <section className="section_container">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-auto rounded-xl shadow-md mb-10 object-cover"
        />

        <div className="space-y-6 max-w-4xl mx-auto">
          {/* Author Info + Category */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-3 items-center"
              aria-label={`Visit profile of ${post.author.name}`}
            >
              <Image
                src={post.author.image}
                alt={`${post.author.name}'s avatar`}
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-xl font-semibold">{post.author.name}</p>
                <p className="text-sm text-gray-500">@{post.author.username}</p>
              </div>
            </Link>

            <span className="category-tag">{post.category}</span>
          </div>

          {/* Category as Heading */}
          <h3 className="text-2xl font-bold text-primary-800">{post.category}</h3>

          <h1 className='text-2xl font-bold'>Post Details</h1>

          {
            parsedContent ? (<article className='prose max-w-4xl font-work-sans break-all' dangerouslySetInnerHTML={{ __html: parsedContent }} />) : (<p className="no-results">No Details Provided</p>)
          }
        </div>

        <hr className="divider" />

        {editorPosts?.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold">Editor Picks</p>

            <ul className="mt-7 card_grid-sm">
              {editorPosts.map((post: StartupTypeCard, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}


        {/* ---------- */}
        <Suspense fallback={<Skeleton className='view_skeleton' />}>
          <View id={id} />
        </Suspense>

      </section >
    </>
  );
};

export default Page;
