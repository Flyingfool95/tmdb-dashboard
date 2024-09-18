import { useFetchDashboard } from "../hooks/useFetchDashboard";



export default function Dashboard() {

    const {
        dashboardMovieData,
        dashboardTvData,
        movieGenres,
        tvGenres,
    } = useFetchDashboard();

    return (
        <main className='dashboard'>
            <h2>Movies</h2>
            {
                dashboardMovieData.data && dashboardMovieData.data.map((data: any) => (
                    <h3 key={data.name}>{data.name} - ({data.totalResults})</h3>
                ))
            }

            <h2>Series</h2>
            {
                dashboardTvData.data && dashboardTvData.data.map((data: any) => (
                    <h3 key={data.name}>{data.name} - ({data.totalResults})</h3>
                ))
            }

        </main>
    )
}
