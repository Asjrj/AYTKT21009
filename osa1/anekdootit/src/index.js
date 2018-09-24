import React from 'react'
import ReactDOM from 'react-dom'


const Aanestetyin = (props) => {
    let summa = 0;
    let aanestetyin = 0;
    let aaniMaara = 0;
    let aanet = props.tila.votes;

    for (let i = 0; i < aanet.length; i++) {
        summa = summa + aanet[i];
        if (aanet[i] > aaniMaara) {
            aaniMaara = aanet[i];
            aanestetyin = i;
        }
    }

    if (summa === 0) {
        return (
            <p>No votes have been given yet!</p>
        )
    }
    else {
        return (
            <div>
            <h2>Anecdote with most votes:</h2>
            <p>{anecdotes[aanestetyin]}</p>
            <p>has {aaniMaara} votes</p>
            </div>
        )
    }
}


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            votes: [0, 0, 0, 0, 0, 0]
        }
    }

    showRandom = () => {
        this.setState({ selected: Math.floor(Math.random() * 6) });
    }

    voteThisOne = () => {
        let lista = this.state.votes;
        let index = this.state.selected;
        lista[index] = lista[index] + 1;
        this.setState({ votes: lista });
    }

    render() {
        return (
            <div>
                <p>{this.props.anecdotes[this.state.selected]}</p>
                <p>has {this.state.votes[this.state.selected]} votes</p>
                <button onClick={this.voteThisOne}>Vote</button>
                <button onClick={this.showRandom}>Next anecdote</button>
                <Aanestetyin tila={this.state} />
            </div>
        )
    }
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)