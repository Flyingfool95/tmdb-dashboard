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
            <Link to={`/genres/${data.name}`} className='dashboard-genre__title'><h3>{data.name} - ({data.totalResults})</h3></Link>
            {
                data.data && data.data.map((media: any) => (
                    <MediaCard key={media.id} media={media} />
                ))
            }
        </div>
    )
}
