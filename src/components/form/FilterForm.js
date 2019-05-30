import React, { Component } from 'react';
import { Button, Collapse, Card, CardHeader, CardBody } from 'reactstrap';
import GenerationList from './GenerationList';
import TypeList from './TypeList';
import PokemonSearch from './PokemonSearch';

class FilterForm extends Component {
  constructor(props) {
    super(props);
    this.state = { collapse: false };
    this.toggle = this.toggle.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleGenChange = this.handleGenChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  handleSearchChange(generation) {
    this.props.onSearchChange(generation);
  }

  handleGenChange(generation) {
    this.props.onGenChange(generation);
  }

  handleTypeChange(type) {
    this.props.onTypeChange(type);
  }

  render() {
    return (
      <Card style={{ width: '80vw', margin: '0 auto', marginBottom: '1%' }}>
        <CardHeader>
          <Button color='none' size='sm' block onClick={this.toggle}>
            Filter Pokemon <i className='fas fa-search' />
          </Button>
        </CardHeader>
        <Collapse isOpen={this.state.collapse}>
          <CardBody>
            <PokemonSearch onSearchChange={this.handleSearchChange} />
            <GenerationList onGenChange={this.handleGenChange} />
            <TypeList onTypeChange={this.handleTypeChange} />
          </CardBody>
        </Collapse>
      </Card>
    );
  }
}

export default FilterForm;
