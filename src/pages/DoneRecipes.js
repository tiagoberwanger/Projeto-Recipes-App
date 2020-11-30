import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, FoodCard, DrinkCard } from '../components';

class DoneRecipes extends React.Component {
  constructor() {
    super();

    this.state = {
      type: 'all',
      drinkIndex: 0,
    };

    this.setFilterState = this.setFilterState.bind(this);
    this.setFilterIndex = this.setFilterIndex.bind(this);
  }

  componentDidMount() {
    const fourHundred = 450;
    if (window.screen.availWidth < fourHundred) {
      const h1 = document.querySelector('.global-h1');
      h1.style.fontSize = '35px';
      const bla = document.querySelector('.search-input-div');
      bla.style.width = '70px';
    }
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (recipes) {
      const foods = recipes.filter((element) => element.type === 'comida').length;
      this.setFilterIndex(foods);
    }
  }

  setFilterIndex(foods) {
    this.setState({
      drinkIndex: foods,
    });
  }

  setFilterState({ target: { id } }) {
    this.setState({
      type: id,
    });
  }

  render() {
    const { history } = this.props;
    const { type, drinkIndex } = this.state;
    return (
      <div className="done-recipes-container">
        <Header history={ history } />
        <div className="category-buttons buttons-done">
          <button
            id="all"
            data-testid="filter-by-all-btn"
            type="button"
            className="food-filters"
            onClick={ this.setFilterState }
          >
            All
          </button>
          <button
            id="food"
            data-testid="filter-by-food-btn"
            type="button"
            className="food-filters"
            onClick={ this.setFilterState }
          >
            Food
          </button>
          <button
            id="drink"
            data-testid="filter-by-drink-btn"
            type="button"
            className="food-filters"
            onClick={ this.setFilterState }
          >
            Drinks
          </button>
        </div>
        {type === 'food' ? <FoodCard history={ history } indexAcc={ 0 } /> : null }
        {type === 'drink' ? <DrinkCard history={ history } indexAcc={ 0 } /> : null }
        {type === 'all'
          ? (
            <div className="food-or-drink-done-card">
              <FoodCard history={ history } indexAcc={ 0 } />
              <DrinkCard history={ history } indexAcc={ drinkIndex } />
            </div>)
          : null }

      </div>
    );
  }
}

DoneRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect(null, null)(DoneRecipes);
