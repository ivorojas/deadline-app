import React, { useState } from "react"
import { Task } from "./Task"

interface ProjectType {
  id: number
  name: string
  description: string
  tasks: Task[]
}

interface AllTasksProps {
  projects: ProjectType[]
  onUpdateProject: (updatedProject: ProjectType) => void
  onNavigateToProject: (projectId: number) => void
  currentUser: { name: string }
}

export function AllTasks({ projects, onUpdateProject, onNavigateToProject, currentUser }: AllTasksProps) {
  const [expandedTaskIds, setExpandedTaskIds] = useState<Set<string>>(new Set())

  const toggleTaskExpansion = (taskId: string) => {
    setExpandedTaskIds((prevIds) => {
      const newIds = new Set(prevIds)
      if (newIds.has(taskId)) {
        newIds.delete(taskId)
      } else {
        newIds.add(taskId)
      }
      return newIds
    })
  }

  const handleStatusChange = (projectId: number, taskId: string, newStatus: Task["status"]) => {
    const updatedProjects = projects.map((project) => {
      if (project.id === projectId) {
        const updatedTasks = project.tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
        return { ...project, tasks: updatedTasks }
      }
      return project
    })
    const updatedProject = updatedProjects.find((p) => p.id === projectId)
    if (updatedProject) {
      onUpdateProject(updatedProject)
    }
  }

  const handleDeleteTask = (projectId: number, taskId: string) => {
    const updatedProjects = projects.map((project) => {
      if (project.id === projectId) {
        const deletedTask = project.tasks.find((task) => task.id === taskId)
        const updatedTasks = project.tasks.filter((task) => task.id !== taskId)
        if (deletedTask) {
          project.activities = [
            ...project.activities,
            {
              id: Date.now(),
              user: currentUser.name,
              action: `eliminó la tarea "${deletedTask.title}" - Estado: ${deletedTask.status}, Descripción: ${deletedTask.description}, Fecha de vencimiento: ${deletedTask.dueDate}, Asignado a: ${deletedTask.assignee}, Horas estimadas: ${deletedTask.estimatedHours}`,
              time: new Date().toLocaleTimeString(),
              type: "task",
            },
          ]
        }
        return { ...project, tasks: updatedTasks }
      }
      return project
    })
    const updatedProject = updatedProjects.find((p) => p.id === projectId)
    if (updatedProject) {
      onUpdateProject(updatedProject)
    }
  }

  const handleEditTask = (projectId: number, updatedTask: Task) => {
    const updatedProjects = projects.map((project) => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.map((task) => (task.id === updatedTask.id ? { ...updatedTask } : task)),
        }
      }
      return project
    })
    const updatedProject = updatedProjects.find((p) => p.id === projectId)
    if (updatedProject) {
      onUpdateProject(updatedProject)
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Todas las Tareas</h2>
      {projects.map((project) => (
        <div key={project.id} className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{project.name}</h3>
          <div className="space-y-4">
            {project.tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                expanded={expandedTaskIds.has(task.id)}
                onToggle={() => toggleTaskExpansion(task.id)}
                onStatusChange={(newStatus) => handleStatusChange(project.id, task.id, newStatus)}
                onDelete={() => handleDeleteTask(project.id, task.id)}
                onEdit={(updatedTask) => handleEditTask(project.id, updatedTask)}
                projectName={project.name}
                onProjectClick={() => onNavigateToProject(project.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

