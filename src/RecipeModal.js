import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class RecipeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.name,
      ingredients: nextProps.ingredients,
      purpose: nextProps.purpose
    });
  }

  isForEditing() {
    return this.state.purpose === 'edit';
  }

  handleInputChange(e) {
    const newState = {};
    newState[e.target.id] = e.target.value;
    this.setState(newState);
  }

  handleUpdate() {
    const action = this.isForEditing() ? 'edit' : 'create';
    this.props.update({
      name: this.state.name,
      ingredients: this.state.ingredients
    }, action);
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{this.isForEditing() ? 'Edit Recipe' : 'Add a Recipe'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label htmlFor="name">Recipe</label>
          <input className="form-control" id="name" placeholder="Recipe Name" value={this.state.name} onChange={this.handleInputChange.bind(this)}/>
          <label htmlFor="ingredients">Ingredients</label>
          <textarea className="form-control" id="ingredients" rows="2" placeholder="Enter comma-separated list of ingredients"
            value={this.state.ingredients} onChange={this.handleInputChange.bind(this)}></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleUpdate.bind(this)} bsStyle="primary" className="pull-left">{this.isForEditing() ? 'Edit Recipe' : 'Add Recipe'}</Button>
          <Button onClick={this.props.onHide} className="pull-left">Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default RecipeModal;
