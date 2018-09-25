import React from 'react';
import './App.css';


const UusiHenkilo = (props) => {
  return (
    <form>
      <div>
        <h1>Lisää uusi</h1>
        <p>nimi: <input value={props.tila.newName} onChange={props.handleNameChange} /></p>
        <p>numero: <input value={props.tila.newNumber} onChange={props.handleNumberChange} /></p>
      </div>
      <div>
        <button type="submit" onClick={props.handleAdd}>lisää</button>
      </div>
    </form>
  )
}

const Luettelo = (props) => {
  if (props.tila.filteredPersons.length === 0) {
    return (
      <table>
        <tbody>
          {props.tila.persons.map((person) => <tr key={person.name}><td>{person.name}</td><td>{person.number}</td></tr>)}
        </tbody>
      </table>
    )
  }
  else {
    return (
      <table>
        <tbody>
          {props.tila.filteredPersons.map((person) => <tr key={person.name}><td>{person.name}</td><td>{person.number}</td></tr>)}
        </tbody>
      </table>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filterName: '',
      filteredPersons: []
    }
  }

  handleNameChange = () => {
    const toiminto = (event) => {
      this.setState({ newName: event.target.value })
    }
    return toiminto;
  }

  handleNumberChange = () => {
    return (event) => {
      this.setState({ newNumber: event.target.value })
    }
  }

  handleFilterChange = (event) => {
    this.setState({ filterName: event.target.value });
    this.filterPersons(event.target.value, this.state.persons);
  }

  filterPersons(name, personList) {
    let filteredList = [];
    if (name === '') {
      filteredList = personList;
    }
    else {
      filteredList = personList.filter((person) => person.name.toUpperCase().includes(name.toUpperCase()));
    }
    this.setState({ filteredPersons: filteredList });
  }

  handleAdd = () => {
    return (event) => {
      event.preventDefault();
      let namesFound = this.state.persons.filter((x) => x.name === this.state.newName);
      if (namesFound.length === 0) {
        let newPerson = {
          name: this.state.newName,
          number: this.state.newNumber,
        };
        let newPersons = this.state.persons.concat(newPerson);
        this.setState({ persons: newPersons });
        this.filterPersons(this.state.filterName, newPersons);
      }
    }
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <p>rajaa näytettäviä: <input value={this.state.filterName} onChange={this.handleFilterChange} /></p>
        <UusiHenkilo tila={this.state}
          handleNameChange={this.handleNameChange()}
          handleNumberChange={this.handleNumberChange()}
          handleAdd={this.handleAdd()} />
        <h2>Numerot</h2>
        <Luettelo tila={this.state} />
      </div>
    )
  }
}

export default App;
