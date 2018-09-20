import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
    return (
        <h1>{props.arvo}</h1>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            <Osa osa={props.osa1} tehtavia={props.lkm1}/>
            <Osa osa={props.osa2} tehtavia={props.lkm2}/>
            <Osa osa={props.osa3} tehtavia={props.lkm3}/>
        </div>
    )
}

const Osa = (props) => {
    return (
        <p>{props.osa} {props.tehtavia}</p>
    )
}

const Yhteensa = (props) => {
    return (
        <p>yhteensä {props.tehtavia} tehtävää</p>
    )
}

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osa1 = 'Reactin perusteet'
    const tehtavia1 = 10
    const osa2 = 'Tiedonvälitys propseilla'
    const tehtavia2 = 7
    const osa3 = 'Komponenttien tila'
    const tehtavia3 = 14

    return (
        <div>
            <Otsikko arvo={kurssi} />
            <Sisalto
                osa1={osa1} lkm1={tehtavia1}
                osa2={osa2} lkm2={tehtavia2}
                osa3={osa3} lkm3={tehtavia3} />
            <Yhteensa tehtavia={tehtavia1 + tehtavia2 + tehtavia3} />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)