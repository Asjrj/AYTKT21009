import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hyva: 0,
            neutral: 0,
            huono: 0
        };
    }

    handleHyva = () => {
        this.setState({ hyva: this.state.hyva + 1 })
    }

    handleNeutral = () => {
        this.setState({ neutral: this.state.neutral + 1 })
    }

    handleHuono = () => {
        this.setState({ huono: this.state.huono + 1 })
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
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
