"use client"

import { useState, useEffect } from "react"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { menuName: string; authorName: string; targetParticipants: number }) => void
  isRevealTime: boolean
}

export function CreatePostModal({ isOpen, onClose, onSubmit, isRevealTime }: CreatePostModalProps) {
  const [menuName, setMenuName] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [targetParticipants, setTargetParticipants] = useState("4")

  useEffect(() => {
    if (!isOpen) {
      setMenuName("")
      setAuthorName("")
      setTargetParticipants("4")
    }
  }, [isOpen])

  const handleSubmit = () => {
    if (!menuName.trim() || !authorName.trim()) return

    onSubmit({
      menuName: menuName.trim(),
      authorName: authorName.trim(),
      targetParticipants: Number.parseInt(targetParticipants),
    })

    setMenuName("")
    setAuthorName("")
    setTargetParticipants("4")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">새 점심 모임 만들기</DialogTitle>
        </DialogHeader>

        {isRevealTime ? (
          <div className="py-4">
            <div className="text-center p-6 bg-yellow-50 rounded-lg border border-yellow-200">
              <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
              <p className="text-yellow-800 font-medium mb-2">모집이 마감되었습니다</p>
              <p className="text-yellow-700 text-sm">12:30 이후로는 새로운 모임을 만들 수 없습니다.</p>
            </div>
            <div className="flex justify-end pt-4">
              <Button onClick={onClose}>확인</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="menu" className="text-sm font-medium">
                메뉴명
              </Label>
              <Input
                id="menu"
                placeholder="예: 김치찌개, 파스타, 초밥..."
                value={menuName}
                onChange={(e) => setMenuName(e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author" className="text-sm font-medium">
                이름
              </Label>
              <Input
                id="author"
                placeholder="이름을 입력하세요"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="target" className="text-sm font-medium">
                목표 인원수
              </Label>
              <Select value={targetParticipants} onValueChange={setTargetParticipants}>
                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num}명
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 transition-all duration-200 hover:bg-gray-50 bg-transparent"
              >
                취소
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!menuName.trim() || !authorName.trim()}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-all duration-200"
              >
                추가
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
