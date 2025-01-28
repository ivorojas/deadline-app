import  { useState, useEffect } from "react"
import { Navbar } from "./Navbar"
import { Projects } from "./Projects"
import { Project } from "./Proyect"
import { AllTasks } from "./AllTasks"

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase-config"; // Configuración de Firebase


interface ProjectType {
  id: number
  name: string
  description: string
  tasks: Task[]
  activities: Activity[]
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

interface Activity {
  id: number
  user: string
  action: string
  time: string
  type: "task" | "project"
}

export default function Dashboard() {
  
    const [user, setUser] = useState<User | null>(null); // Define el tipo del estado
    const [loading, setLoading] = useState(true);
  const [currentUser] = useState({
    name: "John Doe",
    avatar:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d1ebddf2-2c00-40a9-ba8a-309c6963d526-XGTmTI7hS1LFYfsIv66LXo2BnqYtin.png",
  })

  const [currentView, setCurrentView] = useState<"projects" | "project" | "tasks">("projects")
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const [lastOpenedProject, setLastOpenedProject] = useState<ProjectType | null>(null)
  const [projects, setProjects] = useState<ProjectType[]>([
    {
      id: 1,
      name: "Proyecto A",
      description: "Descripción del Proyecto A",
      tasks: [],
      activities: [],
    },
    {
      id: 2,
      name: "Proyecto B",
      description: "Descripción del Proyecto B",
      tasks: [],
      activities: [],
    },
  ])
  const [activities, setActivities] = useState<Activity[]>([])

  const handleNavigate = (page: string) => {
    if (page === "projects" || page === "tasks") {
      setCurrentView(page as "projects" | "tasks")
      setSelectedProjectId(null)
    }
  }

  const handleSelectProject = (projectId: number) => {
    setSelectedProjectId(projectId)
    setCurrentView("project")
    const selectedProject = projects.find((p) => p.id === projectId)
    if (selectedProject) {
      setLastOpenedProject(selectedProject)
    }
  }

  const handleCreateProject = (name: string, description: string) => {
    const newProject: ProjectType = {
      id: projects.length + 1,
      name,
      description,
      tasks: [],
      activities: [],
    }
    setProjects([...projects, newProject])
  }

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter((project) => project.id !== id))
    if (lastOpenedProject && lastOpenedProject.id === id) {
      setLastOpenedProject(null)
    }
  }

  const handleUpdateProject = (updatedProject: ProjectType) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => (project.id === updatedProject.id ? { ...updatedProject } : project)),
    )
    if (lastOpenedProject && lastOpenedProject.id === updatedProject.id) {
      setLastOpenedProject(updatedProject)
    }
  }

  const handleReturnToLastProject = () => {
    if (lastOpenedProject) {
      handleSelectProject(lastOpenedProject.id)
    }
  }

    
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Usuario autenticado
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
        });
      } else {
        // Usuario no autenticado
        setUser(null);
      }
      setLoading(false); // Deja de mostrar el estado de carga
    });

    // Cleanup del listener
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!user) {
    return <p>No estás autenticado. Por favor, inicia sesión.</p>;
  }
  console.log({ user})

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar
        user={user}
        currentUser={currentUser}
        onNavigate={handleNavigate}
        lastOpenedProject={lastOpenedProject}
        onReturnToLastProject={handleReturnToLastProject}
      />
      {currentView === "projects" && (
        <Projects
          projects={projects}
          onSelectProject={handleSelectProject}
          onCreateProject={handleCreateProject}
          onDeleteProject={handleDeleteProject}
        />
      )}
      {currentView === "project" && selectedProjectId && (
        <Project
          project={projects.find((p) => p.id === selectedProjectId)!}
          onUpdateProject={handleUpdateProject}
          currentUser={currentUser}
        />
      )}
      {currentView === "tasks" && (
        <AllTasks
          projects={projects}
          onUpdateProject={handleUpdateProject}
          onNavigateToProject={handleSelectProject}
          currentUser={currentUser}
        />
      )}
    </div>
  )
}

