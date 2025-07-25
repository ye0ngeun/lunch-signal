"use client"

import type React from "react"
import { useState } from "react"
import { Sidebar } from "./sidebar"
import { MobileHeader } from "./mobile-header"
import type { LunchPost, FilterType, SortType } from "@/types"

interface AppLayoutProps {
  children: React.ReactNode
  onCreatePost: () => void
  activeFilter: FilterType
  onFilterChange: (filter: FilterType) => void
  sortBy: SortType
  onSortChange: (sort: SortType) => void
  posts: LunchPost[]
  isRevealPage?: boolean
}

export function AppLayout({
  children,
  onCreatePost,
  activeFilter,
  onFilterChange,
  sortBy,
  onSortChange,
  posts,
  isRevealPage = false,
}: AppLayoutProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        onCreatePost={onCreatePost}
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
        sortBy={sortBy}
        onSortChange={onSortChange}
        posts={posts}
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
        isRevealPage={isRevealPage}
      />

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <MobileHeader onToggleMobile={() => setIsMobileOpen(!isMobileOpen)} isRevealPage={isRevealPage} />
        {children}
      </div>
    </div>
  )
}
