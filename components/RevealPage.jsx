"use client"

import { ArrowLeft, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { getCategoryIcon } from "../utils/categoryDetector.js"

export function RevealPage({ posts, onBack, currentTime }) {
  const formatTime = (date) => {
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100)
  }

  const isPostFull = (post) => {
    return post.participants.length >= post.targetParticipants
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={onBack} className="hover:bg-gray-100 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              돌아가기
            </Button>
            <div className="text-sm text-gray-600">{formatTime(currentTime)} | 전체 공개됨</div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">전체 공개 - 점심 모임</h1>
          <p className="text-gray-600">모든 참가자의 실명이 공개됩니다</p>
        </div>

        {/* Revealed Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <Card key={post.id} className="shadow-sm border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    {getCategoryIcon(post.category)} {post.menuName}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                    {isPostFull(post) && (
                      <Badge className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">모집완료</Badge>
                    )}
                  </div>
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
                        <div
                          key={index}
                          className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200"
                        >
                          <User className="w-4 h-4 text-blue-600" />
                          <span className="text-blue-800 font-medium text-sm">{participant}</span>
                          {index === 0 && (
                            <span className="text-xs bg-blue-200 text-blue-800 px-1 rounded">작성자</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">공개할 점심 모임이 없어요</h3>
            <p className="text-gray-600">메인 페이지로 돌아가서 모임을 만들어보세요!</p>
          </div>
        )}
      </div>
    </div>
  )
}
