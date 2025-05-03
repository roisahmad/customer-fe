/* eslint-disable @typescript-eslint/no-explicit-any */
import { getGenderAnaylytic } from "@/libs/AnalyticApi";
import { generateColors } from "@/utils/generateColor";
import { useState } from "react";

export interface GenderRes {
  _id: string;
  count: number;
}

const useApiGenderAnalytic = () => {
  const [isLoadingGender, setIsLoadingGender] = useState<boolean>(false);
  const [fetchedGender, setFetchedGender] = useState<GenderRes[]>([]);

  const fetchApi = async () => {
    try {
      setIsLoadingGender(true);
      const result = await getGenderAnaylytic();
      if (result?.status === 200) {
        const list = result?.data?.data;

        setFetchedGender(list || []);
      }
      setIsLoadingGender(false);
    } catch (error) {
      console.log("Error fetching data", error);
      setIsLoadingGender(false);
      setFetchedGender([]);
    }
  };

  const loadGender = () => {
    fetchApi();
  };

  const chartGender = {
    labels: fetchedGender.map((item) => item._id),
    datasets: [
      {
        label: "Gender Distribution",
        data: fetchedGender.map((item) => item.count),
        backgroundColor: generateColors(fetchedGender?.length),
        borderWidth: 1,
      },
    ],
  };

  const optionsGender = {
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
    chartGender,
    optionsGender,
    isLoadingGender,
    loadGender,
    fetchedGender,
  };
};

export default useApiGenderAnalytic;
