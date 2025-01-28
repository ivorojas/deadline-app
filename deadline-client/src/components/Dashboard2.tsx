import type React from "react"
import { useState, useEffect } from "react"
import { Menu } from "@headlessui/react"
import { UserPlusIcon } from "@heroicons/react/24/outline"
import { TaskList } from "./TaskList"
import { Chat } from "./Chat"
import { Statistics } from "./Statistics"
import { Chart } from "./Chart"
import { Metrics } from "./Metrics"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase-config"; // Configuración de Firebase

// Types
interface Task {
  id: number
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

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Terminar informe",
    status: "completed",
    description: "Completar el informe trimestral de ventas",
    dueDate: "2023-07-15",
    assignee: "John Doe",
    estimatedHours: 8,
  },
  {
    id: 2,
    title: "Reunión con el cliente",
    status: "in-progress",
    description: "Preparar presentación para la reunión con el cliente XYZ",
    dueDate: "2023-07-20",
    assignee: "Jane Smith",
    estimatedHours: 4,
  },
  {
    id: 3,
    title: "Revisar propuesta",
    status: "high-priority",
    description: "Revisar y aprobar la propuesta para el nuevo proyecto",
    dueDate: "2023-07-18",
    assignee: "Mike Johnson",
    estimatedHours: 2,
  },
]

const initialActivities: Activity[] = [
  { id: 1, user: "Max", action: "Nueva tarea asignada: Terminar informe.", time: "2:39 pm", type: "task" },
  { id: 2, user: "Alex", action: "Reunión con el cliente programada para mañana.", time: "2:40 pm", type: "task" },
  { id: 3, user: "Sarah", action: "Hola equipo, ¿cómo va el progreso del informe?", time: "2:41 pm", type: "message" },
  {
    id: 4,
    user: "John",
    action: "Acabo de terminar mi parte, lo subiré en unos minutos.",
    time: "2:43 pm",
    type: "message",
  },
]

const users: User[] = [
  { id: 1, name: "John Doe", avatar: "/placeholder.svg", role: "Developer" },
  { id: 2, name: "Jane Smith", avatar: "/placeholder.svg", role: "Designer" },
  { id: 3, name: "Mike Johnson", avatar: "/placeholder.svg", role: "Project Manager" },
  { id: 4, name: "Sarah Williams", avatar: "/placeholder.svg", role: "Marketing Specialist" },
]

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null); // Define el tipo del estado
  const [loading, setLoading] = useState(true);

  const [newMemberEmail, setNewMemberEmail] = useState("")
  const [chatMessage, setChatMessage] = useState("")
  const [showNewTaskModal, setShowNewTaskModal] = useState(false)
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [activities, setActivities] = useState<Activity[]>(initialActivities)
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
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Usuario autenticado
        setUser({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName
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

  console.log(user)

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMemberEmail) {
      const newActivity: Activity = {
        id: activities.length + 1,
        user: "Sistema",
        action: `Nuevo miembro añadido: ${newMemberEmail}`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "task",
      }
      setActivities([...activities, newActivity])
      setNewMemberEmail("")
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (chatMessage) {
      const newActivity: Activity = {
        id: activities.length + 1,
        user: user.displayName,
        action: chatMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "message",
      }
      setActivities([...activities, newActivity])
      setChatMessage("")
    }
  }

  const handleStatusChange = (taskId: number, newStatus: Task["status"]) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))
    const updatedTask = tasks.find((task) => task.id === taskId)
    if (updatedTask) {
      const newActivity: Activity = {
        id: activities.length + 1,
        user: "Sistema",
        action: `Tarea "${updatedTask.title}" actualizada a estado: ${newStatus}`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "task",
      }
      setActivities([...activities, newActivity])
    }
  }

  const handleDeleteTask = (taskId: number) => {
    const taskToDelete = tasks.find((task) => task.id === taskId)
    if (taskToDelete) {
      setTasks(tasks.filter((task) => task.id !== taskId))
      const newActivity: Activity = {
        id: activities.length + 1,
        user: "Sistema",
        action: `Tarea eliminada: "${taskToDelete.title}" - Estado: ${taskToDelete.status}, Descripción: ${taskToDelete.description}, Fecha de vencimiento: ${taskToDelete.dueDate}, Asignado a: ${taskToDelete.assignee}, Horas estimadas: ${taskToDelete.estimatedHours}`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "task",
      }
      setActivities([...activities, newActivity])
    }
  }

  const handleNewTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const taskToAdd: Task = {
      id: tasks.length + 1,
      ...(newTask as Task),
    }
    setTasks([...tasks, taskToAdd])
    const newActivity: Activity = {
      id: activities.length + 1,
      user: "Sistema",
      action: `Nueva tarea creada: ${taskToAdd.title}`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "task",
    }
    setActivities([...activities, newActivity])
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



  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <span className="text-xl font-semibold">Dashboard</span>
              <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                <button className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Nuevo Proyecto
                </button>
                <a href="#" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Proyectos
                </a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Tareas
                </a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Informes
                </a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Configuración
                </a>
              </div>
            </div>

            {/* User Menu */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-3 rounded-full bg-gray-800 p-2 hover:bg-gray-700">
                
                {/* */}
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold">
                {user.displayName ? user.displayName[0].toUpperCase() : "User"}
    </div>
                <span className="hidden sm:block">{user.displayName}</span>
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-48 rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                <Menu.Item>
                  {({ active }) => (
                    <a href="#" className={`${active ? 'bg-gray-700' : ''} block px-4 py-2 text-sm text-gray-300`}>
                      Tu Perfil
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a href="#" className={`${active ? 'bg-gray-700' : ''} block px-4 py-2 text-sm text-gray-300`}>
                      Configuración
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
                    <a href="#" className={`${active ? 'bg-gray-700' : ''} block px-4 py-2 text-sm text-gray-300`}>
                      Cerrar Sesión
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </nav>

      {/* Project Title and Actions */}
      <div className="bg-gray-800 py-4">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Mi Proyecto</h2>
            </div>
            <div className="flex items-center">
              {!newMemberEmail && (
                <button
                  onClick={() => setNewMemberEmail(" ")}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-md text-sm flex items-center"
                >
                  <UserPlusIcon className="h-5 w-5 mr-1" />
                  Agregar Miembro
                </button>
              )}
              {newMemberEmail !== "" && (
                <form onSubmit={handleAddMember} className="flex items-center">
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

        {/* Charts and Lists */}
        <div className="mt-4 sm:mt-6 grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
        <TaskList
            tasks={tasks}
            onStatusChange={handleStatusChange}
            onDeleteTask={handleDeleteTask}
            onNewTask={() => setShowNewTaskModal(true)}
            showAllTasks={showAllTasks}
            setShowAllTasks={setShowAllTasks}
          />
          <Chat
            activities={activities}
            chatMessage={chatMessage}
            setChatMessage={setChatMessage}
            handleSendMessage={handleSendMessage}
            expandChat={expandChat}
            setExpandChat={setExpandChat}
          />
          <Statistics users={users} />
          <Chart data={chartData} />
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

