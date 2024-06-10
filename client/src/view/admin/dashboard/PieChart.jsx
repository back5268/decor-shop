import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ title = '', data = [], label = '' }) => {
  return (
    <div className="max-h-[360px] flex justify-center items-center flex-col gap-4 mb-4">
      <h3 className="font-bold uppercase">{title}</h3>
      <Pie
        data={{
          labels: ['Đèn ngủ DIY', 'Đèn ngủ 3D', 'Tranh DIY'],
          datasets: [
            {
              label,
              data,
              backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
              borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
              borderWidth: 1
            }
          ]
        }}
      />
    </div>
  );
};

export default PieChart;
