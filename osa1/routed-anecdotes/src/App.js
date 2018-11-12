import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Container, Table, Grid, Image, Button, Header, Form } from 'semantic-ui-react';

const menuStyle = {
  fontFamily: 'Arial, Verdana',
  color: 'green',
  backgroundColor: '#DDDDDD',
  fontSize: 16,
  marginBottom: 10,
  padding: 5
}
const activeMenuStyle = {
  fontFamily: 'Arial, Verdana',
  fontWeight: 'bold',
  color: 'dark-green',
  fontSize: 16,
}
const Menu = () => (
  <div style={menuStyle}>
    <NavLink exact to="/" activeStyle={activeMenuStyle}>anecdotes </NavLink> &nbsp;
    <NavLink exact to="/create" activeStyle={activeMenuStyle}>create new</NavLink> &nbsp;
    <NavLink exact to="/about" activeStyle={activeMenuStyle}>about</NavLink>
  </div>
)

const notificationStyle = {
  color: 'green',
  fontFamily: 'Arial, Verdana',
  fontSize: 16,
  border: '1px solid black',
  borderRadius: 10,
  margin: 5,
  padding: 5
}
const Notification = ({ notification }) => (
  <div>
    {notification
      ? <div style={notificationStyle}>{notification}</div>
      : <div></div>
    }
  </div>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <Header as='h2'>Anecdotes</Header>
    <Table striped size='large'>
      <Table.Body>
        {anecdotes.map(anecdote =>
          <Table.Row key={anecdote.id}>
            <Table.Cell>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </Table.Cell>
          </Table.Row>)}
      </Table.Body>
    </Table>
  </div>
)
const AnecdoteDetails = ({ anecdote }) => (
  <Container text>
    <Header as='h2'>{anecdote.content}</Header>
    <p>has {anecdote.votes} votes</p>
    <p>{anecdote.author}</p>
    <a href={anecdote.info}>{anecdote.info}</a>
  </Container>
)

const About = () => (
  <div>
    <Header as='h2'>About anecdote app</Header>
    <Grid columns={2} divided>
      <Grid.Row>
        <Grid.Column width={12}>
          <p>According to Wikipedia:</p>
          <em>An anecdote is a brief, revealing account of an individual person or an incident.
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>
          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </Grid.Column>
        <Grid.Column width={4}>
          <Image src='DennisRitchie.jpg' />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
)

const Footer = () => (
  <div>
    <br></br>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
    this.props.notify(`a new anecdote ${this.state.content} created`, 10)
  }

  render() {
    return (
      <div>
        <Header as='h2'>Create a new anecdote</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Content</label>
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>Author</label>
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>Url for more info</label>
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </Form.Field>
          <Button basic color='black'>Create</Button>
        </Form>
      </div>
    )
  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  notify = (message, sec) => {
    this.setState({ notification: message })
    setTimeout(() => {
      this.setState({ notification: '' })
    }, sec * 1000)
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) })
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  h1Style = {
    marginTop: 10
  }
  render() {
    return (
      <Container>
        <Router>
          <div>
            <Header as='h1' style={this.h1Style}>Software anecdotes</Header>
            <Menu />
            <Notification notification={this.state.notification} />
            <Route exact path="/" render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route path="/about" render={() => <About />} />
            <Route path="/create" render={({ history }) => <CreateNew history={history} addNew={this.addNew} notify={this.notify} />} />
            <Route exact path="/anecdotes/:id" render={({ match }) =>
              <AnecdoteDetails anecdote={this.anecdoteById(match.params.id)} />}
            />
            <Footer />
          </div>
        </Router>
      </Container >
    )
  }
}

export default App
