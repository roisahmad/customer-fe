/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLoginHourAnaylytic } from "@/libs/AnalyticApi";
import { generateColors } from "@/utils/generateColor";
import { useState } from "react";

export interface LoginHourRes {
  range: string;
  count: number;
}

const useApiLoginHourAnalytic = () => {
  const [isLoadingLoginHour, setIsLoadingLoginHour] = useState<boolean>(false);
  const [fetchedLoginHour, setFetchedLoginHour] = useState<LoginHourRes[]>([]);

  const fetchApi = async () => {
    try {
      setIsLoadingLoginHour(true);
      const result = await getLoginHourAnaylytic();
      if (result?.status === 200) {
        const list = result?.data?.data;

        setFetchedLoginHour(list || []);
      }
      setIsLoadingLoginHour(false);
    } catch (error) {
      console.log("Error fetching data", error);
      setIsLoadingLoginHour(false);
      setFetchedLoginHour([]);
    }
  };

  const loadLoginHour = () => {
    fetchApi();
  };

  const chartLoginHour = {
    labels: fetchedLoginHour.map((item) => item.range),
    datasets: [
      {
        label: "LoginHour",
        data: fetchedLoginHour.map((item) => item.count),
        backgroundColor: generateColors(fetchedLoginHour?.length),
        borderWidth: 1,
      },
    ],
  };

  const optionsLoginHour = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) =>
            `${context.label}: ${context.raw.toLocaleString("id")}`,
        },
      },
      datalabels: {
        color: "#fff",
        formatter: (value: number) => {
          return `${value.toLocaleString("id")}`;
        },
      },
    },
  };

  return {
    isLoadingLoginHour,
    fetchedLoginHour,
    loadLoginHour,
    chartLoginHour,
    optionsLoginHour,
  };
};

export default useApiLoginHourAnalytic;
