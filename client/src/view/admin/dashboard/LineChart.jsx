import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { formatNumber } from '@lib/helper';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    }
  }
};

const LineChart = ({ labels = [], data = [], total, totalDiy, total3D, totalTdiy }) => {
  return (
    <div className="w-full flex justify-center items-center flex-col gap-4 mt-4">
      <h3 className="font-bold uppercase">Báo cáo doanh thu</h3>
      <div className='flex flex-wrap w-full my-4'>
        <div className='w-3/12 font-medium text-sm flex justify-center'>Tổng: {formatNumber(total)} VND</div>
        <div className='w-3/12 font-medium text-sm flex justify-center'>Đèn ngủ DIY: {formatNumber(totalDiy)} VND</div>
        <div className='w-3/12 font-medium text-sm flex justify-center'>Đèn ngủ 3D: {formatNumber(total3D)} VND</div>
        <div className='w-3/12 font-medium text-sm flex justify-center'>Tranh DIY: {formatNumber(totalTdiy)} VND</div>
      </div>
      <Line
        options={options}
        data={{
          labels,
          datasets: [
            {
              fill: true,
              label: 'Doanh thu (VND)',
              data,
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)'
            }
          ]
        }}
      />
    </div>
  );
};

export default LineChart;
