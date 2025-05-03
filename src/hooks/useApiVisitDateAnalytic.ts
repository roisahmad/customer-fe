/* eslint-disable @typescript-eslint/no-explicit-any */
import { getVisitDateAnaylytic } from "@/libs/AnalyticApi";
import { generateColors } from "@/utils/generateColor";
import { useState } from "react";

export interface VisitDateRes {
  _id: string;
  count: number;
}

const useApiVisitDateAnalytic = () => {
  const [isLoadingVisitDate, setIsLoadingVisitDate] = useState<boolean>(false);
  const [fetchedVisitDate, setFetchedVisitDate] = useState<VisitDateRes[]>([]);

  const fetchApi = async () => {
    try {
      setIsLoadingVisitDate(true);
      const result = await getVisitDateAnaylytic();
      if (result?.status === 200) {
        const list = result?.data?.data;

        setFetchedVisitDate(list || []);
      }
      setIsLoadingVisitDate(false);
    } catch (error) {
      console.log("Error fetching data", error);
      setIsLoadingVisitDate(false);
      setFetchedVisitDate([]);
    }
  };

  const loadVisitDate = () => {
    fetchApi();
  };

  const chartVisitDate = {
    labels: fetchedVisitDate.map((item) => item._id),
    datasets: [
      {
        label: "VisitDate",
        data: fetchedVisitDate.map((item) => item.count),
        backgroundColor: generateColors(fetchedVisitDate?.length),
        borderWidth: 1,
      },
    ],
  };

  const optionsVisitDate = {
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
    isLoadingVisitDate,
    fetchedVisitDate,
    loadVisitDate,
    chartVisitDate,
    optionsVisitDate,
  };
};

export default useApiVisitDateAnalytic;
