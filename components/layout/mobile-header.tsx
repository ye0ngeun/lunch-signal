"use client"

import { useRouter } from "next/navigation"
import { Menu, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileHeaderProps {
  onToggleMobile: () => void
  isRevealPage?: boolean
}

export function MobileHeader({ onToggleMobile, isRevealPage = false }: MobileHeaderProps) {
  const router = useRouter()

  const handleBackClick = () => {
    router.push("/")
  }

  return (
    <div className="bg-white border-b px-6 py-4 lg:hidden">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onToggleMobile}>
          <Menu className="w-4 h-4" />
        </Button>
        {isRevealPage ? (
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={handleBackClick}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              돌아가기
            </Button>
            <div>
              <h2 className="text-xl font-semibold">전체 공개</h2>
              <p className="text-sm text-gray-600">모든 참가자의 실명이 공개됩니다</p>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold">점심 모임 목록</h2>
            <p className="text-sm text-gray-600">함께 점심을 먹을 동료를 찾아보세요</p>
          </div>
        )}
      </div>
    </div>
  )
}
