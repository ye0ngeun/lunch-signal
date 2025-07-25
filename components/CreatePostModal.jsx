"use client"

import { useState } from "react"
import { Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { detectCategory, getCategorySuggestions, getCategoryIcon } from "../utils/categoryDetector.js"

export function CreatePostModal({ isOpen, onClose, onSubmit }) {
  const [menuName, setMenuName] = useState("")
  const [authorName, setAuthorName] = useState("")
  const [targetParticipants, setTargetParticipants] = useState("4")
  const [suggestions, setSuggestions] = useState([])

  const handleMenuNameChange = (value) => {
    setMenuName(value)
    const newSuggestions = getCategorySuggestions(value)
    setSuggestions(newSuggestions)
  }

  const handleSubmit = () => {
    if (!menuName.trim() || !authorName.trim()) return

    const category = detectCategory(menuName)

    onSubmit({
      menuName: menuName.trim(),
      authorName: authorName.trim(),
      targetParticipants: Number.parseInt(targetParticipants),
      category,
    })

    // Reset form
    setMenuName("")
    setAuthorName("")
    setTargetParticipants("4")
    setSuggestions([])
  }

  const handleClose = () => {
    onClose()
    // Reset form on close
    setMenuName("")
    setAuthorName("")
    setTargetParticipants("4")
    setSuggestions([])
  }

  const detectedCategory = menuName ? detectCategory(menuName) : null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">새 점심 모임 만들기</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="menu" className="text-sm font-medium">
              메뉴명
            </Label>
            <Input
              id="menu"
              placeholder="예: 김치찌개, 파스타, 초밥..."
              value={menuName}
              onChange={(e) => handleMenuNameChange(e.target.value)}
              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            />

            {/* Category Detection Display */}
            {detectedCategory && (
              <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 p-2 rounded-lg">
                <span>{getCategoryIcon(detectedCategory)}</span>
                <span>카테고리: {detectedCategory}</span>
              </div>
            )}

            {/* Menu Suggestions */}
            {suggestions.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-center gap-1 mb-2">
                  <Lightbulb className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">추천 메뉴</span>
                </div>
                <div className="space-y-1">
                  {suggestions.map((suggestion, index) => (
                    <div key={index} className="text-sm text-blue-700">
                      <span className="mr-1">{suggestion.icon}</span>
                      <span className="font-medium">{suggestion.category}:</span>
                      <span className="ml-1">{suggestion.keywords.join(", ")}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
            disabled={!menuName.trim() || !authorName.trim()}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-all duration-200"
          >
            추가
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
