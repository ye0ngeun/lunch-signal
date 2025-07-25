"use client"

import { User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getProgressPercentage } from "@/lib/math-utils"
import type { LunchPost } from "@/types"

interface RevealPostCardProps {
  post: LunchPost
}

export function RevealPostCard({ post }: RevealPostCardProps) {
  const isPostFull = post.participants.length >= post.targetParticipants

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-xl">🍽️ {post.menuName}</CardTitle>
          {isPostFull && (
            <div className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">모집완료</div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">
              참가자 ({post.participants.length}/{post.targetParticipants}명)
            </span>
            <Progress
              value={getProgressPercentage(post.participants.length, post.targetParticipants)}
              className="w-32 h-2"
            />
          </div>

          {post.participants.length === 1 ? (
            <div className="text-center py-8 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="text-4xl mb-2">😢</div>
              <p className="text-yellow-800 font-medium">{post.participants[0]}님이 혼자 참가하셨네요...</p>
              <p className="text-yellow-700 text-sm mt-1">다음엔 더 많은 분들과 함께해요!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {post.participants.map((participant, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <User className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-800 font-medium text-sm">{participant}</span>
                  {index === 0 && <span className="text-xs bg-blue-200 text-blue-800 px-1 rounded">작성자</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
