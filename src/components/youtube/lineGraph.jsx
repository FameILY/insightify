"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An interactive line chart"

// const chartData = [
//   { date: "2024-04-01", averageViewDuration: 222, averageViewPercentage: 150 },
//   { date: "2024-04-02", averageViewDuration: 97, averageViewPercentage: 180 },
//   { date: "2024-04-03", averageViewDuration: 167, averageViewPercentage: 120 },
//   { date: "2024-04-04", averageViewDuration: 242, averageViewPercentage: 260 },
//   { date: "2024-04-05", averageViewDuration: 373, averageViewPercentage: 290 },
//   { date: "2024-04-06", averageViewDuration: 301, averageViewPercentage: 340 },
//   { date: "2024-04-07", averageViewDuration: 245, averageViewPercentage: 180 },
//   { date: "2024-04-08", averageViewDuration: 409, averageViewPercentage: 320 },
//   { date: "2024-04-09", averageViewDuration: 59, averageViewPercentage: 110 },
//   { date: "2024-04-10", averageViewDuration: 261, averageViewPercentage: 190 },
//   { date: "2024-04-11", averageViewDuration: 327, averageViewPercentage: 350 },
//   { date: "2024-04-12", averageViewDuration: 292, averageViewPercentage: 210 },
//   { date: "2024-04-13", averageViewDuration: 342, averageViewPercentage: 380 },
//   { date: "2024-04-14", averageViewDuration: 137, averageViewPercentage: 220 },
//   { date: "2024-04-15", averageViewDuration: 120, averageViewPercentage: 170 },
//   { date: "2024-04-16", averageViewDuration: 138, averageViewPercentage: 190 },
//   { date: "2024-04-17", averageViewDuration: 446, averageViewPercentage: 360 },
//   { date: "2024-04-18", averageViewDuration: 364, averageViewPercentage: 410 },
//   { date: "2024-04-19", averageViewDuration: 243, averageViewPercentage: 180 },
//   { date: "2024-04-20", averageViewDuration: 89, averageViewPercentage: 150 },
//   { date: "2024-04-21", averageViewDuration: 137, averageViewPercentage: 200 },
//   { date: "2024-04-22", averageViewDuration: 224, averageViewPercentage: 170 },
//   { date: "2024-04-23", averageViewDuration: 138, averageViewPercentage: 230 },
//   { date: "2024-04-24", averageViewDuration: 387, averageViewPercentage: 290 },
//   { date: "2024-04-25", averageViewDuration: 215, averageViewPercentage: 250 },
//   { date: "2024-04-26", averageViewDuration: 75, averageViewPercentage: 130 },
//   { date: "2024-04-27", averageViewDuration: 383, averageViewPercentage: 420 },
//   { date: "2024-04-28", averageViewDuration: 122, averageViewPercentage: 180 },
//   { date: "2024-04-29", averageViewDuration: 315, averageViewPercentage: 240 },
//   { date: "2024-04-30", averageViewDuration: 454, averageViewPercentage: 380 },
//   { date: "2024-05-01", averageViewDuration: 165, averageViewPercentage: 220 },
//   { date: "2024-05-02", averageViewDuration: 293, averageViewPercentage: 310 },
//   { date: "2024-05-03", averageViewDuration: 247, averageViewPercentage: 190 },
//   { date: "2024-05-04", averageViewDuration: 385, averageViewPercentage: 420 },
//   { date: "2024-05-05", averageViewDuration: 481, averageViewPercentage: 390 },
//   { date: "2024-05-06", averageViewDuration: 498, averageViewPercentage: 520 },
//   { date: "2024-05-07", averageViewDuration: 388, averageViewPercentage: 300 },
//   { date: "2024-05-08", averageViewDuration: 149, averageViewPercentage: 210 },
//   { date: "2024-05-09", averageViewDuration: 227, averageViewPercentage: 180 },
//   { date: "2024-05-10", averageViewDuration: 293, averageViewPercentage: 330 },
//   { date: "2024-05-11", averageViewDuration: 335, averageViewPercentage: 270 },
//   { date: "2024-05-12", averageViewDuration: 197, averageViewPercentage: 240 },
//   { date: "2024-05-13", averageViewDuration: 197, averageViewPercentage: 160 },
//   { date: "2024-05-14", averageViewDuration: 448, averageViewPercentage: 490 },
//   { date: "2024-05-15", averageViewDuration: 473, averageViewPercentage: 380 },
//   { date: "2024-05-16", averageViewDuration: 338, averageViewPercentage: 400 },
//   { date: "2024-05-17", averageViewDuration: 499, averageViewPercentage: 420 },
//   { date: "2024-05-18", averageViewDuration: 315, averageViewPercentage: 350 },
//   { date: "2024-05-19", averageViewDuration: 235, averageViewPercentage: 180 },
//   { date: "2024-05-20", averageViewDuration: 177, averageViewPercentage: 230 },
//   { date: "2024-05-21", averageViewDuration: 82, averageViewPercentage: 140 },
//   { date: "2024-05-22", averageViewDuration: 81, averageViewPercentage: 120 },
//   { date: "2024-05-23", averageViewDuration: 252, averageViewPercentage: 290 },
//   { date: "2024-05-24", averageViewDuration: 294, averageViewPercentage: 220 },
//   { date: "2024-05-25", averageViewDuration: 201, averageViewPercentage: 250 },
//   { date: "2024-05-26", averageViewDuration: 213, averageViewPercentage: 170 },
//   { date: "2024-05-27", averageViewDuration: 420, averageViewPercentage: 460 },
//   { date: "2024-05-28", averageViewDuration: 233, averageViewPercentage: 190 },
//   { date: "2024-05-29", averageViewDuration: 78, averageViewPercentage: 130 },
//   { date: "2024-05-30", averageViewDuration: 340, averageViewPercentage: 280 },
//   { date: "2024-05-31", averageViewDuration: 178, averageViewPercentage: 230 },
//   { date: "2024-06-01", averageViewDuration: 178, averageViewPercentage: 200 },
//   { date: "2024-06-02", averageViewDuration: 470, averageViewPercentage: 410 },
//   { date: "2024-06-03", averageViewDuration: 103, averageViewPercentage: 160 },
//   { date: "2024-06-04", averageViewDuration: 439, averageViewPercentage: 380 },
//   { date: "2024-06-05", averageViewDuration: 88, averageViewPercentage: 140 },
//   { date: "2024-06-06", averageViewDuration: 294, averageViewPercentage: 250 },
//   { date: "2024-06-07", averageViewDuration: 323, averageViewPercentage: 370 },
//   { date: "2024-06-08", averageViewDuration: 385, averageViewPercentage: 320 },
//   { date: "2024-06-09", averageViewDuration: 438, averageViewPercentage: 480 },
//   { date: "2024-06-10", averageViewDuration: 155, averageViewPercentage: 200 },
//   { date: "2024-06-11", averageViewDuration: 92, averageViewPercentage: 150 },
//   { date: "2024-06-12", averageViewDuration: 492, averageViewPercentage: 420 },
//   { date: "2024-06-13", averageViewDuration: 81, averageViewPercentage: 130 },
//   { date: "2024-06-14", averageViewDuration: 426, averageViewPercentage: 380 },
//   { date: "2024-06-15", averageViewDuration: 307, averageViewPercentage: 350 },
//   { date: "2024-06-16", averageViewDuration: 371, averageViewPercentage: 310 },
//   { date: "2024-06-17", averageViewDuration: 475, averageViewPercentage: 520 },
//   { date: "2024-06-18", averageViewDuration: 107, averageViewPercentage: 170 },
//   { date: "2024-06-19", averageViewDuration: 341, averageViewPercentage: 290 },
//   { date: "2024-06-20", averageViewDuration: 408, averageViewPercentage: 450 },
//   { date: "2024-06-21", averageViewDuration: 169, averageViewPercentage: 210 },
//   { date: "2024-06-22", averageViewDuration: 317, averageViewPercentage: 270 },
//   { date: "2024-06-23", averageViewDuration: 480, averageViewPercentage: 530 },
//   { date: "2024-06-24", averageViewDuration: 132, averageViewPercentage: 180 },
//   { date: "2024-06-25", averageViewDuration: 141, averageViewPercentage: 190 },
//   { date: "2024-06-26", averageViewDuration: 434, averageViewPercentage: 380 },
//   { date: "2024-06-27", averageViewDuration: 448, averageViewPercentage: 490 },
//   { date: "2024-06-28", averageViewDuration: 149, averageViewPercentage: 200 },
//   { date: "2024-06-29", averageViewDuration: 103, averageViewPercentage: 160 },
//   { date: "2024-06-30", averageViewDuration: 446, averageViewPercentage: 400 },
// ]

const chartConfig = {
  averageViewDuration: {
    label: "Page averageViewDuration",
  },
  averageViewDuration: {
    label: "Average View Duration",
    color: "hsl(var(--chart-1))",
  },
  averageViewPercentage: {
    label: "Average View Percentage",
    color: "hsl(var(--chart-2))",
  },
}

export default function ViewAndSubLineGraph({chartData}) {
  const [activeChart, setActiveChart] = React.useState("averageViewDuration")

  const total = React.useMemo(
    () => ({
      averageViewDuration: chartData.reduce((acc, curr) => acc + curr.averageViewDuration, 0),
      averageViewPercentage: chartData.reduce((acc, curr) => acc + curr.averageViewPercentage, 0),
    }),
    [chartData]
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Line Chart - Interactive</CardTitle>
          <CardDescription>
            Showing {activeChart} for the month Jan 2022
          </CardDescription>
        </div>
        <div className="flex">
          {["averageViewDuration", "averageViewPercentage"].map((key) => {
            const chart = key 
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="count"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
