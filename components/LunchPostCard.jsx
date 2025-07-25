"use client"

import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { getCategoryIcon } from "../utils/categoryDetector.js"

export function LunchPostCard({ post, onJoin, onCancel, isRevealTime }) {
  // Get anonymous participant name
  const getAnonymousName = (index) => {
    if (index === 0) return "작성자"
    return `익명 ${index}`
  }

  // Get progress percentage
  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100)
  }

  // Check if post is full
  const isPostFull = () => {
    return post.participants.length >= post.targetParticipants
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-sm hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            {getCategoryIcon(post.category)} {post.menuName}
          </CardTitle>
          <div className="flex gap-1">
            <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200">
              {post.category}
            </Badge>
            {isPostFull() && <Badge className="text-xs bg-green-100 text-green-800 border-green-200">완료</Badge>}
          </div>
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

        {/* Anonymous Participants Display */}
        <div className="space-y-1">
          {post.participants.map((_, index) => (
            <div key={index} className="text-xs text-gray-600 flex items-center gap-1">
              <User className="w-3 h-3" />
              {getAnonymousName(index)}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          {!isPostFull() && (
            <Button
              size="sm"
              onClick={() => onJoin(post)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              참가하기
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => onCancel(post)}
            disabled={post.isRevealed || isRevealTime}
            className={`flex-1 transition-colors ${
              post.isRevealed || isRevealTime
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            }`}
          >
            취소
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
