import DashboardGenre from '../components/DashboardGenre';
import useFetchDashboard from './../hooks/useFetchDashboard';
import '../styling/routes/Dashboard.scss';



export default function Dashboard() {

    const {
        dashboardMovieData,
        dashboardTvData,
    } = useFetchDashboard();


    console.log(dashboardTvData.data)

    return (
        <main className='dashboard'>
            <h2>Movies</h2>

            <div className="dashboard__genre-list">
                {
                    dashboardMovieData.data && dashboardMovieData.data.map((data: any) => (
                        <DashboardGenre data={data} key={data.name} />
                    ))
                }
            </div>

            <h2>Series</h2>
            <div className="dashboard__genre-list">
                {
                    dashboardTvData.data && dashboardTvData.data.map((data: any) => (
                        <DashboardGenre data={data} key={data.name} />

                    ))
                }
            </div>
        </main>
    )
}
