import React from 'react';
import './App.css';
import dataService from './services/persons'

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

const Rivi = (props) => {
  return (
    <tr >
      <td>{props.person.name}</td>
      <td>{props.person.number}</td>
      <td><button type="submit" onClick={props.handleRemove}>Poista</button></td>
    </tr>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
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
          id: 0,
          name: this.state.newName,
          number: this.state.newNumber
        };
        dataService.addPersonToServer(newPerson)
          .then(response => {
            newPerson.id = response.id;
            let newPersons = this.state.persons.concat(newPerson);
            this.setState({ persons: newPersons });
            this.filterPersons(this.state.filterName, newPersons);
          })
      }
    }
  }

  handleRemove = (person) => {
    return (event) => {
      event.preventDefault()
      if (window.confirm(`Poistetaanko ${person.name}`)){
        let otherPersons = this.state.persons.filter(n => n.id !== person.id)
        dataService.deletePerson(person.id)
        this.setState({ persons: otherPersons })
        this.filterPersons(this.state.filterName, otherPersons);
      }
    }
  }

  componentDidMount() {
    dataService.getPersons()
      .then(response => {
        this.setState({ persons: response })
      })
  }

  render() {
    let luettelo = []
    if (this.state.filteredPersons.length === 0)
      luettelo = this.state.persons
    else
      luettelo = this.state.filteredPersons

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <p>rajaa näytettäviä:
          <input value={this.state.filterName}
            onChange={this.handleFilterChange}
          /></p>
        <UusiHenkilo tila={this.state}
          handleNameChange={this.handleNameChange()}
          handleNumberChange={this.handleNumberChange()}
          handleAdd={this.handleAdd()} />
        <h2>Numerot</h2>
        <table>
          <tbody>
            {luettelo.map((person) => {
              return (<Rivi key={person.name} person={person} handleRemove={this.handleRemove(person)} />
              )
            }
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App;
