import { Link } from 'react-router-dom';
import '../styling/components/dashboardGenre.scss';
import MediaCard from './MediaCard';
import useUtilityFunctions from '../hooks/useUtilityFunctions';

export default function DashboardGenre({
    data, mediaType
}: {
    data: {
        name: string,
        data: any[],
        totalPages: number,
        totalResults: number
    },
    mediaType: 'movies' | 'series',
}) {

    const { slugifyText } = useUtilityFunctions();

    return (
        <div className="dashboard-genre">
            <Link to={`/${mediaType}/genres/${slugifyText(data.name)}`} className='dashboard-genre__title card-hover'>
                <h3>{data.name}</h3>
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
