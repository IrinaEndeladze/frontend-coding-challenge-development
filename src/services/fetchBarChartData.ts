const getBarChartData = async () => {
  try {
    const res = await fetch(`${process.env.baseUrl}/api/data/chart-data`, {
      // Uncomment if needed for caching behavior
      // cache: "no-store",
      // next: { revalidate: 10 }, // Uncomment for ISR or revalidation
    });
    if (!res.ok) {
      throw new Error('Failed to fetch chart data');
    }
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error('Error fetching chart data:', error);
  }
};

export default getBarChartData;
