import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

class TypeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'all'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onTypeChange(event.target.value);
    this.setState({ active: event.target.value });
  }

  render() {
    const typeList = [
      'all',
      'bug',
      'dark',
      'dragon',
      'electric',
      'fighting',
      'fire',
      'flying',
      'ghost',
      'grass',
      'ground',
      'ice',
      'normal',
      'poison',
      'psychic',
      'rock',
      'steel',
      'water'
    ];
    let { active } = this.state;
    const typeSelect = (
      <Input type='select' bsSize='sm'
      value={active} onChange={e => this.handleChange(e)}>
        {typeList.map(type => (
          <option value={type} key={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </Input>
    );
    return (
      <FormGroup row>
        <Label>Type:</Label>
        {typeSelect}
      </FormGroup>
    );
  }
}

export default TypeList;
