

import xMen from '../../resources/img/x-men.png';
import './singleComic.scss'
import { useState, useEffect } from "react";

import Spinner from '../spiner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from "../../services/MarvelService";
import {useParams, Link} from 'react-router-dom'


const SingleCharPage = ({data}) => {
    
    const {thumbnail, title, description} = data
    
    return (
        <div className="single-comic">
                <img src={thumbnail} alt={title} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                </div>
                <Link to="/characters/" className="single-comic__back">Back to characters</Link>
            </div>
    )
}



export default SingleCharPage;