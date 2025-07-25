"use client"

import { useState, useEffect } from "react"
import type { LunchPost } from "@/types"

export function usePosts() {
  const [posts, setPosts] = useState<LunchPost[]>([])

  // Load posts from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("lunchMeetupPosts")
    if (saved) {
      try {
        const parsedPosts = JSON.parse(saved).map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt),
        }))
        setPosts(parsedPosts)
      } catch (error) {
        console.error("Failed to load posts:", error)
      }
    }
  }, [])

  // Save posts to localStorage whenever posts change
  useEffect(() => {
    localStorage.setItem("lunchMeetupPosts", JSON.stringify(posts))
  }, [posts])

  const createPost = (data: { menuName: string; authorName: string; targetParticipants: number }) => {
    const newPost: LunchPost = {
      id: Date.now().toString(),
      menuName: data.menuName,
      authorName: data.authorName,
      targetParticipants: data.targetParticipants,
      participants: [data.authorName],
      createdAt: new Date(),
    }

    setPosts((prev) => [newPost, ...prev])
  }

  const joinPost = (postId: string, name: string) => {
    const post = posts.find((p) => p.id === postId)
    if (!post) {
      return { success: false, error: "모임을 찾을 수 없습니다." }
    }

    if (post.participants.includes(name)) {
      return { success: false, error: "이미 참가한 이름입니다." }
    }

    if (post.participants.length >= post.targetParticipants) {
      return { success: false, error: "이미 모집이 완료되었습니다." }
    }

    setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, participants: [...p.participants, name] } : p)))

    return { success: true }
  }

  const cancelPost = (postId: string, name: string) => {
    const post = posts.find((p) => p.id === postId)
    if (!post) {
      return { success: false, error: "모임을 찾을 수 없습니다." }
    }

    if (!post.participants.includes(name)) {
      return { success: false, error: "참가자 목록에 없는 이름입니다." }
    }

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, participants: p.participants.filter((participant) => participant !== name) } : p,
      ),
    )

    return { success: true }
  }

  return {
    posts,
    createPost,
    joinPost,
    cancelPost,
  }
}
