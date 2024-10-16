import SearchEvents from './LocalEvents';
import Login from "./Login";


const Guest = () => {
    return (
        <div>
            <Login />
            <SearchEvents />
        </div>
    )
}

export default Guest