import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const SkillChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: 'Proficiency',
        data: Object.values(data),
        backgroundColor: 'rgba(14, 165, 233, 0.2)',
        borderColor: '#0ea5e9',
        borderWidth: 2,
        pointBackgroundColor: '#0ea5e9',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#0ea5e9',
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        pointLabels: {
          color: '#94a3b8',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
        ticks: {
          display: false,
          max: 100,
          min: 0,
          stepSize: 20,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return <Radar data={chartData} options={options} />;
};

export default SkillChart;
