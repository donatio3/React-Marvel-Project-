import xMen from '../../resources/img/x-men.png';
import './singleComic.scss'
import { useState, useEffect } from "react";

import Spinner from '../spiner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from "../../services/MarvelService";
import {useParams, Link} from 'react-router-dom'
import { Helmet } from 'react-helmet';


const SingleComicPage = ({data}) => {

    const {thumbnail, title, description, pageCount, price, language} = data

    return (
        <>
            <div className="single-comic">
                <Helmet>
                    <meta
                        name="description"
                        content={`Page with selected comic: ${title}`}/>
                    <title>{title}</title>
                    <link rel="shortcut icon" href={thumbnail} />
                </Helmet>
                
                <img src={thumbnail} alt={title} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    <p className="single-comic__descr">{pageCount}</p>
                    <p className="single-comic__descr">{language}</p>
                    <div className="single-comic__price">{price}</div>
                </div>
                <Link to="/comics" className="single-comic__back">Back to all</Link>
            </div>
        </>
    )
}

export default SingleComicPage;