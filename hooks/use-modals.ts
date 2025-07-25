"use client"

import { useState } from "react"
import type { LunchPost } from "@/types"

type ModalType = "create" | "join" | "cancel"

interface ModalState {
  isOpen: boolean
  type: ModalType | ""
  error: string
}

export function useModals() {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    type: "",
    error: "",
  })
  const [selectedPost, setSelectedPost] = useState<LunchPost | null>(null)

  const openModal = (type: ModalType, post?: LunchPost) => {
    setSelectedPost(post || null)
    setModalState({
      isOpen: true,
      type,
      error: "",
    })
  }

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: "",
      error: "",
    })
    setSelectedPost(null)
  }

  const setError = (error: string) => {
    setModalState((prev) => ({ ...prev, error }))
  }

  return {
    modalState,
    selectedPost,
    openModal,
    closeModal,
    setError,
  }
}
