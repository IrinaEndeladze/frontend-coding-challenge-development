'use client';
import React from 'react';
import { BarChart } from '../../Chart';
import { useToastContext } from '../providers/toast';
import { useEffect, useMemo, useState } from 'react';

interface barChartProps {
  data: {
    datasetOne: number[];
    datasetTwo: number[];
  };
  message: string;
  status: string;
}

interface Filter {
  min: number | string;
  max: number | string;
}

export function ChartBlock({ data, message, status }: barChartProps) {
  const { renderToast } = useToastContext();

  const [filtered, setFiltered] = useState<Filter>({ min: '', max: '' });

  const { min, max } = filtered;

  const handleChange = (value: string, name: string) => {
    setFiltered(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const filteredData = useMemo(() => {
    const minValue = filtered.min !== '' ? parseFloat(min.toString()) : -Infinity;
    const maxValue = filtered.max !== '' ? parseFloat(max.toString()) : Infinity;

    return {
      datasetOne: data?.datasetOne.filter(value => value >= minValue && value <= maxValue),
      datasetTwo: data?.datasetTwo.filter(value => value >= minValue && value <= maxValue),
    };
  }, [data, filtered]);

  useEffect(() => {
    if (status === 'error') {
      renderToast(status, message);
    } else if (status === 'success') {
      renderToast(status, message);
    }
  }, [status]);

  return (
    <>
      <div className='mb-12 flex items-center'>
        <div className='flex flex-col mx-4 '>
          <span className='text-sm'>Min</span>
          <input
            type='number'
            className='w-24 h-8 text-sm'
            value={filtered?.min}
            onChange={e => handleChange(e.target.value, 'min')}
          />
        </div>
        <div className='flex flex-col mx-4'>
          <span className='text-sm'>Max</span>
          <input
            type='number'
            className='w-24 h-8 text-sm'
            value={filtered?.max}
            onChange={e => handleChange(e.target.value, 'max')}
          />
        </div>
        <div className='flex flex-col mx-4 pt-4 w-100'>
          <button
            className='bg-blue-600 flex justify-center items-center h-10 text-center text-white border focus:outline-none focus:ring-4 font-sm rounded-lg text-sm px-5 py-1.9'
            onClick={() => setFiltered({ min: '', max: '' })}>
            Reset
          </button>
        </div>
      </div>
      <div>
        <BarChart
          width={600}
          height={300}
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
              {
                label: 'Dataset 1',
                data: filteredData?.datasetOne,
                backgroundColor: 'rgb(255, 99, 132)',
              },
              {
                label: 'Dataset 2',
                data: filteredData?.datasetTwo,
                backgroundColor: 'rgb(54, 162, 235)',
              },
            ],
          }}
        />
      </div>
    </>
  );
}
