"use client"

import { Plus, Clock, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NotificationBell } from "./NotificationBell"

export function Header({ currentTime, isRevealTime, onReveal, onCreatePost, notificationManager }) {
  const formatTime = (date) => {
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">점심 모임</h1>
          <p className="text-gray-600">함께 점심을 먹을 동료를 찾아보세요</p>
        </div>

        <div className="flex items-center gap-3">
          <NotificationBell notificationManager={notificationManager} />

          <Button
            onClick={onReveal}
            disabled={!isRevealTime}
            className={`${
              isRevealTime
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } transition-all duration-200`}
          >
            <Eye className="w-4 h-4 mr-2" />
            전체 공개
          </Button>

          <Button
            onClick={onCreatePost}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all duration-200"
          >
            <Plus className="w-4 h-4 mr-2" />
            글쓰기
          </Button>
        </div>
      </div>

      {/* Time Display */}
      <div className="flex items-center gap-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>현재 시간: {formatTime(currentTime)}</span>
        </div>
        <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
        <div className={`${isRevealTime ? "text-green-600" : "text-orange-600"}`}>
          {isRevealTime ? "✅ 공개 시간 (12:30 이후)" : "⏰ 공개 시간: 12:30"}
        </div>
      </div>
    </div>
  )
}
