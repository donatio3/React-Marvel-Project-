import AppHeader from "../appHeader/AppHeader";
import { lazy, Suspense, useEffect, useState } from "react";

import Button from '@mui/material/Button';

import decoration from '../../resources/img/vision.png';

import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import Spinner from "../spiner/Spinner";
import SinglePage from "../pages/SinglePage";

const Page404 = lazy(() => import('../pages/404')) // загрузится когда
const MainPage = lazy(() => import('../pages/MainPage'))
const ComicsPage = lazy(() => import('../pages/ComicsPage'))
const SingleComicPage = lazy(() => import('../pages/SingleComicsPage'))
const SingleCharPage = lazy(() => import('../pages/SingleCharPage'))


const App = () => {

        return (
            <Router>
                <div className="app">

                    <AppHeader/>
                    <main>
                    
                        <Suspense fallback={<Spinner/>}>  
                            <Routes>
                                <Route element={<MainPage/>} path="/"/>
                                <Route element={<ComicsPage/>} path="/comics"/>
                                <Route element={<SinglePage Component={SingleComicPage} dataType='comic'/>} path="/comics/:id"></Route>
                                <Route element={<SinglePage Component={SingleCharPage} dataType='character'/>} path="/characters/:id"/>
                                <Route path="*" element={<Page404/>}/>
                            </Routes>
                        </Suspense>

                        <Button variant="contained">Hello world</Button>
                        <img className="bg-decoration" src={decoration} alt="vision"/>
                        
                    </main>
                </div>

            </Router>
        )
    
   
}

export default App;
