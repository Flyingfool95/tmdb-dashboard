import { useGlobalConstants } from "../state/useGlobalConstants"

export default function MediaCard({ movie }: { movie: any }) {

    const { TMDB_IMAGE_BASE_URL, TMDB_IMAGE_SIZE_THUMBNAIL } = useGlobalConstants()


    return (
        <div className="media-card">
            <img src={TMDB_IMAGE_BASE_URL + TMDB_IMAGE_SIZE_THUMBNAIL + movie.poster_path} alt={`${movie.title} poster`} />
            <h4>{movie.title} - ({movie.release_date?.slice(0, 4)})</h4>
        </div>
    )
}
