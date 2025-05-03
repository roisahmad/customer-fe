/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAgeAnaylytic } from "@/libs/AnalyticApi";
import { generateColors } from "@/utils/generateColor";
import { useState } from "react";

export interface AgeRes {
  range: string;
  count: number;
}

const useApiAgeAnalytic = () => {
  const [isLoadingAge, setIsLoadingAge] = useState<boolean>(false);
  const [fetchedAge, setFetchedAge] = useState<AgeRes[]>([]);

  const fetchApi = async () => {
    try {
      setIsLoadingAge(true);
      const result = await getAgeAnaylytic();
      if (result?.status === 200) {
        const list = result?.data?.data;

        setFetchedAge(list || []);
      }
      setIsLoadingAge(false);
    } catch (error) {
      console.log("Error fetching data", error);
      setIsLoadingAge(false);
      setFetchedAge([]);
    }
  };

  const loadAge = () => {
    fetchApi();
  };

  const chartAge = {
    labels: fetchedAge.map((item) => item.range),
    datasets: [
      {
        label: "Age",
        data: fetchedAge.map((item) => item.count),
        backgroundColor: generateColors(fetchedAge?.length),
        borderWidth: 1,
      },
    ],
  };

  const optionsAge = {
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
        formatter: (value: any, context: any) => {
          const label = context.chart.data.labels[context.dataIndex];
          return `${label}: ${value.toLocaleString("id")}`;
        },
      },
    },
  };

  return {
    isLoadingAge,
    fetchedAge,
    loadAge,
    chartAge,
    optionsAge,
  };
};

export default useApiAgeAnalytic;
