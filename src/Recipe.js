import React, { Component } from 'react';
import { Panel, Button } from 'react-bootstrap';
import './Recipe.css';

class Recipe extends Component {
  getIngredients() {
    return this.props.ingredients.split(',').map((ingredient, i) => <li key={i}>{ingredient}</li>);
  }

  handleDelete() {
    this.props.update(null, 'delete');
  }

  render() {
    return (
      <Panel collapsible bsStyle="success" className="recipe" header={this.props.name} onSelect={this.props.onSelect}>
        <h4>Ingredients</h4>
        <ul>{this.getIngredients()}</ul>
        <Button bsStyle="danger" onClick={this.handleDelete.bind(this)}>Delete</Button>
        <Button onClick={this.props.edit}>Edit</Button>
      </Panel>
    );
  }
}

export default Recipe;
