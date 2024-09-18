import '../styling/footer.scss';

export default function Footer() {
    return (
        <div className='footer'>

            <a href="https://www.themoviedb.org/" target="_blank">
                <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_2-9665a76b1ae401a510ec1e0ca40ddcb3b0cfe45f1d51b77a308fea0845885648.svg" alt="TMDB Logo" width={200} />
            </a>

            <p>This  site uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB.</p>
        </div>
    )
}
