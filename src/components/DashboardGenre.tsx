import { Link } from 'react-router-dom';
import '../styling/components/dashboardGenre.scss';
import MediaCard from './MediaCard';

export default function DashboardGenre({
    data
}: {
    data: {
        name: string,
        data: any[],
        totalPages: number,
        totalResults: number
    }
}) {

    return (
        <div className="dashboard-genre">
            <Link to={`/genres/${data.name}`} className='dashboard-genre__title card-hover'>
                <h3>{data.name}</h3>
                <p className='dashboard-genre__total'>({data.totalResults})</p>
            </Link>
            {
                data.data && data.data.map((media: any) => (
                    <MediaCard key={media.id} media={media} />
                ))
            }
        </div>
    )
}
