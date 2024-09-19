import { Link } from 'react-router-dom';
import '../styling/components/dashboardGenre.scss';
import MediaCard from './MediaCard';

export default function DashboardGenre({
    data, mediaType
}: {
    data: {
        genre: string,
        genreId: number,
        data: any[],
        totalPages: number,
        totalResults: number
    },
    mediaType: 'movies' | 'series',
}) {

    return (
        <div className="dashboard-genre">
            <Link to={`/${mediaType}/genre/${data.genreId}`} className='dashboard-genre__title card-hover'>
                <h3>{data.genre}</h3>
                <p className='dashboard-genre__total'>({data.totalResults})</p>
            </Link>
            {
                data.data && data.data.map((media: any) => (
                    <MediaCard key={media.id} media={media} mediaType={mediaType} />
                ))
            }
        </div>
    )
}
