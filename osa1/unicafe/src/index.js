import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

// Button vastaa yksittäistä palautteen antonappia
const Button = (props) => (
  <button onClick={props.handleClick}> {props.text}</button>
)

// Statistics huolehtii tilastojen näyttämisestä
const Statistics = (props) => {
  if (store.getState().good === 0 && store.getState().ok === 0 && store.getState().bad === 0) {
    return (
      <div>
        <h1>Statistiikka</h1>
        <p>Ei yhtään palautetta annettu</p>
      </div>
    )
  } else {
    let keskiarvo = Math.round((store.getState().good - store.getState().bad) /
      (store.getState().good + store.getState().ok + store.getState().bad) * 10) / 10;
    let prosentti = Math.round(store.getState().good / (store.getState().good + store.getState().ok + store.getState().bad) * 1000) / 10;
    return (
      <div>
        <h1>Statistiikka</h1>
        <table><tbody>
          <Statistic teksti="Hyvä" arvo={store.getState().good} />
          <Statistic teksti="Neutraali" arvo={store.getState().ok} />
          <Statistic teksti="Huono" arvo={store.getState().bad} />
          <Statistic teksti="Keskiarvo" arvo={keskiarvo} />
          <Statistic teksti="Positiivisia" arvo={prosentti} />
        </tbody></table>
        <Button handleClick={props.reset} text="Nollaa tilasto" />
      </div>
    )
  }
}

// Statistic huolehtii yksittäisen tilastorivin, esim. keskiarvon näyttämisestä
const Statistic = (props) => (
  <tr><td>{props.teksti}</td><td>{props.arvo}</td></tr>
)

class App extends React.Component {

  reset = () => {
    store.dispatch({ type: 'RESET' })
  }

  render() {
    return (
      <div>
        <h1>Anna palautetta</h1>
        <Button handleClick={e => store.dispatch({ type: 'GOOD' })} text="Hyvä" />
        <Button handleClick={e => store.dispatch({ type: 'OK' })} text="Neutraali" />
        <Button handleClick={e => store.dispatch({ type: 'BAD' })} text="Huono" />
        <Statistics reset={this.reset}
        />
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}
renderApp()
store.subscribe(renderApp)