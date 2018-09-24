import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';

const Kurssi = (props) => {
    return (
        <div>
            <Otsikko kurssi={props.kurssi} />
            <Sisalto kurssi={props.kurssi} />
        </div>
    )
}

const Otsikko = (props) => {
    return (
        <h1>{props.kurssi.nimi}</h1>
    )
}

const Sisalto = (props) => {
    const rivit = () => props.kurssi.osat.map((osa) => <Osa key={osa.id} osa={osa} />);
    var riveja = 0;
    for (var i = 0, j = props.kurssi.osat.length; i < j; i++) {
        riveja += props.kurssi.osat[i].tehtavia;
    }

    return (
        <div>
            {rivit()}
            <p>yhteensä {riveja} tehtävää</p>
        </div>
    )
}

const Osa = (props) => {
    return (
        <p>{props.osa.nimi} {props.osa.tehtavia}</p>
    )
}

const App = () => {
    const kurssi = {
        nimi: 'Half Stack -sovelluskehitys',
        osat: [
            {
                nimi: 'Reactin perusteet',
                tehtavia: 10,
                id: 1
            },
            {
                nimi: 'Tiedonvälitys propseilla',
                tehtavia: 7,
                id: 2
            },
            {
                nimi: 'Komponenttien tila',
                tehtavia: 14,
                id: 3
            },
            {
                nimi: 'Redux',
                tehtavia: 7,
                id: 4
            }
        ]
    }

    return (
        <div>
            <Kurssi kurssi={kurssi} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
