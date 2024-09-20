import usePathname from "../hooks/usePathname";
import MediaCard from "./MediaCard";

export default function MediaGrid({ media }: { media: any }) {

    const { mediaType } = usePathname();

    return (
        <div className="media-grid">
            {
                media && media.map((item: any) => (
                    <MediaCard key={item.id} media={item} mediaType={mediaType} />
                ))
            }
        </div>
    )
}
