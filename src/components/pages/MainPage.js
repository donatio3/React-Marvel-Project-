import { useState } from "react";
import { Helmet } from "react-helmet";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import FindChar from "../findChar/FindChar.js";

import decoration from '../../resources/img/vision.png';


const MainPage = () => {

    console.log('render mainPage')
    const [selectedChar, setChar] = useState(null)

    const onCharSelected = (id) => {
        setChar(id)
    }


    return (
        <>
        <Helmet>
        <meta
            name="description"
            content="Web site created using create-react-app"/>
        <title>Marvel Information </title>


        </Helmet>
            <ErrorBoundary> 
                <RandomChar/>
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary>

                <div className="char__info-wrapper">
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>

                    <ErrorBoundary>
                        <FindChar/>
                    </ErrorBoundary>
                </div>
            </div>
        </>
    )
}

export default MainPage;