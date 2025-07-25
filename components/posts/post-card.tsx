"use client"

import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getProgressPercentage } from "@/lib/math-utils"
import type { LunchPost } from "@/types"

interface PostCardProps {
  post: LunchPost
  onJoinPost: () => void
  onCancelPost: () => void
  isRevealTime: boolean
}

export function PostCard({ post, onJoinPost, onCancelPost, isRevealTime }: PostCardProps) {
  const isPostFull = post.participants.length >= post.targetParticipants

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">🍽️ {post.menuName}</CardTitle>
          {isPostFull && (
            <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">완료</div>
          )}
        </div>
        <p className="text-sm text-gray-600">작성자</p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">참가자</span>
            <span className="font-medium">
              {post.participants.length}/{post.targetParticipants}명
            </span>
          </div>
          <Progress value={getProgressPercentage(post.participants.length, post.targetParticipants)} className="h-2" />
        </div>

        <div className="space-y-1 max-h-20 overflow-y-auto">
          {post.participants.map((_, idx) => (
            <div key={idx} className="text-xs text-gray-600 flex items-center gap-1">
              <User className="w-3 h-3" />
              {idx === 0 ? "작성자" : `익명 ${idx}`}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          {!isPostFull && (
            <Button
              size="sm"
              onClick={onJoinPost}
              disabled={isRevealTime}
              className={`flex-1 ${
                isRevealTime ? "bg-gray-300 text-gray-500" : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isRevealTime ? "마감됨" : "참가하기"}
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onCancelPost}
            disabled={isRevealTime}
            className={`flex-1 ${isRevealTime ? "opacity-50" : "hover:bg-red-50 hover:text-red-600"}`}
          >
            {isRevealTime ? "마감됨" : "취소"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
