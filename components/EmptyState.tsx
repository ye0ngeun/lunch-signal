"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  onCreatePost: () => void
}

export function EmptyState({ onCreatePost }: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">🍽️</div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">아직 점심 모임이 없어요</h3>
      <p className="text-gray-600 mb-6">첫 번째 모임을 만들어보세요!</p>
      <Button onClick={onCreatePost} className="bg-blue-600 hover:bg-blue-700 text-white">
        <Plus className="w-4 h-4 mr-2" />
        글쓰기
      </Button>
    </div>
  )
}
