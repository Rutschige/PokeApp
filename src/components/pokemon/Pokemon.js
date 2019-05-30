import React, { Component } from 'react';
import { Card, CardBody, CardHeader, CardText, Button } from 'reactstrap';

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isBack: false,
      isShiny: false
    };
    this.handleSpriteClick = this.handleSpriteClick.bind(this);
    this.handleShinyClick = this.handleShinyClick.bind(this);
    this.renderSprite = this.renderSprite.bind(this);
    this.renderType = this.renderType.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.pokemon !== prevProps.pokemon) {
      this.setState({ isBack: false, isShiny: false });
    }
  }

  handleSpriteClick() {
    this.setState(prevState => ({
      isBack: !prevState.isBack
    }));
  }

  handleShinyClick() {
    this.setState(prevState => ({
      isShiny: !prevState.isShiny
    }));
  }

  renderSprite(pokemon) {
    const { isBack, isShiny } = this.state;
    if (isBack) {
      if (isShiny) {
        return <img src={pokemon.sprites.back_shiny} alt='back_shiny' />;
      } else {
        return <img src={pokemon.sprites.back_default} alt='back_default' />;
      }
    } else {
      if (isShiny) {
        return <img src={pokemon.sprites.front_shiny} alt='front_shiny' />;
      } else {
        return <img src={pokemon.sprites.front_default} alt='front_default' />;
      }
    }
  }

  renderType(pokemon) {
    const types = pokemon.types;
    if (types.length !== 1) {
      return (
        <>
          {types[0].type.name}, {types[1].type.name}
        </>
      );
    } else {
      return <>{types[0].type.name}</>;
    }
  }

  renderShinyButton() {
    const { isShiny } = this.state;
    if (isShiny) {
      return (
        <Button
          color='none'
          size='sm'
          style={{ color: 'gold' }}
          onClick={() => this.handleShinyClick()}>
          <i className='fas fa-star' />
        </Button>
      );
    } else {
      return (
        <Button
          color='none'
          size='sm'
          style={{ color: 'black' }}
          onClick={() => this.handleShinyClick()}>
          <i className='fas fa-star' />
        </Button>
      );
    }
  }

  render() {
    const pokemon = this.props.pokemon;
    return (
      <Card
        style={{
          margin: '0 auto',
          textTransform: 'capitalize',
          height: '250px',
          width: '300px'
        }}>
        <CardHeader>
          {pokemon.id}: {pokemon.name} {this.renderShinyButton()}
        </CardHeader>
        <CardBody>
          <Button color='none' onClick={() => this.handleSpriteClick()}>
            {this.renderSprite(pokemon)}
          </Button>
          <CardText>Type: {this.renderType(pokemon)}</CardText>
        </CardBody>
      </Card>
    );
  }
}

export default Pokemon;
