import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

Chartjs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const DailyAddedItemsChart = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('api/admin/items/perday');
        const jsonData = await res.json();
        if(!res.ok) {
          setError(jsonData.message)
          return
        }
       

        const data = jsonData.data.map(item => {
          return {
            date: item._id.year + '/' + item._id.month + '/' + item._id.day,
            count: item.count
          }
        })
    
        setChartData({
          labels: data.map(d => d.date),
          datasets: [
            {
              label: "Daily Added Items",
              data: data.map(d => d.count),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor:[
                'rgba(255, 99, 132, 0.9)',
                'rgba(54,162,235,0.9)',
                'rgba(255,206,86,.9)',
                'rgba(75,192,192,0.9)',
                'rgba(153,102,255,0.9)'
              ]
            },
          ],
        });
      } catch (err) {
        setError(err.message);
      }
    }

    fetchData();
  }, []);

  const options = {}

  return (
    <div>
      <h2>Daily Added Items Chart</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default DailyAddedItemsChart;
