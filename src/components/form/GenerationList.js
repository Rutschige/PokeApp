import React, { Component } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

class GenerationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'All'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onGenChange(event.target.value);
    this.setState({ active: event.target.value });
  }

  render() {
    let { active } = this.state;
    const genSelect = (
      <Input type='select' bsSize='sm'
      value={active} onChange={e => this.handleChange(e)}>
        <option>All</option>
        <option>Generation I</option>
        <option>Generation II</option>
        <option>Generation III</option>
        <option>Generation IV</option>
        <option>Generation V</option>
      </Input>
    );
    return (
      <FormGroup row>
        <Label>Generation:</Label>
        {genSelect}
      </FormGroup>
    );
  }
}

export default GenerationList;
