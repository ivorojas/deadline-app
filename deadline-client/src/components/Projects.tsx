import type React from "react"
import { useState } from "react"
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline"

interface Project {
  id: number
  name: string
  description: string
}

interface ProjectsProps {
  projects: Project[]
  onSelectProject: (projectId: number) => void
  onCreateProject: (name: string, description: string) => void
  onDeleteProject: (id: number) => void
}

export function Projects({ projects, onSelectProject, onCreateProject, onDeleteProject }: ProjectsProps) {
  const [newProject, setNewProject] = useState({ name: "", description: "" })
  const [showNewProjectForm, setShowNewProjectForm] = useState(false)

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault()
    if (newProject.name && newProject.description) {
      onCreateProject(newProject.name, newProject.description)
      setNewProject({ name: "", description: "" })
      setShowNewProjectForm(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Proyectos</h2>
        <button
          onClick={() => setShowNewProjectForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Nuevo Proyecto
        </button>
      </div>

      {showNewProjectForm && (
        <form onSubmit={handleCreateProject} className="mb-6 bg-gray-800 p-4 rounded-md">
          <input
            type="text"
            placeholder="Nombre del proyecto"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            className="w-full mb-2 p-2 bg-gray-700 text-white rounded"
          />
          <input
            type="text"
            placeholder="Descripción del proyecto"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            className="w-full mb-2 p-2 bg-gray-700 text-white rounded"
          />
          <div className="flex justify-end">
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mr-2">
              Crear
            </button>
            <button
              type="button"
              onClick={() => setShowNewProjectForm(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-gray-800 p-4 rounded-md">
            <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
            <p className="text-gray-400 mb-4">{project.description}</p>
            <div className="flex justify-between items-center">
              <button
                onClick={() => onSelectProject(project.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md"
              >
                Ver Proyecto
              </button>
              <button onClick={() => onDeleteProject(project.id)} className="text-red-500 hover:text-red-600">
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

