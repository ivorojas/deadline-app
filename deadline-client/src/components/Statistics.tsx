import React, { useState } from "react"
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline"

interface User {
  id: number
  name: string
  avatar: string
  role: string
}

interface StatisticsProps {
  users: User[]
}

export function Statistics({ users }: StatisticsProps) {
  const [showActiveUsers, setShowActiveUsers] = useState(false)

  return (
    <div className="rounded-lg bg-gray-800/50 p-6">
      <h2 className="text-lg font-semibold mb-4">Estadísticas Clave</h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-400">Horas Trabajadas:</p>
          <p className="text-2xl font-semibold sm:text-3xl">120</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Proyectos Completados:</p>
          <p className="text-2xl font-semibold sm:text-3xl">15</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Estado de Proyectos:</p>
          <p className="text-2xl font-semibold sm:text-3xl">8 Activos</p>
        </div>
        <div>
          <button
            onClick={() => setShowActiveUsers(!showActiveUsers)}
            className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-400 hover:text-white"
          >
            <span>Usuarios Activos</span>
            {showActiveUsers ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
          </button>
          {showActiveUsers && (
            <div className="mt-2 space-y-2">
              {users.map((user) => (
                <div key={user.id} className="flex items-center space-x-2">
                  <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="h-8 w-8 rounded-full" />
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.role}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

