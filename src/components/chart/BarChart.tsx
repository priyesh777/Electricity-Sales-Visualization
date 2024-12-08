import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { SaleData } from "../Api";
import FilterMenu from "./FilterMenu";

// Registration for the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarChartProps {
    data: SaleData[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
    const [startYear, setStartYear] = useState<number>(2014);
    const [endYear, setEndYear] = useState<number>(2022);
    const [chartData, setChartData] = useState({
        labels: [] as string[],
        datasets: [
            {
                label: "Sales",
                data: [] as number[],
                backgroundColor: "rgba(85, 107, 47, 0.8)", // Army greenish color
                hoverBackgroundColor: "rgba(107, 142, 35, 1)", // Slightly lighter green
                borderRadius: 4,
            },
        ],
    });

    useEffect(() => {
        const filteredData = data.filter(
            (item) => item.period >= startYear && item.period <= endYear
        );

        setChartData({
            labels: filteredData.map((item) => item.period.toString()),
            datasets: [
                {
                    ...chartData.datasets[0],
                    data: filteredData.map((item) => item.sales),
                },
            ],
        });
    }, [
        data,
        startYear,
        endYear,
    ]);

    const handleYearsChange = (startYear: number, endYear: number) => {
        setStartYear(startYear);
        setEndYear(endYear);
    };

    const options = {
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    color: "#999",
                },
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: "#999",
                },
                grid: {
                    display: true,
                    color: "rgba(200, 200, 200, 0.2)",
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: "#bbb",
                },
            },
        },
    };

    return (
        <>
            <FilterMenu
                startYear={startYear}
                endYear={endYear}
                onYearsChange={handleYearsChange}
            />
            <Bar data={chartData} options={options} />
        </>
    );
};

export default BarChart;
