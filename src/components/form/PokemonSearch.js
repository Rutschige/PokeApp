import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

class PokemonSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entry: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onSearchChange(event.target.value);
    this.setState({ entry: event.target.value });
  }

  render() {
    let { entry } = this.state;
    return (
      <FormGroup row>
        <Label>Name/Number:</Label>
        <Input type='text' bsSize='sm'
          value={entry}
          onChange={e => this.handleChange(e)}
        />
      </FormGroup>
    );
  }
}

export default PokemonSearch;
