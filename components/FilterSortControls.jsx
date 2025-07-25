"use client"

import { Filter, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FILTER_OPTIONS, SORT_OPTIONS, MENU_CATEGORIES } from "../types/index.js"

export function FilterSortControls({
  activeFilter,
  onFilterChange,
  sortBy,
  onSortChange,
  categoryFilter,
  onCategoryFilterChange,
  posts,
}) {
  const getFilterCount = (filter) => {
    if (filter === FILTER_OPTIONS.ALL) return posts.length
    if (filter === FILTER_OPTIONS.RECRUITING) {
      return posts.filter((post) => post.participants.length < post.targetParticipants).length
    }
    if (filter === FILTER_OPTIONS.COMPLETED) {
      return posts.filter((post) => post.participants.length >= post.targetParticipants).length
    }
    return 0
  }

  const getCategoryCount = (category) => {
    if (category === "all") return posts.length
    return posts.filter((post) => post.category === category).length
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
      {/* Status Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex items-center gap-1 mr-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">상태:</span>
        </div>

        {[
          { key: FILTER_OPTIONS.ALL, label: "전체" },
          { key: FILTER_OPTIONS.RECRUITING, label: "모집중" },
          { key: FILTER_OPTIONS.COMPLETED, label: "완료" },
        ].map(({ key, label }) => (
          <Button
            key={key}
            variant={activeFilter === key ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange(key)}
            className={`transition-all duration-200 ${
              activeFilter === key ? "bg-blue-600 hover:bg-blue-700 text-white" : "hover:bg-gray-50"
            }`}
          >
            {label}
            <span className="ml-1 text-xs opacity-75">({getFilterCount(key)})</span>
          </Button>
        ))}
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="flex items-center gap-1 mr-2">
          <span className="text-sm font-medium text-gray-700">카테고리:</span>
        </div>

        <Button
          variant={categoryFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryFilterChange("all")}
          className={`transition-all duration-200 ${
            categoryFilter === "all" ? "bg-green-600 hover:bg-green-700 text-white" : "hover:bg-gray-50"
          }`}
        >
          전체
          <span className="ml-1 text-xs opacity-75">({getCategoryCount("all")})</span>
        </Button>

        {Object.entries(MENU_CATEGORIES).map(([category, data]) => (
          <Button
            key={category}
            variant={categoryFilter === category ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryFilterChange(category)}
            className={`transition-all duration-200 ${
              categoryFilter === category ? "bg-green-600 hover:bg-green-700 text-white" : "hover:bg-gray-50"
            }`}
          >
            <span className="mr-1">{data.icon}</span>
            {category}
            <span className="ml-1 text-xs opacity-75">({getCategoryCount(category)})</span>
          </Button>
        ))}
      </div>

      {/* Sort Controls */}
      <div className="flex items-center gap-2">
        <ArrowUpDown className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">정렬:</span>

        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={SORT_OPTIONS.LATEST}>최신순</SelectItem>
            <SelectItem value={SORT_OPTIONS.PARTICIPANTS}>참가자순</SelectItem>
            <SelectItem value={SORT_OPTIONS.NEARLY_FULL}>마감임박순</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
