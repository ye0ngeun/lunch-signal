"use client"

import { PostCard } from "./post-card"
import type { LunchPost } from "@/types"

interface PostListProps {
  posts: LunchPost[]
  onJoinPost: (post: LunchPost) => void
  onCancelPost: (post: LunchPost) => void
  isRevealTime: boolean
}

export function PostList({ posts, onJoinPost, onCancelPost, isRevealTime }: PostListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onJoinPost={() => onJoinPost(post)}
          onCancelPost={() => onCancelPost(post)}
          isRevealTime={isRevealTime}
        />
      ))}
    </div>
  )
}
