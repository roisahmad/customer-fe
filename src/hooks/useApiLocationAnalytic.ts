/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLocationAnaylytic } from "@/libs/AnalyticApi";
import { generateColors } from "@/utils/generateColor";
import { useState } from "react";

export interface LocationRes {
  _id: string;
  count: number;
}

const useApiLocationAnalytic = () => {
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(false);
  const [fetchedLocation, setFetchedLocation] = useState<LocationRes[]>([]);

  const fetchApi = async () => {
    try {
      setIsLoadingLocation(true);
      const result = await getLocationAnaylytic();
      if (result?.status === 200) {
        const list = result?.data?.data;

        setFetchedLocation(list || []);
      }
      setIsLoadingLocation(false);
    } catch (error) {
      console.log("Error fetching data", error);
      setIsLoadingLocation(false);
      setFetchedLocation([]);
    }
  };

  const loadLocation = () => {
    fetchApi();
  };

  const chartLocation = {
    labels: fetchedLocation.map((item) => item._id),
    datasets: [
      {
        label: "Location",
        data: fetchedLocation.map((item) => item.count),
        backgroundColor: generateColors(fetchedLocation?.length),
        borderWidth: 1,
      },
    ],
  };

  const optionsLocation = {
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
    isLoadingLocation,
    fetchedLocation,
    loadLocation,
    chartLocation,
    optionsLocation,
  };
};

export default useApiLocationAnalytic;
