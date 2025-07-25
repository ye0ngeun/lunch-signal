"use client"

import { useRouter } from "next/navigation"
import { Plus, Eye, Filter, ArrowUpDown, Clock, X, AlertCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCurrentTime } from "@/hooks/use-current-time"
import { isRevealTime, formatTime } from "@/lib/time-utils"
import { getFilterCount } from "@/lib/filter-utils"
import type { LunchPost, FilterType, SortType } from "@/types"

interface SidebarProps {
  onCreatePost: () => void
  activeFilter: FilterType
  onFilterChange: (filter: FilterType) => void
  sortBy: SortType
  onSortChange: (sort: SortType) => void
  posts: LunchPost[]
  isMobileOpen: boolean
  onCloseMobile: () => void
  isRevealPage?: boolean
}

export function Sidebar({
  onCreatePost,
  activeFilter,
  onFilterChange,
  sortBy,
  onSortChange,
  posts,
  isMobileOpen,
  onCloseMobile,
  isRevealPage = false,
}: SidebarProps) {
  const router = useRouter()
  const currentTime = useCurrentTime()
  const isReveal = isRevealTime()

  const handleRevealClick = () => {
    router.push("/reveal")
    onCloseMobile()
  }

  const handleBackClick = () => {
    router.push("/")
    onCloseMobile()
  }

  return (
    <>
      {isMobileOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onCloseMobile} />}

      <div
        className={`fixed left-0 top-0 h-full w-80 bg-gray-50 border-r z-50 transform transition-transform duration-300 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">🍽️</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold">점심 모임</h1>
                  <p className="text-xs text-gray-600">함께하는 점심시간</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={onCloseMobile} className="lg:hidden">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Actions */}
            <div className="space-y-3">
              {isRevealPage ? (
                <Button
                  onClick={handleBackClick}
                  className="w-full justify-start bg-gray-600 hover:bg-gray-700 text-white"
                >
                  <ArrowLeft className="w-4 h-4 mr-3" />
                  메인으로 돌아가기
                </Button>
              ) : (
                <Button
                  onClick={handleRevealClick}
                  disabled={!isReveal}
                  className={`w-full justify-start ${
                    isReveal ? "bg-green-600 hover:bg-green-700 text-white" : "bg-gray-300 text-gray-500"
                  }`}
                >
                  <Eye className="w-4 h-4 mr-3" />
                  전체 공개
                  {!isReveal && <span className="ml-auto text-xs">(12:30 이후)</span>}
                </Button>
              )}

              {!isRevealPage && (
                <Button
                  onClick={onCreatePost}
                  disabled={isReveal}
                  className={`w-full justify-start ${
                    isReveal ? "bg-gray-300 text-gray-500" : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  <Plus className="w-4 h-4 mr-3" />
                  글쓰기
                  {isReveal && <span className="ml-auto text-xs">마감됨</span>}
                </Button>
              )}
            </div>

            {isReveal && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-800">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">모집 마감</span>
                </div>
                <p className="text-xs text-yellow-700 mt-1">12:30 이후로 새 모집과 참가/취소가 제한됩니다.</p>
              </div>
            )}

            {/* Status Filters */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <h3 className="text-sm font-semibold">상태 필터</h3>
              </div>
              <div className="space-y-2">
                {[
                  { key: "all" as FilterType, label: "전체", icon: "📋" },
                  { key: "recruiting" as FilterType, label: "모집중", icon: "🔍" },
                  { key: "completed" as FilterType, label: "완료", icon: "✅" },
                ].map(({ key, label, icon }) => (
                  <Button
                    key={key}
                    variant={activeFilter === key ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onFilterChange(key)}
                    className={`w-full justify-between ${
                      activeFilter === key ? "bg-blue-600 hover:bg-blue-700 text-white" : "hover:bg-gray-100"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{icon}</span>
                      {label}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {getFilterCount(posts, key)}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4" />
                정렬
              </h3>
              <Select value={sortBy} onValueChange={onSortChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">📅 최신순</SelectItem>
                  <SelectItem value="participants">👥 참가자순</SelectItem>
                  <SelectItem value="nearlyFull">⏰ 마감임박순</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-white space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>현재: {formatTime(currentTime)}</span>
              </div>
              <div className={`text-xs ${isReveal ? "text-green-600" : "text-orange-600"}`}>
                {isReveal ? "✅ 공개 시간 (12:30 이후)" : "⏰ 공개 시간: 12:30"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
