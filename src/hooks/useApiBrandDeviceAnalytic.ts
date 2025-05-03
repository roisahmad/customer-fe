/* eslint-disable @typescript-eslint/no-explicit-any */
import { getBrandAnaylytic } from "@/libs/AnalyticApi";
import { generateColors } from "@/utils/generateColor";
import { useState } from "react";

export interface BrandDeviceRes {
  _id: string;
  count: number;
}

const useApiBrandDeviceAnalytic = () => {
  const [isLoadingBrandDevice, setIsLoadingBrandDevice] =
    useState<boolean>(false);
  const [fetchedBrandDevice, setFetchedBrandDevice] = useState<
    BrandDeviceRes[]
  >([]);

  const fetchApi = async () => {
    try {
      setIsLoadingBrandDevice(true);
      const result = await getBrandAnaylytic();
      if (result?.status === 200) {
        const list = result?.data?.data;

        setFetchedBrandDevice(list || []);
      }
      setIsLoadingBrandDevice(false);
    } catch (error) {
      console.log("Error fetching data", error);
      setIsLoadingBrandDevice(false);
      setFetchedBrandDevice([]);
    }
  };

  const loadBrandDevice = () => {
    fetchApi();
  };

  const chartBrandDevice = {
    labels: fetchedBrandDevice.map((item) => item._id),
    datasets: [
      {
        label: "BrandDevice",
        data: fetchedBrandDevice.map((item) => item.count),
        backgroundColor: generateColors(fetchedBrandDevice?.length),
        borderWidth: 1,
      },
    ],
  };

  const optionsBrandDevice = {
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
    isLoadingBrandDevice,
    fetchedBrandDevice,
    loadBrandDevice,
    chartBrandDevice,
    optionsBrandDevice,
  };
};

export default useApiBrandDeviceAnalytic;
