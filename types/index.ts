export interface LunchPost {
  id: string
  menuName: string
  authorName: string
  targetParticipants: number
  participants: string[]
  createdAt: Date
}

export type FilterType = "all" | "recruiting" | "completed"
export type SortType = "latest" | "participants" | "nearlyFull"
