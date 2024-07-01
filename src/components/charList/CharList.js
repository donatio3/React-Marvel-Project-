import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

import React, { useMemo } from 'react';
import { useState, useEffect, useRef } from 'react';
import { Transition, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

import setContent from '../../utils/setContent';
import Spinner from '../spiner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';


const CharList = (props) => {
    const [charList, setCharList] = useState([])
   
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(10)

    const {process, setProcess, getAllCharacters} = useMarvelService()
    const myRef = React.createRef()


    // SCROLL LANDING   SCROLL LANDING  SCROLL LANDING  SCROLL LANDING  SCROLL LANDING 
    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            onRequest(offset, false)
        }
    }

    useEffect(() => {
        // document.addEventListener('scroll', scrollHandler)
        return function () {document.removeEventListener('scroll', scrollHandler)}
    }, [])

    // SCROLL LANDING   SCROLL LANDING  SCROLL LANDING  SCROLL LANDING  SCROLL LANDING 


    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .then(() => setProcess('confirmed'))
    }   

    const onCharListLoaded = (newCharList) => {

        const endedCharList = newCharList.length > 0 ? false : true 
    
        setCharList(charList => [...charList, ...newCharList])
        setNewItemLoading(endedCharList)
        setOffset(offset => offset + 9)
    }
        

    
    const itemsRef = useRef([])

    const focusOnItem = (id) => {
        // Я реализовал вариант чуть сложнее, и с классом и с фокусом
        // Но в теории можно оставить только фокус, и его в стилях использовать вместо класса
        // На самом деле, решение с css-классом можно сделать, вынеся персонажа
        // в отдельный компонент. Но кода будет больше, появится новое состояние
        // и не факт, что мы выиграем по оптимизации за счет бОльшего кол-ва элементов
        // По возможности, не злоупотребляйте рефами, только в крайних случаях

        itemsRef.current.forEach(item => item.classList.remove('char__item_selected'));
        itemsRef.current[id].classList.add('char__item_selected');
        itemsRef.current[id].focus();
    }
    
    
    function renderItems(arr) {        
        console.log('render items')
        const elements = arr.map((item, i) => {
            
            let imgStyle = {'objectFit': 'cover'}
            if (item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
                imgStyle = {'objectFit': 'contain'}
            }


            return (    
                        <li tabIndex={0} 
                            key={item.id}
                            ref={el => itemsRef.current[i] = el} // в массив itemsRef складываем ссылки на элементы
                            className={"char__item"}
                            onClick={() => {
                                props.onCharSelected(item.id)
                                focusOnItem(i)
                            }}
                            >

                            <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                            <div className="char__name">{item.name}</div>
                        </li>
                    )
        })

        return (
            <ul className='char__grid'>
                {elements}
            </ul>
        )
    }


        const elements = useMemo(() => {
            return setContent(process, () => renderItems(charList), newItemLoading, false)
        }, [process])

        return (
            <div className="char__list">
                
                {elements}

                <button disabled={newItemLoading} onClick={() => {
                    onRequest(offset, false)
                }} className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>

                {/* {photos.map(photo => {
                    return (
                        <div className="photo">
                            <div className="title">{photo.id} {photo.title}</div>
                            <img src={photo.thumbnailUrl} alt="" />
                         </div>
                    )
                    
                })} */}
            </div>
        )
}



export default CharList;




// import { hot } from "react-hot-loader";
// import { Action, withStatechart } from "react-automata";

// export const statechart = {
//   // начальное состояние
//   initial: "attach",
//   // Список состояний
//   states: {

//     attach: {
//       on: {
//         READY: "fetching"
//       }
//     },

//     fetching: {
//       on: {
//         SUCCESS: {
//           listening: {
//             //Переходим в состояние listening по событию SUCCESS
//             //cond - pure функция, переводящая машину в указанное состояние, если возвращает правдивое значение
//             cond: extState => extState.hasMore
//           },
//           detach: {
//             cond: extState => !extState.hasMore
//           }
//         },

//         ERROR: "listening"

//       },
//       // fetch - событие, которое должно быть выполнено при входе в состояние fetching
//       onEntry: "fetch"
//     },

//     listening: {
//       on: {
//         SCROLL: "fetching"
//       }
//     },

//     detach: {}
//   }
// };

// class InfiniteScroll extends React.Component {
//   componentDidMount() {
//     // на mount нашего компонента переходим из начального состояния в fetching
//     this.attach();
//   }

//   attach() {
//     //навешиваем наш обработчик и переходим в состояние fetching
//     //возможна, конечно, и другая реализация этого перехода - зависит от требований к работе фичи
//     this.element.addEventListener("scroll", this.handleScroll);
//     this.props.transition("READY");
//   }

//   handleScroll = e => {
//     const { scrollTop, scrollHeight, clientHeight } = e.target;

//     const isCilentAtBottom = 0.9 * (scrollHeight - scrollTop) === clientHeight;

//     if (isCilentAtBottom) {
//       // Переход из listening в fetching
//       this.props.transition("SCROLL");
//     }
//   };

//   fetch() {
//     const { transition } = this.props;

//     loadTodos()
//       .then(res => res.json())
//       .then(data => transition("SUCCESS", { todos: data }))
//       .catch(() => transition("ERROR"));
//   }

//   render() {
//     // Action - компонент, который определяет, что должно рендериться для данного события
//     return (
//       <div
//         ref={element => {
//           this.element = element;
//         }}
//       >
//         <Action show="fetch">Loading...</Action>
//         <ul>
//           {this.props.todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
//         </ul>
//       </div>
//     );
//   }
// }

// InfiniteScroll.defaultProps = {
//   todos: []
// };

// const initialData = { todos: [], devTools: true };

// const StateMachine = withStatechart(statechart, initialData)(InfiniteScroll);

// // export {hot(module)(StateMachine)};