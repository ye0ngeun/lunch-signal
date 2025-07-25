"use client"

import { RevealPostCard } from "./reveal-post-card"
import type { LunchPost } from "@/types"

interface RevealPostListProps {
  posts: LunchPost[]
}

export function RevealPostList({ posts }: RevealPostListProps) {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <RevealPostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
