import ErrorMessage from "../components/errorMessage/ErrorMessage";
import Spinner from "../components/spiner/Spinner";
import Skeleton from "../components/skeleton/Skeleton";

const setContent = (process, Component, data, load = true) => {
    switch (process) {
        case 'waiting':
            return <Skeleton/>
        case "loading": 
            return load ? <Spinner/> :  <Component data={data}/>
        case "confirmed":
            return <Component data={data}/>
        case 'error':
            return <ErrorMessage/>
        default: 
            throw new Error('unexpected process state')
    }
}

export default setContent