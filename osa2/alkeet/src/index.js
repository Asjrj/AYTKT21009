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
    let riveja = props.kurssi.osat.reduce((x, osa) => x + osa.tehtavia, 0);

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
    const kurssit = [
        {
            nimi: 'Half Stack -sovelluskehitys',
            id: 1,
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
                }
            ]
        },
        {
            nimi: 'Node.js',
            id: 2,
            osat: [
                {
                    nimi: 'Routing',
                    tehtavia: 3,
                    id: 1
                },
                {
                    nimi: 'Middlewaret',
                    tehtavia: 7,
                    id: 2
                }
            ]
        }
    ]

    let kursseja = () => kurssit.map((kurssi) => <Kurssi key={kurssi.id} kurssi={kurssi} />);
    
    return (
        <div>
            <h1>Opetusohjelma</h1>
            {kursseja()}
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
