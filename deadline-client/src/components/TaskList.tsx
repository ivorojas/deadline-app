import React, { useState } from "react"
import { Task } from "./Task"

interface TaskListProps {
  tasks: Task[]
  onStatusChange: (taskId: number, newStatus: Task["status"]) => void
  onDeleteTask: (taskId: number) => void
  onNewTask: () => void
  showAllTasks: boolean
  setShowAllTasks: (show: boolean) => void
  onEditTask: (updatedTask: Task) => void
}

export function TaskList({
  tasks,
  onStatusChange,
  onDeleteTask,
  onNewTask,
  showAllTasks,
  setShowAllTasks,
  onEditTask,
}: TaskListProps) {
  const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null)

  const toggleTaskExpansion = (taskId: number) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId)
  }

  return (
    <div className={`rounded-lg bg-gray-800/50 p-6 ${showAllTasks ? "col-span-full" : ""}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Lista de Tareas</h2>
        <button onClick={onNewTask} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm">
          Nueva Tarea
        </button>
      </div>
      <div
        className={`space-y-3 custom-scrollbar ${
          showAllTasks ? "max-h-[600px] overflow-y-auto" : "max-h-[300px] overflow-y-auto"
        }`}
      >
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            expanded={expandedTaskId === task.id}
            onToggle={() => toggleTaskExpansion(task.id)}
            onStatusChange={(newStatus) => onStatusChange(task.id, newStatus)}
            onDelete={() => onDeleteTask(task.id)}
            onEdit={(updatedTask) => onEditTask(updatedTask)}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => setShowAllTasks(!showAllTasks)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          {showAllTasks ? "Cerrar lista completa" : "Ver todas las tareas"}
        </button>
      </div>
    </div>
  )
}

