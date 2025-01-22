import { useState } from "react"
import { CheckCircleIcon, ExclamationCircleIcon, TrashIcon } from "@heroicons/react/24/outline"

interface TaskProps {
  task: Task
  expanded: boolean
  onToggle: () => void
  onStatusChange: (newStatus: Task["status"]) => void
  onDelete: () => void
}

export function Task({ task, expanded, onToggle, onStatusChange, onDelete }: TaskProps) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)

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
              onClick={() => setShowDeleteConfirmation(true)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
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

