"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DatePickerDemo from "@/components/date-picker";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function Youtube() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loginAgain, setLoginAgain] = useState(false);
  const [customData, setCustomData] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedMetrics, setSelectedMetrics] = useState([]);

  //table hooks:
  const [headers, setHeaders] = useState([]);
  const [formattedHeaders, setFormattedHeaders] = useState([]);
  const [formattedRows, setFormattedRows] = useState([]);

  const { toast } = useToast();
  const metrics = [
    "views",
    "estimatedMinutesWatched",
    "averageViewDuration",
    "averageViewPercentage",
    "subscribersGained",
  ];

  const Heads = {
    views: "Views",
    estimatedMinutesWatched: "Estimated Minutes Watched",
    averageViewDuration: "Average View Duration",
    averageViewPercentage: "Average View Percentage",
    subscribersGained: "Subscribers Gained",
    day: "Day",
  };

  //test

  const customHeadersMaker = function (paramHeaders) {
    return paramHeaders.map((key) => ({
      accessorKey: key.name,
      header: Heads[key.name],
    }));
  };

  // const testData = [
  //   [1,2,3],

  // ];
  //test end

  function handleRedirect() {
    try {
      router.push("/settings");
    } catch (err) {
      console.log(err);
    }
  }

  // Handle checkbox changes
  const handleCheckboxChange = (metric, isChecked) => {
    if (isChecked) {
      // Add the metric to the selected list if checked
      setSelectedMetrics((prev) => [...prev, metric]);
    } else {
      // Remove the metric if unchecked
      setSelectedMetrics((prev) => prev.filter((item) => item !== metric));
    }
  };

  async function handleSubmit() {
    if (!startDate || !endDate) {
      toast({
        variant: "destructive",
        title: "Fill the necessary fields!",
        description: "Start Date and End Date are required",
      });
    } else {
      setLoading(true);
      console.log("Start Date: ", startDate.toISOString().split("T")[0]);
      console.log("End Date: ", endDate.toISOString().split("T")[0]);

      const metricsString = selectedMetrics.join(", ");
      console.log("Metrics: ", metricsString); // Logs the string of selected metrics

      const data = {
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        metrics: selectedMetrics.join(","),
        dimensions: "day",
        sort: "day",
      };


      await fetchCustomData(data);
      console.log("Data: ", customData);

      //headers logic
      const temp = await customData.data.columnHeaders;
      setHeaders(temp);
      console.log("Headers: ", headers);
      const finalHeaders = customHeadersMaker(headers);
      setFormattedHeaders(finalHeaders);

      //rows logic
      const tempRows = await customData.data.rows;
      const formattedData = tempRows.map((row) => {
        return finalHeaders.reduce((acc, header, index) => {
          acc[header.accessorKey] = row[index]; // Use accessorKey as the key
          return acc;
        }, {});
      });

      setFormattedRows(formattedData);
      setLoading(false);
    }
  }

  const fetchCustomData = async (paramData) => {
    try {
      const res = await fetch("/api/youtube/customAnalytics", {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_API_KEY,
          email: session.user.email,
          Accept: "application/json",
        },
        method: "POST",
        body: JSON.stringify(paramData),
      });

      if (res.status === 401) {
        setLoginAgain(true);
        return;
        // throw new Error("Token expired or unauthorized. Please sign in again.");
      }

      const data = await res.json();
      setCustomData(data);

      setLoading(false);
      toast({
        title: "Data Fetched Successfully",
        description: "The data has been fetched successfully.",
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Handle token expiration
  useEffect(() => {
    if (loginAgain) {
      toast({
        variant: "destructive",
        title: "Oops, you need to login to YouTube again!",
        description:
          "Your token has expired. This could be due to a password change or you removed this app's permission to access your YouTube data.",
        action: (
          <ToastAction
            onClick={handleRedirect}
            altText="Login to YouTube Again"
          >
            Login
          </ToastAction>
        ),
      });

      setLoginAgain(false);
      setLoading(false);
    }
  }, [loginAgain, toast]);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center w-full h-full">
  //       <span className="loading loading-ring loading-lg"></span>
  //     </div>
  //   );
  // } 
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col lg:w-7/12">
        <div className="my-4">
          <h1 className="text-xl font-bold">Youtube Analytics Report</h1>
          <p className="text-base text-black dark:text-zinc-400">
            Customize your report here
          </p>
        </div>
        <hr />

        <div className="my-4">
          <Label className="me-2" htmlFor="email">
            Start Date:
          </Label>
          <DatePickerDemo date={startDate} setDate={setStartDate} />
        </div>

        <div className="my-4">
          <Label className="me-2" htmlFor="email">
            End Date:
          </Label>
          <DatePickerDemo date={endDate} setDate={setEndDate} />
        </div>

        <div className="my-4">
          <Label className="me-2" htmlFor="metrics">
            Metrics:
          </Label>

          {metrics.map((metric) => (
            <div key={metric} className="flex items-center space-x-2">
              <Checkbox
                id={metric}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(metric, checked)
                }
              />
              <label htmlFor={metric}>{metric}</label>
            </div>
          ))}
        </div>

        <Button onClick={handleSubmit}>Test</Button>
        <br />
        {/* <hr /> */}
        {/* <br /> */}
        </div>
      {loading ? (
        <div className="flex justify-center items-center w-full h-full">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : (
        
        <div className="flex flex-col w-80 md:w-full" >
            <DataTable columns={formattedHeaders} data={formattedRows} />
          </div>
        
      )}
    </div>
  );
}
