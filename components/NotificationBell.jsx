"use client"

import { useState, useEffect } from "react"
import { Bell, BellOff, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function NotificationBell({ notificationManager }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [settings, setSettings] = useState(notificationManager.settings)
  const [permission, setPermission] = useState(notificationManager.permission)

  useEffect(() => {
    setSettings(notificationManager.settings)
    setPermission(notificationManager.permission)
  }, [notificationManager])

  const handleToggleNotifications = async (enabled) => {
    if (enabled && permission !== "granted") {
      const granted = await notificationManager.requestPermission()
      if (!granted) {
        return
      }
      setPermission("granted")
    }

    const newSettings = { ...settings, enabled }
    setSettings(newSettings)
    notificationManager.saveSettings(newSettings)
  }

  const getNotificationStatus = () => {
    if (permission === "denied") return "blocked"
    if (permission === "granted" && settings.enabled) return "enabled"
    return "disabled"
  }

  const status = getNotificationStatus()

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsSettingsOpen(true)}
        className="relative hover:bg-gray-100 transition-colors"
      >
        {status === "enabled" ? (
          <Bell className="w-4 h-4 text-blue-600" />
        ) : status === "blocked" ? (
          <BellOff className="w-4 h-4 text-red-500" />
        ) : (
          <Bell className="w-4 h-4 text-gray-400" />
        )}

        {status === "enabled" && <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></div>}
      </Button>

      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              알림 설정
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">브라우저 알림</Label>
                <p className="text-xs text-gray-600">모임 완료 및 공개 시간 알림을 받습니다</p>
              </div>
              <Switch
                checked={settings.enabled && permission === "granted"}
                onCheckedChange={handleToggleNotifications}
                disabled={permission === "denied"}
              />
            </div>

            {permission === "denied" && (
              <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm text-red-800">
                  브라우저에서 알림이 차단되었습니다. 브라우저 설정에서 알림을 허용해주세요.
                </p>
              </div>
            )}

            {settings.enabled && permission === "granted" && (
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">✅ 알림이 활성화되었습니다</p>
                <ul className="text-xs text-blue-700 mt-2 space-y-1">
                  <li>• 모임 완료 시 알림</li>
                  <li>• 공개 10분/5분 전 알림</li>
                </ul>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={() => setIsSettingsOpen(false)} className="bg-blue-600 hover:bg-blue-700 text-white">
              확인
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
