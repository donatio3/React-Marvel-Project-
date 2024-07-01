import { useState, useEffect } from "react";
import './charInfo.scss';

import Spinner from '../spiner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from "../../services/MarvelService";

import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const CharInfo = (props) =>  {
    const [char, setChar] = useState(null)

    const {loading, error, getCharacter, clearError} = useMarvelService()

    useEffect(() => {
        updateChar();    
    }, [props])

   
    

    const updateChar = () => {
        clearError() // очищаем ошибку чтобы если была ошибка, можно было нажать на другого персонажа
        const charId = props.charId

        if (!charId) return 

        getCharacter(charId)
            .then(onCharListLoaded)
    }

    const onCharListLoaded = (char) => {
        setChar(char)
    }

        const skeleton = char || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;


        return (
            <div className="char__info">
                {content}
                {errorMessage}
                {spinner}
                {skeleton}
            </div>
        )
    }


const View = ({char}) => {


    const {name, description, thumbnail, homepage, wiki, comics} = char

    let imgStyle = {'objectFit': 'cover'}
    if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        imgStyle = {'objectFit': 'contain'}
    }

    return (
            <>
                <div className="char__basics">
                    <img style={imgStyle} src={thumbnail} alt="abyss"/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="char__descr">
                    {description}                
                </div>

                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.length > 0 ? null : <h2>There are no comics</h2>}
                    {
                        comics.map((item, i) => {
                            if (i < 9) {
                                const comicId = item.resourceURI.slice(43)
                                return (
                                    <Link to={`/comics/${comicId}`} key={i} className="char__comics-item">
                                        {item.name}
                                    </Link>
                                )
                            }
                         })
                    }
                </ul>
            </>
    )
}


export default CharInfo;