const getBarChartData = async () => {
  try {
    const res = await fetch(`${process.env.baseUrl}/api/data/chart-data`, {
      //  use no-store, because every time user get fresh data,
      // this is a chart and maybe in production chart's data update frequently.

      cache: 'no-store',
      // next: { revalidate: 10 }, // Uncomment for ISR or revalidation
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error('Error fetching chart data', error);
  }
};

export default getBarChartData;
