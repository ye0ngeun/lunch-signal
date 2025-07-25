"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { LunchPost } from "@/types"

interface CancelModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (name: string) => void
  selectedPost: LunchPost | null
  error: string
}

export function CancelModal({ isOpen, onClose, onSubmit, selectedPost, error }: CancelModalProps) {
  const [cancelName, setCancelName] = useState("")

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setCancelName("")
    }
  }, [isOpen])

  const handleSubmit = () => {
    if (!cancelName.trim()) return
    onSubmit(cancelName.trim())
  }

  const handleClose = () => {
    onClose()
    setCancelName("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">참가 취소</DialogTitle>
        </DialogHeader>
        {selectedPost && (
          <div className="space-y-6 py-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <h3 className="font-medium text-red-900 mb-1">🍽️ {selectedPost.menuName}</h3>
              <p className="text-sm text-red-700">참가를 취소하려면 이름을 입력하세요</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cancelName" className="text-sm font-medium">
                이름 확인
              </Label>
              <Input
                id="cancelName"
                placeholder="참가할 때 입력한 이름"
                value={cancelName}
                onChange={(e) => setCancelName(e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-red-500"
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1 transition-all duration-200 hover:bg-gray-50 bg-transparent"
          >
            닫기
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!cancelName.trim()}
            className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 transition-all duration-200 text-white"
          >
            취소하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
