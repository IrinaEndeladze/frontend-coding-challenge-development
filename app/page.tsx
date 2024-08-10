import { ChartBlock } from '@/page_blocks/ChartBlock';
import { Providers } from '@/providers';
import getBarChartData from 'services/fetchBarChartData';

export default async function Home() {
  const chartData = await getBarChartData();

  return (
    <div className='w-full h-screen flex items-center justify-center flex-col'>
      <Providers>
        <ChartBlock data={chartData?.data} message={chartData?.message} status={chartData?.status} />
      </Providers>
    </div>
  );
}
