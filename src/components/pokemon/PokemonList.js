import React, { Component } from 'react';
import Pokemon from './Pokemon';
import { Alert, Card, Row, Spinner } from 'reactstrap';
import Axios from 'axios';
import FilterForm from '../form/FilterForm';

class PokemonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: [],
      pokemonInfo: [],
      query: '',
      generation: 'All',
      type: 'all',
      apiCallsInProgress: 0,
      loading: false
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleGenChange = this.handleGenChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  async getPokemon() {
    this.setState({ apiCallsInProgress: this.state.apiCallsInProgress + 1 });
    await Axios.get('https://pokeapi.co/api/v2/pokemon/?limit=649')
      .then(response => {
        this.setState({
          pokemon: response.data.results,
          apiCallsInProgress: this.state.apiCallsInProgress - 1
        });
        this.state.pokemon.map(monster => (
          <>{this.getPokemonInfo(monster.url)}</>
        ));
      })
      .catch(error => {
        throw error;
      });
  }

  async getPokemonInfo(poke_url) {
    this.setState({ apiCallsInProgress: this.state.apiCallsInProgress + 1 });
    await Axios.get(poke_url)
      .then(response => {
        this.setState({
          pokemonInfo: [...this.state.pokemonInfo, response.data].sort((a, b) =>
            a.id > b.id ? 1 : -1
          ),
          apiCallsInProgress: this.state.apiCallsInProgress - 1
        });
      })
      .catch(error => {
        throw error;
      });
  }

  handleSearchChange(query) {
    this.setState({ query });
  }

  handleGenChange(generation) {
    this.setState({ generation });
  }

  handleTypeChange(type) {
    this.setState({ type });
  }

  componentDidMount() {
    this.getPokemon();
  }

  filterPokemon() {
    let { pokemonInfo, query, generation, type } = this.state;
    if (query !== '') {
      pokemonInfo = pokemonInfo.filter(function isPokemon(pokemon) {
        if (
          pokemon.name.includes(query.toLowerCase()) ||
          pokemon.id.toString() === query
        ) {
          return true;
        } else {
          return false;
        }
      });
    }
    switch (generation) {
      case 'Generation I':
        pokemonInfo = pokemonInfo.slice(0, 151);
        break;
      case 'Generation II':
        pokemonInfo = pokemonInfo.slice(151, 251);
        break;
      case 'Generation III':
        pokemonInfo = pokemonInfo.slice(251, 386);
        break;
      case 'Generation IV':
        pokemonInfo = pokemonInfo.slice(386, 493);
        break;
      case 'Generation V':
        pokemonInfo = pokemonInfo.slice(493, 649);
        break;
      default:
        break;
    }
    if (type !== 'all') {
      pokemonInfo = pokemonInfo.filter(function isType(pokemon) {
        if (pokemon.types[1]) {
          if (
            pokemon.types[0].type.name === type ||
            pokemon.types[1].type.name === type
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          if (pokemon.types[0].type.name === type) {
            return true;
          } else {
            return false;
          }
        }
      });
    }

    return pokemonInfo;
  }

  renderPokemonList() {
    let pokemonList = this.filterPokemon();
    if (pokemonList.length > 1) {
      return (
        <Card
          style={{
            margin: '0 auto',
            height: '70vh',
            width: '80vw',
            overflowY: 'scroll',
            display: 'flex',
            backgroundColor: '#eee'
          }}>
          <Row>
            {pokemonList.map((monster, index) => (
              <Pokemon key={index + 1} pokemon={monster} />
            ))}
          </Row>
        </Card>
      );
    } else if (!pokemonList.length) {
      return (
        <Alert color='info' style={{ textAlign: 'center', margin: '5%' }}>
          <h3>Oops!</h3>
          <hr />
          <p>No Pokemon Match This Criteria.</p>
        </Alert>
      );
    } else {
      return <Pokemon pokemon={pokemonList[0]} />;
    }
  }

  render() {
    const loading = this.state.apiCallsInProgress !== 0 || this.state.loading;

    return (
      <>
        {loading ? (
          <Spinner style={{ width: '10rem', height: '10rem', margin: '20%' }} />
        ) : (
          <>
            <FilterForm
              onSearchChange={this.handleSearchChange}
              onGenChange={this.handleGenChange}
              onTypeChange={this.handleTypeChange}
            />
            {this.renderPokemonList()}
          </>
        )}
      </>
    );
  }
}

export default PokemonList;
