import circle from '../assets/images/game/circle.svg'
import cross from '../assets/images/game/cross.svg'

const HomePage = () => {
    return (
        <div>
            <h1 className="text-3xl font-semibold">
                Hello world!
            </h1>

            <img src={circle} alt={"Circle"} />
            <img src={cross} alt={"Cross"} />
        </div>
    );
};

export default HomePage;