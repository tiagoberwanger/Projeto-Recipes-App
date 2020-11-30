import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, FavFoodCard, FavDrinkCard } from '../components';

class FavoriteRecipes extends React.Component {
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
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (recipes) {
      const foods = recipes.filter((element) => element.type === 'comida').length;
      this.setFilterIndex(foods);
    }
    const eightHundred = 800;
    if (window.screen.availHeight < eightHundred) {
      const h1 = document.querySelector('.global-h1');
      h1.style.fontSize = '20px';
      const bla = document.querySelector('.search-input-div');
      bla.style.width = '70px';
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
        {type === 'food' ? <FavFoodCard history={ history } indexAcc={ 0 } /> : null }
        {type === 'drink' ? <FavDrinkCard history={ history } indexAcc={ 0 } /> : null }
        {type === 'all'
          ? (
            <div>
              <FavFoodCard history={ history } indexAcc={ 0 } />
              <FavDrinkCard history={ history } indexAcc={ drinkIndex } />
            </div>)
          : null }

      </div>
    );
  }
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect(null, null)(FavoriteRecipes);
