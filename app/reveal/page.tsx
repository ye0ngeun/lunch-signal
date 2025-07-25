"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { RevealPostList } from "@/components/posts/reveal-post-list"
import { EmptyRevealState } from "@/components/posts/empty-reveal-state"
import { usePosts } from "@/hooks/use-posts"
import { usePostFilters } from "@/hooks/use-post-filters"

export default function RevealPage() {
  const { posts } = usePosts()
  const { activeFilter, sortBy, setActiveFilter, setSortBy } = usePostFilters(posts)

  return (
    <AppLayout
      onCreatePost={() => {}}
      activeFilter={activeFilter}
      onFilterChange={setActiveFilter}
      sortBy={sortBy}
      onSortChange={setSortBy}
      posts={posts}
      isRevealPage={true}
    >
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4 hidden lg:block">
          <div>
            <h2 className="text-xl font-semibold">전체 공개</h2>
            <p className="text-sm text-gray-600">모든 참가자의 실명이 공개됩니다</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {posts.length === 0 ? <EmptyRevealState /> : <RevealPostList posts={posts} />}
        </div>
      </div>
    </AppLayout>
  )
}
