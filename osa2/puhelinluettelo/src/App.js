import React from 'react';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' }
      ],
      newName: '',
      newNumber: ''
    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleAdd = (event) => {
    event.preventDefault();
    let namesFound = this.state.persons.filter((x) => x.name === this.state.newName);
    if (namesFound.length === 0) {
      let newPerson = {
        name: this.state.newName,
        number: this.state.newNumber,
      };
      const newPersons = this.state.persons.concat(newPerson);
      this.setState({ persons: newPersons });
    }
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form>
          <div>
            <p>nimi: <input value={this.state.newName} onChange={this.handleNameChange} /></p>
            <p>numero: <input value={this.state.newNumber} onChange={this.handleNumberChange} /></p>
          </div>
          <div>
            <button type="submit" onClick={this.handleAdd}>lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <table>
          <tbody>
            {this.state.persons.map((person) => <tr key={person.name}><td>{person.name}</td><td>{person.number}</td></tr>)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App;
