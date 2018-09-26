import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

const Maat = (props) => {
  let lkm = props.tila.filtered.length;
  if (lkm === 0) {
    return (
      <p>No countries found, specify another filter</p>
    )
  }
  else if (lkm === 1) {
    let country = props.tila.filtered[0];
    return (
      <div>
        <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <img src={country.flag} alt="Flag" height="100" width="180" />
      </div>
    )
  }
  else if (lkm > 10) {
    return (
      <p>too many maches, specify another filter</p>
    )
  }
  else {
    return (
      <table>
        <tbody>
          {props.tila.filtered.map((country) => <tr key={country.name} onClick={props.handleClick}><td id={country.name}>{country.name}</td></tr>)}
        </tbody>
      </table>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      country: '',
      image: '',
      filtered: []
    }
  }

  handleFilterChange = (event) => {
    let name = event.target.value;
    this.setState({ country: name });
    let filteredList = [];
    if (name === '') {
      filteredList = [];
    }
    else {
      filteredList = this.state.countries.filter((c) => c.name.toUpperCase().includes(name.toUpperCase()));
    }
    this.setState({ filtered: filteredList });
  }

  handleClick = () => {
    return (event) => {
      let name = event.target.id;
      let filteredList = this.state.countries.filter((c) => c.name.toUpperCase().includes(name.toUpperCase()));
      this.setState({ filtered: filteredList });
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  render() {
    return (
      <div>
        <h1>Maat</h1>
        <p>Find countries: <input value={this.state.country} onChange={this.handleFilterChange} /></p>
        <Maat tila={this.state} handleClick={this.handleClick()} />
      </div>
    );
  }
}

export default App;
