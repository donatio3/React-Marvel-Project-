import { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"

import useMarvelService from "../../services/MarvelService"

import avengers from '../../resources/img/Avengers.png'
import avengersLogo from '../../resources/img/Avengers logo.png'
import xMen from '../../resources/img/x-men.png';

import './comics.scss'
import Spinner from "../spiner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";


const ComicsList = () => {
    const [comicsList, setComicsList] = useState([])
    const [offset, setOffset] = useState(9)
    const {loading, error, getComics, getAllComics} = useMarvelService()
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [endedChar, setEndedChar] = useState(false)

    useEffect(() => {
        loadComics(offset, true)
    }, [])

    const loadComics = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)

        getAllComics(offset)
        .then(updateComics)
        setOffset(offset => offset + 9)
    }
    
    const updateComics = (res) => {
        if (res.length < 8) {
            setEndedChar(true)
        }

        setComicsList(comicsList => [...comicsList, ...res])
        setNewItemLoading(false)
        console.log(res, 'resss')
    }

    function renderItems (arr) {
        const items = arr.map((item) => {
            return (
                <li className="comics__item" key={item.id}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }
    
    const items = renderItems(comicsList)

    const loadingSpinner = loading && !newItemLoading ? <Spinner/> : null
    const errorMessage = error ? <ErrorMessage/> : null
    const content = items ? items : null

    return (
        <>
            <div className="comics">
                <div className="comics__header">
                    <div className="icon-heroes">
                        <img src={avengers} alt="avengers heroes" />
                    </div>

                    <div className="descr">
                    New comics every week! <br/> Stay tuned!
                    </div>

                    <div className="icon-avengers">
                        <img src={avengersLogo} alt="logo" />
                    </div>
                </div>


                <div className="comics__list">
                    <div className="comics__grid">
                        {content}
                        {loadingSpinner}
                        {errorMessage}
                    </div>
                </div>

                <button style={{display: endedChar ? 'block' : 'none'}} disabled={newItemLoading} onClick={() => loadComics(null, false)} className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>    
            </div>       
        </>
    )

}

export default ComicsList