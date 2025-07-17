"use client"

import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

interface Column {
  key: string
  header: string
  render?: (value: any, row: any) => React.ReactNode
}

interface Action {
  label: string
  onClick: (row: any) => void
  icon?: React.ReactNode
  className?: string
}

interface TableProps {
  columns: Column[]
  data: any[]
  actions?: Action[]
  loading?: boolean
  emptyMessage?: string
}

export function Table({ 
  columns, 
  data, 
  actions, 
  loading = false, 
  emptyMessage = "Tidak ada data yang tersedia" 
}: TableProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-gray-500">{emptyMessage}</div>
      </div>
    )
  }

  return (
    <UITable>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key}>{column.header}</TableHead>
          ))}
          {actions && actions.length > 0 && (
            <TableHead className="w-[100px]">Aksi</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {columns.map((column) => (
              <TableCell key={column.key}>
                {column.render 
                  ? column.render(row[column.key], row)
                  : row[column.key]
                }
              </TableCell>
            ))}
            {actions && actions.length > 0 && (
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {actions.map((action, actionIndex) => (
                      <DropdownMenuItem
                        key={actionIndex}
                        onClick={() => action.onClick(row)}
                        className={action.className}
                      >
                        {action.icon}
                        {action.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </UITable>
  )
}
