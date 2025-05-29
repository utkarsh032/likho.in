import Link from 'next/link'

import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from 'next/image';
import { Button } from './ui/button';
import { Author, Startup } from '@/sanity/types';

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author }

export default function StartupCard({ post }: { post: StartupTypeCard }) {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = post;


  console.log(post)

  return (
    <li className="startup-card group">
      <div className="flex justify-between">
        <p className="startup_card_date">
          {formatDate(_createdAt)}
        </p>

        <div className="flex items-center gap-1.5">
          <EyeIcon className="size-6 text-primary-600" />
          <span>{views}</span>
        </div>
      </div>

      <div className='flex justify-between items-center mt-5 gap-5'>
        <div className='flex-1'>
          <Link href={`/user/${author?._id}`}>
            <p className='text-sm text-muted-foreground'>{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <p className='text-lg font-semibold hover:underline'>{title}</p>
          </Link>
        </div>

        <Link href={`/user/${author?._id}`}>
          <Image
            src='https://placehold.co/48*48'
            alt='placehold'
            width={48}
            height={48}
            className='rounded-full'
          />
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className='startup-card_desc'>{description}</p>
        <img src={image} alt={title} className='startup-card_img' />
      </Link>

      <div className='flex justify-between gap-3 mt-5'>
        <Link href={`/?query=${category.toLowerCase()}`}>
          <p className='font-medium'>{category}</p>
        </Link>

        <Button className='startup-card_btn' asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>

      </div>

    </li>
  )
}
