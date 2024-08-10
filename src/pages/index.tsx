import { GetServerSideProps } from 'next';
import { ChartBlock } from '../ui/page_blocks/ChartBlock';

interface ChartData {
  data: {
    datasetOne: number[];
    datasetTwo: number[];
  };
  message: string;
  status: string;
}

interface IndexPageProps {
  data?: ChartData;
  error?: string;
}

// Use GetServerSideProps type to ensure proper typing
export const getServerSideProps: GetServerSideProps<IndexPageProps> = async () => {
  try {
    const response = await fetch(`${process.env.baseUrl}/api/data/chart-data`);
    const data: ChartData = await response.json();

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        error: 'Failed to fetch data',
      },
    };
  }
};

export default function IndexPage({ data }: any) {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <ChartBlock data={data?.data} message={data?.message} status={data?.status} />
    </div>
  );
}
