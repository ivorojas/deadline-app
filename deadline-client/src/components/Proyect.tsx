import type React from "react"
import { useState } from "react"
import { UserPlusIcon } from "@heroicons/react/24/outline"
import { TaskList } from "./TaskList"
import { Chat } from "./Chat"
import { Statistics } from "./Statistics"
import { Chart } from "./Chart"
import { Metrics } from "./Metrics"

// Types
interface Task {
  id: string
  title: string
  status: "completed" | "in-progress" | "high-priority"
  description: string
  dueDate: string
  assignee: string
  estimatedHours: number
}

interface ProjectType {
  id: number
  name: string
  description: string
  tasks: Task[]
  activities: Activity[]
}

interface Activity {
  id: number
  user: string
  action: string
  time: string
  type: "task" | "message"
}

interface User {
  id: number
  name: string
  avatar: string
  role: string
}

// Sample data
const chartData = [
  { month: "Jan", value: 4500 },
  { month: "Feb", value: 1500 },
  { month: "Mar", value: 2500 },
  { month: "Apr", value: 3000 },
  { month: "May", value: 3200 },
  { month: "Jun", value: 3000 },
  { month: "Jul", value: 4200 },
  { month: "Aug", value: 1800 },
  { month: "Sep", value: 4000 },
  { month: "Oct", value: 3800 },
  { month: "Nov", value: 4800 },
  { month: "Dec", value: 1200 },
]

const users: User[] = [
  { id: 1, name: "John Doe", avatar: "/placeholder.svg", role: "Developer" },
  { id: 2, name: "Jane Smith", avatar: "/placeholder.svg", role: "Designer" },
  { id: 3, name: "Mike Johnson", avatar: "/placeholder.svg", role: "Project Manager" },
  { id: 4, name: "Sarah Williams", avatar: "/placeholder.svg", role: "Marketing Specialist" },
]

interface ProjectProps {
  project: ProjectType
  onUpdateProject: (updatedProject: ProjectType) => void
  currentUser: { name: string }
}

