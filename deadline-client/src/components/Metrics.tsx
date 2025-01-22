import React from "react"
import { UserGroupIcon, BriefcaseIcon, ClockIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline"

export function Metrics() {
  return (
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
  )
}

