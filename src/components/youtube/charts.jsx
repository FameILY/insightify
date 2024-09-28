"use client";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, LabelList, Tooltip, Legend } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartTooltipContent,
  ChartTooltip,
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const YouTubeAnalyticsChart = ({ monthlyData }) => {
  const { toast } = useToast();

  useEffect(() => {
    if (!monthlyData || !Array.isArray(monthlyData) || monthlyData.length === 1) {
      console.error("No valid monthly data:", monthlyData); // Added error logging
      toast({
        title: "No Data Available",
        description: "There is no data to display for the selected period.",
      });
    }
  }, [monthlyData, toast]);

  const completeMonthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Create data to display, filling missing months with 0
  const dataToDisplay = completeMonthNames.map((month, index) => {
    const monthlyEntry = monthlyData[index];
  
    return {
      month: month,
      subscribersGained: monthlyEntry ? monthlyEntry.subscribersGained : 0,
      views: monthlyEntry ? monthlyEntry.views : 0, // Add views to the dataset
    };
  });

  // Set up chart config (using colors similar to the example)
  const chartConfig = {
    subscribersGained: {
      label: "Subscribers Gained",
      color: "hsl(var(--chart-1))",
    },
    views: {
      label: "Views",
      color: "hsl(var(--chart-2))",
    },
  };

  // Calculate trend percentage for subscribers gained
  const currentMonthData = dataToDisplay[dataToDisplay.length - 1] || {};
  const previousMonthData = dataToDisplay[dataToDisplay.length - 2] || {};

  const trendPercentage = previousMonthData.subscribersGained > 0
    ? (((currentMonthData.subscribersGained - previousMonthData.subscribersGained) / previousMonthData.subscribersGained) * 100).toFixed(2)
    : currentMonthData.subscribersGained > 0 ? 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>YouTube Analytics - Subscribers & Views</CardTitle>
        <CardDescription>Data for the last year</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
        <BarChart accessibilityLayer data={dataToDisplay}
         margin={{ top: 20, right: 30, bottom: 5, left: 20 }}>

            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="subscribersGained" fill="var(--color-subscribersGained)" radius={4}>
            <LabelList dataKey="subscribersGained" position="top" className="hidden md:block"/>
            </Bar>
            <Bar dataKey="views" fill="var(--color-views)" radius={4} >
            <LabelList dataKey="views" position="top" className="hidden md:block"/>
            </Bar>

          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {trendPercentage > 0 ? (
            <div className="flex gap-2 font-medium leading-none">
              Trending up by {trendPercentage}% this month <TrendingUp className="h-4 w-4" />
            </div>
          ) : (
            <div className="flex gap-2 font-medium leading-none">
              Trending down by {Math.abs(trendPercentage)}% this month <TrendingUp className="h-4 w-4" />
            </div>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total subscribers gained and views for the last year
        </div>
      </CardFooter>
    </Card>
  );
};

export default YouTubeAnalyticsChart;
