import DashboardGenre from '../components/DashboardGenre';
import useFetchDashboard from './../hooks/useFetchDashboard';



export default function Dashboard() {

    const {
        dashboardMovieData,
        dashboardTvData,
    } = useFetchDashboard();


    console.log(dashboardMovieData.data)

    return (
        <main className='dashboard'>
            <h2>Movies</h2>
            {
                dashboardMovieData.data && dashboardMovieData.data.map((data: any) => (
                    <DashboardGenre data={data} key={data.name} />
                ))
            }

            <h2>Series</h2>
            {
                dashboardTvData.data && dashboardTvData.data.map((data: any) => (
                    <DashboardGenre data={data} key={data.name} />

                ))
            }

        </main>
    )
}
