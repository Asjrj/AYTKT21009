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
        return (
            <div>
                <h1>Statistiikka</h1>
                <Statistic teksti="Hyvä" arvo={props.hyva} />
                <Statistic teksti="Neutraali" arvo={props.neutraali} />
                <Statistic teksti="Huono" arvo={props.huono} />
                <Statistic teksti="Keskiarvo" arvo={props.keskiarvo} />
                <Statistic teksti="Positiivisia" arvo={props.prosentti} />
            </div>
        )
    }
}

// Statistic huolehtii yksittäisen tilastorivin, esim. keskiarvon näyttämisestä
const Statistic = (props) => (
    <p>{props.teksti} {props.arvo}</p>
)

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hyva: 0,
            neutral: 0,
            huono: 0,
            keskiarvo: 0,
            prosentti: 0
        };
    }

    handleHyva = () => {
        this.setState({ hyva: this.state.hyva + 1 });
        this.laskeKeskiarvo(this.state.hyva + 1, this.state.neutral, this.state.huono);
    }

    handleNeutral = () => {
        this.setState({ neutral: this.state.neutral + 1 });
        this.laskeKeskiarvo(this.state.hyva, this.state.neutral + 1, this.state.huono);
    }

    handleHuono = () => {
        this.setState({ huono: this.state.huono + 1 });
        this.laskeKeskiarvo(this.state.hyva, this.state.neutral, this.state.huono + 1);
    }

    laskeKeskiarvo = (arg1, arg2, arg3) => {
        let arvo = Math.round((arg1 - arg3) / (arg1 + arg2 + arg3) * 10) / 10;
        let pros = Math.round((arg1 / (arg1 + arg2 + arg3)) * 1000) / 10;
        this.setState({ keskiarvo: arvo });
        this.setState({ prosentti: pros });
    }

    render() {
        return (
            <div>
                <h1>Anna palautetta</h1>
                <Button handleClick={this.handleHyva} text="Hyvä" />
                <Button handleClick={this.handleNeutral} text="Neutraali" />
                <Button handleClick={this.handleHuono} text="Huono" />
                <Statistics
                    hyva={this.state.hyva}
                    neutraali={this.state.neutral}
                    huono={this.state.huono}
                    keskiarvo={this.state.keskiarvo}
                    prosentti={this.state.prosentti}
                />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
