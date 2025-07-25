"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  hasFilters: boolean
  isRevealTime: boolean
  onCreatePost: () => void
  onClearFilters: () => void
}

export function EmptyState({ hasFilters, isRevealTime, onCreatePost, onClearFilters }: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">{hasFilters ? "🔍" : "🍽️"}</div>
      <h3 className="text-lg font-medium mb-2">
        {hasFilters ? "조건에 맞는 모임이 없어요" : "아직 점심 모임이 없어요"}
      </h3>
      <p className="text-gray-600 mb-6">
        {hasFilters
          ? "다른 필터를 선택해보세요"
          : isRevealTime
            ? "모집이 마감되었습니다"
            : "첫 번째 모임을 만들어보세요!"}
      </p>
      <div className="flex gap-2 justify-center">
        {hasFilters ? (
          <Button onClick={onClearFilters}>전체 보기</Button>
        ) : (
          !isRevealTime && (
            <Button onClick={onCreatePost}>
              <Plus className="w-4 h-4 mr-2" />
              글쓰기
            </Button>
          )
        )}
      </div>
    </div>
  )
}
