import type React from "react"
import { useRef, useEffect } from "react"
import { PaperAirplaneIcon, ArrowsPointingOutIcon, ArrowsPointingInIcon } from "@heroicons/react/24/outline"

interface Activity {
  id: number
  user: string
  action: string
  time: string
  type: "task" | "message"
}

interface ChatProps {
  activities: Activity[]
  chatMessage: string
  setChatMessage: (message: string) => void
  handleSendMessage: (e: React.FormEvent) => void
  expandChat: boolean
  setExpandChat: (expand: boolean) => void
}

export function Chat({
  activities,
  chatMessage,
  setChatMessage,
  handleSendMessage,
  expandChat,
  setExpandChat,
}: ChatProps) {
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [activities])

  return (
    <div className={`rounded-lg bg-gray-800/50 p-6 ${expandChat ? "col-span-2 row-span-2" : ""}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Actividades Recientes y Chat</h2>
        <button
          onClick={() => setExpandChat(!expandChat)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm"
        >
          {expandChat ? <ArrowsPointingInIcon className="h-5 w-5" /> : <ArrowsPointingOutIcon className="h-5 w-5" />}
        </button>
      </div>
      <div
        ref={chatRef}
        className={`space-y-4 custom-scrollbar mb-4 ${expandChat ? "h-[600px]" : "h-80"} overflow-y-auto`}
      >
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                {activity.user[0]}
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-300">
                <span className="font-medium">{activity.user}: </span>
                {activity.action}
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
            {activity.type === "task" && (
              <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                Tarea
              </span>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex items-center mt-4">
        <input
          type="text"
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-grow rounded-l-md border-0 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="rounded-r-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <PaperAirplaneIcon className="h-5 w-5" />
        </button>
      </form>
    </div>
  )
}