export function Project({ project, onUpdateProject, currentUser }: ProjectProps) {
  const [newMemberEmail, setNewMemberEmail] = useState("")
  const [chatMessage, setChatMessage] = useState("")
  const [showNewTaskModal, setShowNewTaskModal] = useState(false)
  const [expandChat, setExpandChat] = useState(false)
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    status: "in-progress",
    description: "",
    dueDate: "",
    assignee: "",
    estimatedHours: 0,
  })
  const [showAllTasks, setShowAllTasks] = useState(false)

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMemberEmail) {
      const newActivity: Activity = {
        id: project.activities.length + 1,
        user: "Sistema",
        action: `Nuevo miembro añadido: ${newMemberEmail}`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "task",
      }
      onUpdateProject({
        ...project,
        activities: [...project.activities, newActivity],
      })
      setNewMemberEmail("")
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (chatMessage) {
      const newActivity: Activity = {
        id: project.activities.length + 1,
        user: currentUser.name,
        action: chatMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "message",
      }
      onUpdateProject({
        ...project,
        activities: [...project.activities, newActivity],
      })
      setChatMessage("")
    }
  }

  const handleStatusChange = (taskId: string, newStatus: Task["status"]) => {
    const updatedTasks = project.tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
    const updatedTask = updatedTasks.find((task) => task.id === taskId)
    if (updatedTask) {
      const newActivity: Activity = {
        id: project.activities.length + 1,
        user: currentUser.name,
        action: `actualizó el estado de la tarea "${updatedTask.title}" a ${newStatus}`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "task",
      }
      onUpdateProject({
        ...project,
        tasks: updatedTasks,
        activities: [...project.activities, newActivity],
      })
    }
  }

  const handleDeleteTask = (taskId: string) => {
    const taskToDelete = project.tasks.find((task) => task.id === taskId)
    if (taskToDelete) {
      const updatedTasks = project.tasks.filter((task) => task.id !== taskId)
      const newActivity: Activity = {
        id: project.activities.length + 1,
        user: currentUser.name,
        action: `eliminó la tarea "${taskToDelete.title}" - Estado: ${taskToDelete.status}, Descripción: ${taskToDelete.description}, Fecha de vencimiento: ${taskToDelete.dueDate}, Asignado a: ${taskToDelete.assignee}, Horas estimadas: ${taskToDelete.estimatedHours}`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "task",
      }
      onUpdateProject({
        ...project,
        tasks: updatedTasks,
        activities: [...project.activities, newActivity],
      })
    }
  }

  const handleNewTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const taskToAdd: Task = {
      id: Date.now().toString(),
      ...(newTask as Task),
    }
    const newActivity: Activity = {
      id: project.activities.length + 1,
      user: currentUser.name,
      action: `creó la tarea "${taskToAdd.title}" - Estado: ${taskToAdd.status}, Descripción: ${taskToAdd.description}, Fecha de vencimiento: ${taskToAdd.dueDate}, Asignado a: ${taskToAdd.assignee}, Horas estimadas: ${taskToAdd.estimatedHours}`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "task",
    }
    onUpdateProject({
      ...project,
      tasks: [...project.tasks, taskToAdd],
      activities: [...project.activities, newActivity],
    })
    setNewTask({
      title: "",
      status: "in-progress",
      description: "",
      dueDate: "",
      assignee: "",
      estimatedHours: 0,
    })
    setShowNewTaskModal(false)
  }

  const handleEditTask = (updatedTask: Task) => {
    const oldTask = project.tasks.find((task) => task.id === updatedTask.id)
    const updatedTasks = project.tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))

    const changes = []
    if (oldTask?.title !== updatedTask.title) changes.push(`título: "${oldTask?.title}" a "${updatedTask.title}"`)
    if (oldTask?.status !== updatedTask.status) changes.push(`estado: "${oldTask?.status}" a "${updatedTask.status}"`)
    if (oldTask?.description !== updatedTask.description) changes.push(`descripción actualizada`)
    if (oldTask?.dueDate !== updatedTask.dueDate)
      changes.push(`fecha de vencimiento: "${oldTask?.dueDate}" a "${updatedTask.dueDate}"`)
    if (oldTask?.assignee !== updatedTask.assignee)
      changes.push(`asignado a: "${oldTask?.assignee}" a "${updatedTask.assignee}"`)
    if (oldTask?.estimatedHours !== updatedTask.estimatedHours)
      changes.push(`horas estimadas: ${oldTask?.estimatedHours} a ${updatedTask.estimatedHours}`)

    const newActivity: Activity = {
      id: project.activities.length + 1,
      user: currentUser.name,
      action: `actualizó la tarea "${updatedTask.title}". Cambios: ${changes.join(", ")}`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "task",
    }

    onUpdateProject({
      ...project,
      tasks: updatedTasks,
      activities: [...project.activities, newActivity],
    })
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Project Title and Actions */}
      <div className="bg-gray-800 py-4">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{project.name}</h2>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setNewMemberEmail(newMemberEmail ? "" : " ")}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md text-sm flex items-center"
              >
                <UserPlusIcon className="h-5 w-5 mr-1" />
                {newMemberEmail ? "Cancelar" : "Agregar Miembro"}
              </button>
              {newMemberEmail && (
                <form onSubmit={handleAddMember} className="flex items-center ml-2">
                  <input
                    type="email"
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                    placeholder="Email del nuevo miembro"
                    className="rounded-l-md border-0 bg-gray-700 px-3 py-1.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-r-md text-sm"
                  >
                    Agregar
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-4 sm:p-6">
        <Metrics />

        {/* Two-column layout */}
        <div className="mt-4 sm:mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Left column */}
          <div className="space-y-4 sm:space-y-6">
            <TaskList
              tasks={project.tasks}
              onStatusChange={handleStatusChange}
              onDeleteTask={handleDeleteTask}
              onNewTask={() => setShowNewTaskModal(true)}
              showAllTasks={showAllTasks}
              setShowAllTasks={setShowAllTasks}
              onEditTask={handleEditTask}
            />
            <Statistics users={users} />
          </div>

          {/* Right column */}
          <div className="space-y-4 sm:space-y-6">
            <Chat
              activities={project.activities || []}
              chatMessage={chatMessage}
              setChatMessage={setChatMessage}
              handleSendMessage={handleSendMessage}
              expandChat={expandChat}
              setExpandChat={setExpandChat}
            />
            <Chart data={chartData} />
          </div>
        </div>
      </main>

      {/* New Task Modal */}
      {showNewTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Nueva Tarea</h2>
            <form onSubmit={handleNewTaskSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-400">
                    Título
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-400">
                    Descripción
                  </label>
                  <textarea
                    id="description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                    rows={3}
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-400">
                    Estado
                  </label>
                  <select
                    id="status"
                    value={newTask.status}
                    onChange={(e) => setNewTask({ ...newTask, status: e.target.value as Task["status"] })}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                  >
                    <option value="in-progress">En Progreso</option>
                    <option value="completed">Completada</option>
                    <option value="high-priority">Alta Prioridad</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="dueDate" className="block text-sm font-medium text-gray-400">
                    Fecha de vencimiento
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="assignee" className="block text-sm font-medium text-gray-400">
                    Asignado a
                  </label>
                  <input
                    type="text"
                    id="assignee"
                    value={newTask.assignee}
                    onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label htmlFor="estimatedHours" className="block text-sm font-medium text-gray-400">
                    Horas estimadas
                  </label>
                  <input
                    type="number"
                    id="estimatedHours"
                    value={newTask.estimatedHours}
                    onChange={(e) => setNewTask({ ...newTask, estimatedHours: Number(e.target.value) })}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNewTaskModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Crear Tarea
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

