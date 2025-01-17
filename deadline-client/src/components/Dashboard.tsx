import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { Menu } from '@headlessui/react'
import { FiClock } from 'react-icons/fi'
import { 
  ClockIcon, 
  UserGroupIcon, 
  BriefcaseIcon, 
  CurrencyDollarIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline'

// Types
interface Task {
  id: number
  title: string
  status: 'completed' | 'in-progress' | 'high-priority'
}

interface Activity {
  id: number
  user: string
  action: string
  time: string
}

// Sample data
const chartData = [
  { month: 'Jan', value: 4500 },
  { month: 'Feb', value: 1500 },
  { month: 'Mar', value: 2500 },
  { month: 'Apr', value: 3000 },
  { month: 'May', value: 3200 },
  { month: 'Jun', value: 3000 },
  { month: 'Jul', value: 4200 },
  { month: 'Aug', value: 1800 },
  { month: 'Sep', value: 4000 },
  { month: 'Oct', value: 3800 },
  { month: 'Nov', value: 4800 },
  { month: 'Dec', value: 1200 },
]

const tasks: Task[] = [
  { id: 1, title: 'Terminar informe', status: 'completed' },
  { id: 2, title: 'Reunión con el cliente', status: 'in-progress' },
  { id: 3, title: 'Revisar propuesta', status: 'high-priority' },
]

const activities: Activity[] = [
  { id: 1, user: 'Max', action: 'Nueva tarea asignada: Terminar informe.', time: '2:39 pm' },
  { id: 2, user: 'Alex', action: 'Reunión con el cliente programada para mañana.', time: '2:40 pm' },
  { id: 3, user: 'Sarah', action: 'Nuevo mensaje del equipo.', time: '2:41 pm' },
]

export default function Dashboard() {
  const [currentUser] = useState({
    name: 'John Doe',
    avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/d1ebddf2-2c00-40a9-ba8a-309c6963d526-XGTmTI7hS1LFYfsIv66LXo2BnqYtin.png'
  })

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <FiClock className="h-7 w-10 text-indigo-800" aria-hidden="true" />
              <span className="text-xl font-semibold">Deadline</span>
              {/* Mobile menu button */}
              <button className="ml-4 md:hidden rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              {/* Desktop navigation */}
              <div className="hidden md:ml-10 md:flex md:items-baseline md:space-x-4">
                <a href="#" className="bg-gray-800 px-3 py-2 rounded-md text-sm font-medium">dashboard</a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">proyectos</a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">tareas</a>
                <a href="#" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">informes</a>
              </div>
            </div>

            {/* User Menu */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-3 rounded-full bg-gray-800 p-2 hover:bg-gray-700">
                <img src={currentUser.avatar || "/placeholder.svg"} alt="" className="h-8 w-8 rounded-full" />
                <span className="hidden sm:block">{currentUser.name}</span>
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
                    <a href="#" className={`${active ? 'bg-gray-700' : ''} block px-4 py-2 text-sm text-gray-300`}>
                      Cerrar Sesión
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>

          {/* Mobile navigation menu */}
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <a href="#" className="bg-gray-800 block px-3 py-2 rounded-md text-base font-medium">Dashboard</a>
              <a href="#" className="text-gray-300 hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Proyectos</a>
              <a href="#" className="text-gray-300 hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Tareas</a>
              <a href="#" className="text-gray-300 hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Informes</a>
              <a href="#" className="text-gray-300 hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">Configuración</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-4 sm:p-6">
        {/* Metrics */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-blue-500/10 p-6">
            <div className="flex items-center">
              <UserGroupIcon className="h-12 w-12 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-blue-400">Usuarios Activos</p>
                <p className="text-2xl font-semibold sm:text-3xl">1,234</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-green-500/10 p-6">
            <div className="flex items-center">
              <BriefcaseIcon className="h-12 w-12 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-green-400">Proyectos</p>
                <p className="text-2xl font-semibold sm:text-3xl">56</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-yellow-500/10 p-6">
            <div className="flex items-center">
              <ClockIcon className="h-12 w-12 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-yellow-400">Horas Registradas</p>
                <p className="text-2xl font-semibold sm:text-3xl">9,876</p>
              </div>
            </div>
          </div>
          <div className="rounded-lg bg-purple-500/10 p-6">
            <div className="flex items-center">
              <CurrencyDollarIcon className="h-12 w-12 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-purple-400">Ingresos</p>
                <p className="text-2xl font-semibold sm:text-3xl">$123,456</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Lists */}
        <div className="mt-4 sm:mt-6 grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2">
          {/* Chart */}
          <div className="rounded-lg bg-gray-800/50 p-6">
            <h2 className="text-lg font-semibold mb-4">Overview</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="rounded-lg bg-gray-800/50 p-6">
            <h2 className="text-lg font-semibold mb-4">Actividades Recientes</h2>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                      {activity.user[0]}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-gray-300">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Statistics */}
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
            </div>
          </div>

          {/* Todo List */}
          <div className="rounded-lg bg-gray-800/50 p-6">
            <h2 className="text-lg font-semibold mb-4">Lista de Tareas</h2>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center justify-between rounded-lg p-4 ${
                    task.status === 'completed' ? 'bg-green-500/10' :
                    task.status === 'in-progress' ? 'bg-yellow-500/10' :
                    'bg-red-500/10'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {task.status === 'completed' ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    ) : task.status === 'high-priority' ? (
                      <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-yellow-500" />
                    )}
                    <span className="text-sm">{task.title}</span>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full 
                    ${task.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    task.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'}">
                    {task.status === 'completed' ? 'Completada' :
                     task.status === 'in-progress' ? 'En Progreso' :
                     'Alta Prioridad'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

