import { MENU_CATEGORIES } from "../types/index.js"

export function detectCategory(menuName) {
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

export function getCategoryIcon(category) {
  return MENU_CATEGORIES[category]?.icon || "🍽️"
}

export function getCategorySuggestions(inputValue) {
  if (!inputValue.trim()) return []

  const suggestions = []
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
