import { Line } from "react-chartjs-2";

import { fotmatedAt } from '@/shared/utils/fotmatedAt'
import type { LinesTrendTypes } from './types'

function LinesTrend({ data }: LinesTrendTypes) {
  const currentData = data?.actions
  const allDateData = currentData?.map((statistic) => fotmatedAt(statistic.state_date))
  const allDoneGoals = currentData?.map((statistic) => statistic.done_goals) || [0, 0, 0, 0]

  const oneDayData = currentData?.filter((statistic) => {
    const fotmatedDate = fotmatedAt(statistic.state_date)
    const currentDate = fotmatedDate.split(', ')[0]
    const today = fotmatedAt(new Date().toISOString())
    const currentDay = today.split(', ')[0]

    return String(currentDate) === String(currentDay)
  })

  const oneDayDate = oneDayData?.map((statistic) => fotmatedAt(statistic.state_date))
  const oneDayDoneGoals = oneDayData && oneDayData?.length > 0 ?
    oneDayData?.map((statistic) => statistic.done_goals) :
    [0, 0, 0, 0]

  const dataLines = {
    labels: allDateData,
    datasets: [
      {
        label: "",
        data: allDoneGoals,
        borderColor: "rgba(0, 255, 255, 1)",
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);
          gradient.addColorStop(0, "rgba(0, 255, 255, 0.4)");
          gradient.addColorStop(1, "rgba(0, 255, 255, 0)");
          return gradient;
        },
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const oneDayDataLines = {
    labels: oneDayDate,
    datasets: [
      {
        label: "",
        data: oneDayDoneGoals,
        borderColor: "rgba(0, 255, 255, 1)",
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, context.chart.height);
          gradient.addColorStop(0, "rgba(0, 255, 255, 0.4)");
          gradient.addColorStop(1, "rgba(0, 255, 255, 0)");
          return gradient;
        },
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: Math.max(...(allDoneGoals || [0])) + 2,
      },
    },
  };

  return (
    <>
      <div>
        <p style={{ textAlign: 'center', fontSize: '18px', marginBottom: '15px' }}>For the current day</p>
        {data?.actions.length !== 0 ? <Line data={oneDayDataLines} options={options} /> : <div className='_no-data'>No data</div>}
      </div>
      <div>
        <p style={{ textAlign: 'center', fontSize: '18px', marginBottom: '15px' }}>For 7 days</p>
        {data?.actions.length !== 0 ? <Line data={dataLines} options={options} /> : <div className='_no-data'>No data</div>}
      </div>
    </>
  )
}

export default LinesTrend