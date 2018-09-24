import React from 'react';

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

export default Kurssi;