import { useEffect, useState } from "react";
import DataTable from "./components/DataTable";
import BarChart from "./components/chart/BarChart";
import AreaChart from "./components/chart/AreaChart";
import { fetchSalesData, SaleData } from "./components/Api";
import { Container, Divider, Ring, RingItem } from "./styles/App.styles";

const App: React.FC = () => {
    const [salesData, setSalesData] = useState<SaleData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchSalesData();
                setSalesData(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        void fetchData();
    }, []);

    return (
        <>
            {isLoading ? (
                <Ring>
                    <RingItem />
                    <RingItem />
                    <RingItem />
                </Ring>
            ) : (
                <>
                    <Container>
                        <div>
                            <div className="top-chart">
                                <div className="status-bar">
                                    <div className="status-text">Generic Data Analysis</div>
                                </div>
                                <div className="header-box">
                                    <h3>Electricity Sales Overtime</h3>
                                </div>
                                <div className="imageContainer">
                                    <img src="/dist/pic1.jpg" alt="imageOne" style={{ width: 150, height: 150, objectFit: "contain" }} />
                                </div>
                            </div>
                            <Divider></Divider>
                            <div className="bottom-chart">
                                <BarChart
                                    data={salesData}
                                //startColor={""}
                                //endColor={""}
                                />
                            </div>
                        </div>
                        <div>
                            <div className="top-table">
                                <div className="status-bar">
                                    <div className="status-text">
                                        Generic Data Analysis
                                    </div>
                                </div>
                                <div className="header-box">
                                    <h3>Details of Sales Data</h3>
                                </div>
                                <div className="imageContainer">
                                    <img src="/dist/pic2.jpg" alt="imageTwo" style={{ width: 300, height: 150, objectFit: "contain" }} />
                                </div>
                            </div>
                            <Divider></Divider>
                            <div className="bottom-table">
                                <DataTable data={salesData} />
                            </div>
                        </div>
                    </Container>
                    <Container>
                        <div>
                            <div className="top-chart">
                                <div className="status-bar">
                                    <div className="status-text">Generic Data Analysis</div>
                                </div>
                                <div className="header-box">
                                    <h3>Cumulative Sales Overtime</h3>
                                </div>
                            </div>
                            <Divider></Divider>
                            <div className="bottom-chart">
                                <AreaChart
                                    data={salesData}
                                //startColor={""}
                                //endColor={""}
                                />
                            </div>
                        </div>
                    </Container>
                </>
            )}
        </>
    );
};

export default App;
