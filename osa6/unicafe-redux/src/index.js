import ReactDOM from 'react-dom/client'
import Reducer from './reducer'
import { createStore } from 'redux'

const store = createStore(Reducer)

const App = () => {
    const handler = (type) => {
        console.log(type)
        store.dispatch({ type })
    }

    return (
        <div>
            <div>
                <button onClick={() => handler('GOOD')}>Good</button> 
                <button onClick={() => handler('OK')}>Ok</button> 
                <button onClick={() => handler('BAD')}>Bad</button>
                <button onClick={() => handler('ZERO')}>Reset</button>
            </div>
            <div>
                <p>good {store.getState().good}</p>
                <p>ok {store.getState().ok}</p>
                <p>bad {store.getState().bad}</p>
            </div>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)