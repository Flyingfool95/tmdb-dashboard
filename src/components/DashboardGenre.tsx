import MediaCard from "./MediaCard"

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
            <h3>{data.name} - ({data.totalResults})</h3>
            {
                data.data && data.data.map((movie: any) => (
                    <MediaCard key={movie.id} movie={movie} />
                ))
            }
        </div>
    )
}
