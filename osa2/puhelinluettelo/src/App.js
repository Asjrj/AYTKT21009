import React from 'react';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleAdd = (event) => {
    event.preventDefault();
    const newPerson = {name: this.state.newName};
    const newPersons = this.state.persons.concat(newPerson);
    this.setState({persons: newPersons});
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form>
          <div>
            nimi: <input value={this.state.newName} onChange={this.handleNameChange}/>
          </div>
          <div>
            <button type="submit" onClick={this.handleAdd}>lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <ul>
        {this.state.persons.map((person) => <li key={person.name}>{person.name}</li>)}
        </ul>
      </div>
    )
  }
}

export default App;
