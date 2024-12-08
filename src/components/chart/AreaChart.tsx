import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { SaleData } from "../Api";
import FilterMenu from "./FilterMenu";

// Registration for the required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface AreaChartProps {
    data: SaleData[];
}

const AreaChart: React.FC<AreaChartProps> = ({ data }) => {
    const [startYear, setStartYear] = useState<number>(2014);
    const [endYear, setEndYear] = useState<number>(2022);
    const [chartData, setChartData] = useState({
        labels: [] as string[],
        datasets: [
            {
                label: "Cumulative Sales",
                data: [] as number[],
                backgroundColor: "rgba(85, 107, 47, 0.2)", // Semi-transparent army green for fill
                borderColor: "rgba(85, 107, 47, 1)", // Darker green for the line
                pointBackgroundColor: "rgba(85, 107, 47, 1)",
                fill: true, // Enable the fill for the area chart
                tension: 0.4, // Smooth the lines
            },
        ],
    });

    useEffect(() => {
        // Filter data based on the selected years
        const filteredData = data.filter(
            (item) => item.period >= startYear && item.period <= endYear
        );

        // Calculate cumulative sales
        const cumulativeData = filteredData.reduce<number[]>((acc, item, index) => {
            const cumulativeValue = index === 0 ? item.sales : acc[index - 1] + item.sales;
            acc.push(cumulativeValue);
            return acc;
        }, []);

        // Update chart data
        setChartData({
            labels: filteredData.map((item) => item.period.toString()),
            datasets: [
                {
                    ...chartData.datasets[0],
                    data: cumulativeData,
                },
            ],
        });
    }, [data, startYear, endYear]);

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
            <Line data={chartData} options={options} />
        </>
    );
};

export default AreaChart;
