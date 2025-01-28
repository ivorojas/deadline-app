import { useState } from "react"
import { CheckCircleIcon, ExclamationCircleIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline"

interface TaskProps {
  task: Task
  expanded: boolean
  onToggle: () => void
  onStatusChange: (newStatus: Task["status"]) => void
  onDelete: () => void
  onEdit: (updatedTask: Task) => void
  projectName?: string
  onProjectClick?: () => void
}

interface Task {
  id: string
  title: string
  status: "completed" | "in-progress" | "high-priority"
  description: string
  dueDate: string
  assignee: string
  estimatedHours: number
}

export function Task({
  task,
  expanded,
  onToggle,
  onStatusChange,
  onDelete,
  onEdit,
  projectName,
  onProjectClick,
}: TaskProps) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState(task)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSaveEdit = () => {
    onEdit(editedTask)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditedTask(task)
    setIsEditing(false)
  }

  return (
    <div
      className={`rounded-lg overflow-hidden ${
        task.status === "completed"
          ? "bg-green-500/10"
          : task.status === "in-progress"
            ? "bg-yellow-500/10"
            : "bg-red-500/10"
      }`}
    >
      <div className="flex items-center justify-between p-4 cursor-pointer" onClick={onToggle}>
        <div className="flex items-center space-x-3">
          {task.status === "completed" ? (
            <CheckCircleIcon className="h-5 w-5 text-green-500" />
          ) : task.status === "high-priority" ? (
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          ) : (
            <div className="h-5 w-5 rounded-full border-2 border-yellow-500" />
          )}
          <span className="text-sm">{task.title}</span>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full 
          ${
            task.status === "completed"
              ? "bg-green-500/20 text-green-400"
              : task.status === "in-progress"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-red-500/20 text-red-400"
          }`}
        >
          {task.status === "completed"
            ? "Completada"
            : task.status === "in-progress"
              ? "En Progreso"
              : "Alta Prioridad"}
        </span>
      </div>
      {expanded && (
        <div className="p-4 border-t border-gray-700">
          {isEditing ? (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSaveEdit()
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400">Título</label>
                  <input
                    type="text"
                    value={editedTask.title}
                    onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Descripción</label>
                  <textarea
                    value={editedTask.description}
                    onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                    rows={3}
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Fecha de vencimiento</label>
                  <input
                    type="date"
                    value={editedTask.dueDate}
                    onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Asignado a</label>
                  <input
                    type="text"
                    value={editedTask.assignee}
                    onChange={(e) => setEditedTask({ ...editedTask, assignee: e.target.value })}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Horas estimadas</label>
                  <input
                    type="number"
                    value={editedTask.estimatedHours}
                    onChange={(e) => setEditedTask({ ...editedTask, estimatedHours: Number(e.target.value) })}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Estado</label>
                  <select
                    value={editedTask.status}
                    onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value as Task["status"] })}
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
                  >
                    <option value="completed">Completada</option>
                    <option value="in-progress">En Progreso</option>
                    <option value="high-priority">Alta Prioridad</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  Cancelar
                </button>
                <button type="submit" className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Guardar
                </button>
              </div>
            </form>
          ) : (
            <>
              {projectName && (
                <p className="mb-2">
                  <strong>Proyecto:</strong>{" "}
                  <button onClick={onProjectClick} className="text-blue-400 hover:underline">
                    {projectName}
                  </button>
                </p>
              )}
              <p>
                <strong>Descripción:</strong> {task.description}
              </p>
              <p>
                <strong>Fecha de vencimiento:</strong> {task.dueDate}
              </p>
              <p>
                <strong>Asignado a:</strong> {task.assignee}
              </p>
              <p>
                <strong>Horas estimadas:</strong> {task.estimatedHours}
              </p>
              <div className="mt-2 flex items-center space-x-2">
                <div className="flex-grow">
                  <label className="block text-sm font-medium text-gray-400 mb-1">Cambiar estado:</label>
                  <select
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-gray-700 text-white"
                    value={task.status}
                    onChange={(e) => onStatusChange(e.target.value as Task["status"])}
                  >
                    <option value="completed">Completada</option>
                    <option value="in-progress">En Progreso</option>
                    <option value="high-priority">Alta Prioridad</option>
                  </select>
                </div>
                <button
                  onClick={handleEdit}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setShowDeleteConfirmation(true)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </>
          )}
        </div>
      )}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">¿Estás seguro de que quieres eliminar esta tarea?</h3>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onDelete()
                  setShowDeleteConfirmation(false)
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

