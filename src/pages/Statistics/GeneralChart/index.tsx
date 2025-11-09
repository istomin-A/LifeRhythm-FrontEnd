// import style from './generalChart.module.scss'
import { Pie } from "react-chartjs-2"
import type { PieChartProps } from './generalChart.type'
import type { Context } from "chartjs-plugin-datalabels"

function GeneralChart({ data }: PieChartProps) {
  const dataValueChart = [data?.goals, data?.active_goals, data?.done_goals, data?.overdue_goals]

  const dataChart = {
    labels: ["All goals", "In progress", "Completed", "Overdue"],
    datasets: [
      {
        label: "Count",
        data: dataValueChart,
        backgroundColor: [
          "rgba(150, 130, 255, 0.8)",
          "rgba(255, 160, 140, 0.8)",
          "rgba(100, 220, 200, 0.8)",
          "rgba(255, 99, 132, 0.8)"
        ],
        borderColor: [
          "rgba(120, 100, 220, 1)",
          "rgba(220, 120, 100, 1)",
          "rgba(80, 200, 180, 1)",
          "rgba(200, 60, 90, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 14,
            weight: "bold" as const,
          },
        },
      },
      datalabels: {
        display: true,
        color: "#1a1a1a",
        font: {
          weight: "bold" as const,
          size: 14,
        },
        formatter: (value: number, context: Context) => {
          if (value === 0) return "";
          const label = context.chart.data.labels?.[context.dataIndex];
          return `${label}: ${value}`;
        }
      },
    },
  };

  return <Pie data={dataChart} options={options} />
}

export default GeneralChart