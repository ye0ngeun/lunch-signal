export class NotificationManager {
  constructor() {
    this.permission = Notification.permission
    this.settings = this.loadSettings()
  }

  loadSettings() {
    try {
      const saved = localStorage.getItem("notificationSettings")
      return saved ? JSON.parse(saved) : { enabled: false }
    } catch {
      return { enabled: false }
    }
  }

  saveSettings(settings) {
    this.settings = settings
    localStorage.setItem("notificationSettings", JSON.stringify(settings))
  }

  async requestPermission() {
    if (this.permission === "default") {
      this.permission = await Notification.requestPermission()
    }
    return this.permission === "granted"
  }

  canSendNotifications() {
    return this.permission === "granted" && this.settings.enabled
  }

  sendNotification(title, options = {}) {
    if (!this.canSendNotifications()) return

    try {
      const notification = new Notification(title, {
        icon: "/favicon.ico",
        badge: "🍽️",
        ...options,
      })

      // Auto close after 5 seconds
      setTimeout(() => notification.close(), 5000)

      return notification
    } catch (error) {
      console.error("Failed to send notification:", error)
    }
  }

  sendGroupCompleteNotification(menuName, current, target) {
    this.sendNotification(`${menuName} 모임이 완료되었습니다! (${current}/${target}명)`, {
      body: "모든 참가자가 모였습니다.",
      tag: "group-complete",
    })
  }

  sendRevealReminderNotification(minutes) {
    this.sendNotification(`${minutes}분 후 전체 공개됩니다!`, {
      body: "곧 모든 참가자의 이름이 공개됩니다.",
      tag: "reveal-reminder",
    })
  }
}
