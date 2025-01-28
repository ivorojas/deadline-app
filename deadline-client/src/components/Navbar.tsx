import React from "react"
import { Menu } from "@headlessui/react"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"

interface NavbarProps {
  user: {
    displayName: string
  }
  currentUser: {
    name: string
    avatar: string
  }
  onNavigate: (page: string) => void
  lastOpenedProject: { id: number; name: string } | null
  onReturnToLastProject: () => void
}

export function Navbar({ currentUser, onNavigate, lastOpenedProject, onReturnToLastProject, user }: NavbarProps) {
  return (
    <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-xl font-semibold">Dashboard</span>
            <div className="flex items-center space-x-2">
              {lastOpenedProject && (
                <button
                  onClick={onReturnToLastProject}
                  className="flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  {lastOpenedProject.name}
                </button>
              )}
              <button
                onClick={() => onNavigate("projects")}
                className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Proyectos
              </button>
              <button
                onClick={() => onNavigate("tasks")}
                className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Tareas
              </button>
            </div>
          </div>

          {/* User Menu */}
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-3 rounded-full bg-gray-800 p-2 hover:bg-gray-700">
              <img src={currentUser.avatar || "/placeholder.svg"} alt="" className="h-8 w-8 rounded-full" />
              <span className="hidden sm:block">{user.displayName}</span>
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-48 rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5">
              <Menu.Item>
                {({ active }) => (
                  <a href="#" className={`${active ? "bg-gray-700" : ""} block px-4 py-2 text-sm text-gray-300`}>
                    Tu Perfil
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                  {({ active }) => (
                    <a href="/" className={`${active ? 'bg-gray-700' : ''} block px-4 py-2 text-sm text-gray-300`}>
                      Ir a inicio
                    </a>
                  )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a href="#" className={`${active ? "bg-gray-700" : ""} block px-4 py-2 text-sm text-gray-300`}>
                    Cerrar Sesión
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </nav>
  )
}

