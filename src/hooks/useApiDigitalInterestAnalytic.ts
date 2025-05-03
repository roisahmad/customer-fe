/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDigitalInterestAnaylytic } from "@/libs/AnalyticApi";
import { generateColors } from "@/utils/generateColor";
import { useState } from "react";

export interface DigitalInterestRes {
  _id: string;
  count: number;
}

const useApiDigitalInterestAnalytic = () => {
  const [isLoadingDigitalInterest, setIsLoadingDigitalInterest] =
    useState<boolean>(false);
  const [fetchedDigitalInterest, setFetchedDigitalInterest] = useState<
    DigitalInterestRes[]
  >([]);

  const fetchApi = async () => {
    try {
      setIsLoadingDigitalInterest(true);
      const result = await getDigitalInterestAnaylytic();
      if (result?.status === 200) {
        const list = result?.data?.data;

        setFetchedDigitalInterest(list || []);
      }
      setIsLoadingDigitalInterest(false);
    } catch (error) {
      console.log("Error fetching data", error);
      setIsLoadingDigitalInterest(false);
      setFetchedDigitalInterest([]);
    }
  };

  const loadDigitalInterest = () => {
    fetchApi();
  };

  const chartDigitalInterest = {
    labels: fetchedDigitalInterest.map((item) => item._id),
    datasets: [
      {
        label: "DigitalInterest",
        data: fetchedDigitalInterest.map((item) => item.count),
        backgroundColor: generateColors(fetchedDigitalInterest?.length),
        borderWidth: 1,
      },
    ],
  };

  const optionsDigitalInterest = {
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
    isLoadingDigitalInterest,
    fetchedDigitalInterest,
    loadDigitalInterest,
    chartDigitalInterest,
    optionsDigitalInterest,
  };
};

export default useApiDigitalInterestAnalytic;
