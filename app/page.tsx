"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { PostList } from "@/components/posts/post-list"
import { EmptyState } from "@/components/posts/empty-state"
import { CreatePostModal } from "@/components/modals/create-post-modal"
import { JoinPostModal } from "@/components/modals/join-post-modal"
import { CancelPostModal } from "@/components/modals/cancel-post-modal"
import { usePosts } from "@/hooks/use-posts"
import { usePostFilters } from "@/hooks/use-post-filters"
import { useModals } from "@/hooks/use-modals"
import { isRevealTime } from "@/lib/time-utils"

export default function HomePage() {
  const { posts, createPost, joinPost, cancelPost } = usePosts()
  const { activeFilter, sortBy, filteredPosts, setActiveFilter, setSortBy } = usePostFilters(posts)
  const { modalState, selectedPost, openModal, closeModal } = useModals()

  const handleCreatePost = (data: { menuName: string; authorName: string; targetParticipants: number }) => {
    createPost(data)
    closeModal()
  }

  const handleJoinPost = (name: string) => {
    if (!selectedPost) return
    const result = joinPost(selectedPost.id, name)
    if (result.success) {
      closeModal()
    }
  }

  const handleCancelPost = (name: string) => {
    if (!selectedPost) return
    const result = cancelPost(selectedPost.id, name)
    if (result.success) {
      closeModal()
    }
  }

  return (
    <AppLayout
      onCreatePost={() => openModal("create")}
      activeFilter={activeFilter}
      onFilterChange={setActiveFilter}
      sortBy={sortBy}
      onSortChange={setSortBy}
      posts={posts}
    >
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4 hidden lg:block">
          <div>
            <h2 className="text-xl font-semibold">점심 모임 목록</h2>
            <p className="text-sm text-gray-600">함께 점심을 먹을 동료를 찾아보세요</p>
          </div>
        </div>

        {/* Filter Info */}
        <div className="bg-white border-b px-6 py-3">
          <div className="text-sm text-gray-600">
            {filteredPosts.length === posts.length
              ? `총 ${posts.length}개의 모임`
              : `${filteredPosts.length}개 모임 (전체 ${posts.length}개)`}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredPosts.length === 0 ? (
            <EmptyState
              hasFilters={activeFilter !== "all"}
              isRevealTime={isRevealTime()}
              onCreatePost={() => openModal("create")}
              onClearFilters={() => setActiveFilter("all")}
            />
          ) : (
            <PostList
              posts={filteredPosts}
              onJoinPost={(post) => openModal("join", post)}
              onCancelPost={(post) => openModal("cancel", post)}
              isRevealTime={isRevealTime()}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      <CreatePostModal
        isOpen={modalState.type === "create" && modalState.isOpen}
        onClose={closeModal}
        onSubmit={handleCreatePost}
        isRevealTime={isRevealTime()}
      />

      <JoinPostModal
        isOpen={modalState.type === "join" && modalState.isOpen}
        onClose={closeModal}
        onSubmit={handleJoinPost}
        selectedPost={selectedPost}
        error={modalState.error}
        isRevealTime={isRevealTime()}
      />

      <CancelPostModal
        isOpen={modalState.type === "cancel" && modalState.isOpen}
        onClose={closeModal}
        onSubmit={handleCancelPost}
        selectedPost={selectedPost}
        error={modalState.error}
        isRevealTime={isRevealTime()}
      />
    </AppLayout>
  )
}
