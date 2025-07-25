import type { MenuCategory, CategorySuggestion } from "@/types"

export const MENU_CATEGORIES: Record<string, MenuCategory> = {
  한식: {
    icon: "🍚",
    keywords: [
      "김치찌개",
      "된장찌개",
      "비빔밥",
      "불고기",
      "갈비",
      "삼겹살",
      "김치",
      "된장",
      "비빔",
      "한정식",
      "백반",
      "찌개",
      "국밥",
    ],
  },
  중식: {
    icon: "🥢",
    keywords: ["짜장면", "짬뽕", "탕수육", "마파두부", "양장피", "깐풍기", "짜장", "짬뽕", "중국", "중화", "볶음밥"],
  },
  일식: {
    icon: "🍣",
    keywords: ["초밥", "라멘", "돈카츠", "우동", "덮밥", "규동", "스시", "사시미", "일본", "라면", "카츠"],
  },
  양식: {
    icon: "🍝",
    keywords: ["파스타", "피자", "스테이크", "샐러드", "햄버거", "리조또", "스파게티", "피자", "버거", "양식"],
  },
  기타: {
    icon: "🍽️",
    keywords: [],
  },
}

export function detectCategory(menuName: string): string {
  const normalizedMenu = menuName.toLowerCase().trim()

  for (const [category, data] of Object.entries(MENU_CATEGORIES)) {
    if (category === "기타") continue

    const hasKeyword = data.keywords.some((keyword) => normalizedMenu.includes(keyword.toLowerCase()))

    if (hasKeyword) {
      return category
    }
  }

  return "기타"
}

export function getCategoryIcon(category: string): string {
  return MENU_CATEGORIES[category]?.icon || "🍽️"
}

export function getCategorySuggestions(inputValue: string): CategorySuggestion[] {
  if (!inputValue.trim()) return []

  const suggestions: CategorySuggestion[] = []
  const normalizedInput = inputValue.toLowerCase()

  for (const [category, data] of Object.entries(MENU_CATEGORIES)) {
    if (category === "기타") continue

    const matchingKeywords = data.keywords.filter(
      (keyword) => keyword.toLowerCase().includes(normalizedInput) || normalizedInput.includes(keyword.toLowerCase()),
    )

    if (matchingKeywords.length > 0) {
      suggestions.push({
        category,
        icon: data.icon,
        keywords: matchingKeywords.slice(0, 3),
      })
    }
  }

  return suggestions
}
