import React from 'react';
import ReactDOM from 'react-dom';


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
                <button onClick={this.handleHyva}>Hyvä</button>
                <button onClick={this.handleNeutral}>Neutraali</button>
                <button onClick={this.handleHuono}>Huono</button>
                <h1>Statistiikka</h1>
                <p>Hyvä {this.state.hyva}</p>
                <p>Neutraali {this.state.neutral}</p>
                <p>Huono {this.state.huono}</p>
                <p>Keskiarvo {this.state.keskiarvo}</p>
                <p>Positiivisia {this.state.prosentti}</p>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
