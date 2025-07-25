"use client"

import { useState, useEffect } from "react"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { LunchPost } from "@/types"

interface JoinPostModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (name: string) => void
  selectedPost: LunchPost | null
  error: string
  isRevealTime: boolean
}

export function JoinPostModal({ isOpen, onClose, onSubmit, selectedPost, error, isRevealTime }: JoinPostModalProps) {
  const [joinName, setJoinName] = useState("")

  useEffect(() => {
    if (!isOpen) {
      setJoinName("")
    }
  }, [isOpen])

  const handleSubmit = () => {
    if (!joinName.trim()) return
    onSubmit(joinName.trim())
  }

  const handleClose = () => {
    onClose()
    setJoinName("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">점심 모임 참가</DialogTitle>
        </DialogHeader>

        {isRevealTime ? (
          <div className="py-4">
            <div className="text-center p-6 bg-yellow-50 rounded-lg border border-yellow-200">
              <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
              <p className="text-yellow-800 font-medium mb-2">모집이 마감되었습니다</p>
              <p className="text-yellow-700 text-sm">12:30 이후로는 새로운 참가가 불가능합니다.</p>
            </div>
            <div className="flex justify-end pt-4">
              <Button onClick={handleClose}>확인</Button>
            </div>
          </div>
        ) : (
          selectedPost && (
            <div className="space-y-6 py-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-1">🍽️ {selectedPost.menuName}</h3>
                <p className="text-sm text-gray-600">
                  현재 {selectedPost.participants.length}/{selectedPost.targetParticipants}명 참가중
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="joinName" className="text-sm font-medium">
                  이름
                </Label>
                <Input
                  id="joinName"
                  placeholder="이름을 입력하세요"
                  value={joinName}
                  onChange={(e) => setJoinName(e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
                {error && <p className="text-sm text-red-600">{error}</p>}
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1 transition-all duration-200 hover:bg-gray-50 bg-transparent"
                >
                  취소
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!joinName.trim()}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-all duration-200"
                >
                  참가하기
                </Button>
              </div>
            </div>
          )
        )}
      </DialogContent>
    </Dialog>
  )
}
