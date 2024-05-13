import './findChar.scss'
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage, ErrorMessage } from 'formik';
import useMarvelService from '../../services/MarvelService'
import { useState } from 'react';
import { Link } from 'react-router-dom';

import * as Yup from 'yup'


const FindChar = () => {
    const [char, setChar] = useState(null)

    const {getCharacterUseName, clearError, loading, error} = useMarvelService()

    const searchChar = (name) => {
        clearError();


        getCharacterUseName(name)
        .then((res) => {
            console.log(res, 'rssssss')
            setChar(res)
        })
    }

    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage/></div> : null;
    const result =!char ? null : char.length > 0 ?
        <div>
            <p className="done__title">There is! Visit {char[0].name} page? </p>
                <Link to={`/characters/${char[0].name}`}>
                    <button className="button button__secondary">
                        <div className="inner">TO PAGE</div>
                    </button>
                </Link>
        </div> : <p className="done__title">The character was not found. Check the name and try again </p>
            

    return (
        <>
            <div className="char__search">
                <p className="title">Or find a character by name:</p> 

                <Formik
                    initialValues = {{
                    charName: '',
                }} 
                validationSchema = {Yup.object({
                    charName: Yup.string().required('This field is required')
                })}
                onSubmit={ ({charName}) => {
                    searchChar(charName)
                }} 
                >

                    <Form action="character">
                            <div className="start__content">
                            <Field 
                                id="charName" 
                                name='charName' 
                                type='text' 
                                placeholder="Enter name"/>                                
                                <FormikErrorMessage className="error" name="charName" component="div"/>

                                <button type='submit' className="button button__main button__long">
                                    <div className="inner">FIND</div>
                                </button>
                            </div>


                            <div className="done__content">
                               {errorMessage} 
                               {result}
                            </div>
                    </Form> 
                </Formik>
            </div>     
        </>
    )
}

export default FindChar