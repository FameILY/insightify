"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns = [
  {
    accessorKey: "views",
    header: "Views",
  },
  {
    accessorKey: "estimatedMinutesWatched",
    header: "Estimated Minutes Watched",
  },
  {
    accessorKey: "averageViewDuration",
    header: "Average View Duration"
  },
  {
    accessorKey: "averageViewPercentage",
    header: "Average View Percentage"
  },
  {
    accessorKey: "subscribersGained",
    header: "Average View Duration"
  },
]
