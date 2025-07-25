"use client"

import { useState, useMemo } from "react"
import type { LunchPost, FilterType, SortType } from "@/types"

export function usePostFilters(posts: LunchPost[]) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all")
  const [sortBy, setSortBy] = useState<SortType>("latest")

  const filteredPosts = useMemo(() => {
    let filtered = [...posts]

    // Apply status filter
    if (activeFilter === "recruiting") {
      filtered = filtered.filter((p) => p.participants.length < p.targetParticipants)
    } else if (activeFilter === "completed") {
      filtered = filtered.filter((p) => p.participants.length >= p.targetParticipants)
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      if (sortBy === "latest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
      if (sortBy === "participants") {
        return b.participants.length - a.participants.length
      }
      if (sortBy === "nearlyFull") {
        const aRatio = a.participants.length / a.targetParticipants
        const bRatio = b.participants.length / b.targetParticipants
        return bRatio - aRatio
      }
      return 0
    })
  }, [posts, activeFilter, sortBy])

  return {
    activeFilter,
    sortBy,
    filteredPosts,
    setActiveFilter,
    setSortBy,
  }
}
