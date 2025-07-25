import type { LunchPost, FilterType } from "@/types"

export function getFilterCount(posts: LunchPost[], filter: FilterType): number {
  if (filter === "all") return posts.length
  if (filter === "recruiting") {
    return posts.filter((post) => post.participants.length < post.targetParticipants).length
  }
  if (filter === "completed") {
    return posts.filter((post) => post.participants.length >= post.targetParticipants).length
  }
  return 0
}
