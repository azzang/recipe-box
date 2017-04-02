import React, { Component } from 'react';
import { Accordion, Button } from 'react-bootstrap';
import Recipe from './Recipe';
import RecipeModal from './RecipeModal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      recipes: []
    };
  }

  componentDidMount() {
    if (localStorage && localStorage.getItem('recipes')) {
      this.setState({recipes: JSON.parse(localStorage.getItem('recipes'))});
    }
  }

  updateRecipes(newRecipe, action) {
    const newRecipes = this.state.recipes.slice();
    this.update(action, newRecipe, newRecipes);
    this.setState({recipes: newRecipes});
    if (localStorage) {
      localStorage.setItem('recipes', JSON.stringify(newRecipes));
    }
    this.closeModal();
  }

  update(action, recipe, recipes) {
    switch (action) {
      case 'create':
        return recipes.push(recipe);
      case 'edit':
        return recipes[this.state.recipeIndex] = recipe;
      case 'delete':
        return recipes.splice(this.state.recipeIndex, 1);
      default: return;
    }
  }

  getRecipe(recipe, index) {
    return <Recipe key={index} update={this.updateRecipes.bind(this)} edit={this.openModal.bind(this, 'edit')}
      onSelect={this.noteCurrentRecipe.bind(this, index)} {...recipe} />;
  }

  getRecipes() {
    return this.state.recipes.map(this.getRecipe.bind(this));
  }

  noteCurrentRecipe(index) {
    this.setState({ recipeIndex: index });
  }

  openModal(modalPurpose) {
    const editing = (modalPurpose === 'edit');
    const recipe = this.state.recipes[this.state.recipeIndex];
    this.setState({
      showModal: true,
      modalPurpose,
      recipeName: editing ? recipe.name : '',
      recipeIngredients: editing ? recipe.ingredients : ''
    });
  }

  closeModal() {
    this.setState({
      showModal: false,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Accordion>{this.getRecipes()}</Accordion>
            <Button bsStyle="primary" bsSize="large" onClick={this.openModal.bind(this, 'create')}>Add Recipe</Button>
            <RecipeModal show={this.state.showModal} name={this.state.recipeName} ingredients={this.state.recipeIngredients}
              purpose={this.state.modalPurpose} onHide={this.closeModal.bind(this)} update={this.updateRecipes.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
