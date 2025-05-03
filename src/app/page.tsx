/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Table, { PaginationInfo } from "@/components/Table";
import useApiGenderAnalytic from "@/hooks/useApiGenderAnalytic";
import { getDataCustomers } from "@/libs/CustomerApi";
import { CustomerResponse } from "@/types/customer";
import { useEffect, useMemo, useState } from "react";
import { Column } from "react-table";

import useApiAgeAnalytic from "@/hooks/useApiAgeAnalytic";
import useApiLocationAnalytic from "@/hooks/useApiLocationAnalytic";

import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie, Bar } from "react-chartjs-2";
import useApiBrandDeviceAnalytic from "@/hooks/useApiBrandDeviceAnalytic";
import useApiDigitalInterestAnalytic from "@/hooks/useApiDigitalInterestAnalytic";
import useApiVisitDateAnalytic from "@/hooks/useApiVisitDateAnalytic";
import useApiLoginHourAnalytic from "@/hooks/useApiLoginHourAnalytic";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartDataLabels
);

export default function Home() {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState<PaginationInfo>({
    pageIndex: 0,
    pageSize: 10,
    pageCount: 0,
    totalItems: 0,
  });

  const { isLoadingGender, loadGender, chartGender, optionsGender } =
    useApiGenderAnalytic();
  const { isLoadingAge, loadAge, chartAge, optionsAge } = useApiAgeAnalytic();
  const { isLoadingLocation, loadLocation, chartLocation, optionsLocation } =
    useApiLocationAnalytic();
  const {
    isLoadingBrandDevice,
    loadBrandDevice,
    chartBrandDevice,
    optionsBrandDevice,
  } = useApiBrandDeviceAnalytic();
  const {
    isLoadingDigitalInterest,
    loadDigitalInterest,
    chartDigitalInterest,
    optionsDigitalInterest,
  } = useApiDigitalInterestAnalytic();
  const {
    isLoadingVisitDate,
    loadVisitDate,
    chartVisitDate,
    optionsVisitDate,
  } = useApiVisitDateAnalytic();
  const {
    isLoadingLoginHour,
    loadLoginHour,
    chartLoginHour,
    optionsLoginHour,
  } = useApiLoginHourAnalytic();

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getDataCustomers(
        pagination.pageIndex + 1,
        pagination.pageSize
      );

      if (result.status === 200) {
        setLoading(false);
        setDataList(result?.data?.data?.data);

        setPagination({
          ...pagination,
          pageCount: Math.ceil(result?.data?.data?.total / pagination.pageSize),
          totalItems: result?.data?.data?.total,
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setDataList([]);
      const errorMessage =
        (error as any)?.response?.data?.message || "Internal server error";
      alert(errorMessage);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, pageIndex: newPage }));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: newPageSize,
      pageIndex: 0,
    }));
  };

  const columns = useMemo<Column<CustomerResponse>[]>(
    () => [
      {
        Header: "Number",
        accessor: "number",
      },
      {
        Header: "Name of Location",
        accessor: "nameOfLocation",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Login Hour",
        accessor: "loginHour",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "No. Telp",
        accessor: "noTelp",
      },
      {
        Header: "Brand Device",
        accessor: "brandDevice",
      },
      {
        Header: "Digital Interest",
        accessor: "digitalInterest",
      },
      {
        Header: "Location Type",
        accessor: "locationType",
      },
    ],
    []
  );

  useEffect(() => {
    fetchData();
  }, [pagination.pageIndex, pagination.pageSize]);

  useEffect(() => {
    loadGender();
    loadAge();
    loadLocation();
    loadBrandDevice();
    loadDigitalInterest();
    loadVisitDate();
    loadLoginHour();
  }, []);

  return (
    <div className="p-8 bg-blue-50 h-full min-h-screen">
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-lg">
            <h2 className="text-xl font-bold text-center mb-4">Gender</h2>
            <div className="p-8">
              {isLoadingGender ? (
                <div className="w-full flex items-center justify-center p-8">
                  Loading...
                </div>
              ) : (
                <Pie data={chartGender} options={optionsGender} />
              )}
            </div>
          </div>
          <div className="bg-white rounded-3xl shadow-lg">
            <h2 className="text-xl font-bold text-center mb-4">Age</h2>
            <div className="p-8">
              {isLoadingAge ? (
                <div className="w-full flex items-center justify-center p-8">
                  Loading...
                </div>
              ) : (
                <Pie data={chartAge} options={optionsAge} />
              )}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl shadow-lg">
          <h2 className="text-xl font-bold text-center mb-4">
            Name of Location
          </h2>
          <div className="p-8">
            {isLoadingLocation ? (
              <div className="w-full flex items-center justify-center p-8">
                Loading...
              </div>
            ) : (
              <Bar data={chartLocation} options={optionsLocation} />
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-3xl shadow-lg">
          <h2 className="text-xl font-bold text-center mb-4">Brand Device</h2>
          <div className="p-8">
            {isLoadingBrandDevice ? (
              <div className="w-full flex items-center justify-center p-8">
                Loading...
              </div>
            ) : (
              <Bar data={chartBrandDevice} options={optionsBrandDevice} />
            )}
          </div>
        </div>
        <div className="bg-white rounded-3xl shadow-lg">
          <h2 className="text-xl font-bold text-center mb-4">
            Digital Interest
          </h2>
          <div className="p-8">
            {isLoadingDigitalInterest ? (
              <div className="w-full flex items-center justify-center p-8">
                Loading...
              </div>
            ) : (
              <Bar
                data={chartDigitalInterest}
                options={optionsDigitalInterest}
              />
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-3xl shadow-lg">
          <h2 className="text-xl font-bold text-center mb-4">Visit Date</h2>
          <div className="p-8">
            {isLoadingVisitDate ? (
              <div className="w-full flex items-center justify-center p-8">
                Loading...
              </div>
            ) : (
              <Bar data={chartVisitDate} options={optionsVisitDate} />
            )}
          </div>
        </div>
        <div className="bg-white rounded-3xl shadow-lg">
          <h2 className="text-xl font-bold text-center mb-4">Login Hour</h2>
          <div className="p-8">
            {isLoadingLoginHour ? (
              <div className="w-full flex items-center justify-center p-8">
                Loading...
              </div>
            ) : (
              <Bar data={chartLoginHour} options={optionsLoginHour} />
            )}
          </div>
        </div>
      </div>
      <Table
        title="Customer"
        columns={columns}
        data={dataList || []}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
