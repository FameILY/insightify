"use client";

import { ColumnDef } from "@tanstack/react-table";

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "views",
    header: "Views",
  },
  {
    accessorKey: "estimatedMinutesWatched",
    header: "Estimated minutes watched",
  },
  {
    accessorKey: "averageViewDuration",
    header: "Average view duration",
  },
  {
    accessorKey: "averageViewPercentage",
    header: "Average view percentage",
  },
  {
    accessorKey: "subscribersGained",
    header: "Subscribers Gained",
  },

];
