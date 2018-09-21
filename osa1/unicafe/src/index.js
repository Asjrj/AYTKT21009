import React from 'react';
import ReactDOM from 'react-dom';


// Button vastaa yksittäistä palautteen antonappia
const Button = (props) => (
    <button onClick={props.handleClick}> {props.text}</button>
)

// Statistics huolehtii tilastojen näyttämisestä
const Statistics = (props) => {
    if (props.hyva === 0 && props.neutraali === 0 && props.huono === 0) {
        return (
            <div>
                <h1>Statistiikka</h1>
                <p>Ei yhtään palautetta annettu</p>
            </div>
        )
    } else {
        let keskiarvo = Math.round((props.hyva - props.huono) /
            (props.hyva + props.neutraali + props.huono) * 10) / 10;
        let prosentti = Math.round(props.hyva / (props.hyva + props.neutraali + props.huono) * 1000) / 10;
        return (
            <div>
                <h1>Statistiikka</h1>
                <table><tbody>
                <Statistic teksti="Hyvä" arvo={props.hyva} />
                <Statistic teksti="Neutraali" arvo={props.neutraali} />
                <Statistic teksti="Huono" arvo={props.huono} />
                <Statistic teksti="Keskiarvo" arvo={keskiarvo} />
                <Statistic teksti="Positiivisia" arvo={prosentti} />
                </tbody></table>
            </div>
        )
    }
}

// Statistic huolehtii yksittäisen tilastorivin, esim. keskiarvon näyttämisestä
const Statistic = (props) => (
    <tr><td>{props.teksti}</td><td>{props.arvo}</td></tr>
)


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hyva: 0,
            neutral: 0,
            huono: 0
        };
    }

    handleClick = (tila) => {
        const toiminto = () => {
            this.setState({ [tila]: this.state[tila] + 1 });
        }
        return toiminto;
    }

    render() {
        return (
            <div>
                <h1>Anna palautetta</h1>
                <Button handleClick={this.handleClick('hyva')} text="Hyvä" />
                <Button handleClick={this.handleClick('neutral')} text="Neutraali" />
                <Button handleClick={this.handleClick('huono')} text="Huono" />
                <Statistics
                    hyva={this.state.hyva}
                    neutraali={this.state.neutral}
                    huono={this.state.huono}
                />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
