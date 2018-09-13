import * as actionTypes from './actionTypes';
import history from '../../history';

export const addRecipeStart = () => {
    return {
        type: actionTypes.ADD_RECIPE_START
    };
};

export const addRecipeSuccess = ( recipe ) => {
  history.push('/recipes')
    return {
        type: actionTypes.ADD_RECIPE_SUCCESS
    };
};

export const addRecipeFail = (errors) => {
    return {
        type: actionTypes.ADD_RECIPE_FAIL,
        errors: errors
    };
};

export const addRecipe = (title, ingredients, category) => {
  return dispatch => {
    dispatch(addRecipeStart());
    const recipeData = {
      recipe: {
        title: title,
        ingredients: ingredients,
        category: category,
        user_id: localStorage.getItem('userId')
      }
    };
    let url = 'http://localhost:3001/api/recipes';
    const token = localStorage.getItem('token')
    fetch(url, {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
              'Authorization': `Bearer + ${token}`,
              'Content-Type': 'application/json; charset=utf-8"d'
            },
            body: JSON.stringify(recipeData),
        })
        .then( response => {
          return response.json()
        })
        .then( json => {
          if (json.status === 400) { throw json }
          dispatch(addRecipeSuccess(json.recipe))
        })
        .catch(err => {
            dispatch(addRecipeFail(err.errors));
        });
    }
}

export const deleteRecipeStart = () => {
    return {
        type: actionTypes.DELETE_RECIPE_START
    };
};

export const deleteRecipeSuccess = (id) => {
  history.push('/')
    return {
        type: actionTypes.DELETE_RECIPE_SUCCESS,
        id: id
    };
};

export const deleteRecipe = (id) => {
  return dispatch => {
    dispatch(deleteRecipeStart());
    let url = `http://localhost:3001/api/recipes/${id}`;
    const token = localStorage.getItem('token')
    fetch(url, {
            method: "DELETE",
            mode: "cors",
            credentials: "same-origin",
            headers: {
              'Authorization': `Bearer + ${token}`,
              'Content-Type': 'application/json; charset=utf-8"d'
            },
        })
        .then(dispatch(deleteRecipeSuccess(id)))

    }
}

export const updateRecipeStart = () => {
    return {
        type: actionTypes.UPDATE_RECIPE_START
    };
};

export const updateRecipeSuccess = ( recipe ) => {
  history.push('/recipes')
    return {
        type: actionTypes.UPDATE_RECIPE_SUCCESS,
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        recipeCategory: recipe.category,
        recipeingredients: recipe.ingredients
    };
};

export const updateRecipeFail = (errors) => {
    return {
        type: actionTypes.UPDATE_RECIPE_FAIL,
        errors: errors
    };
};

export const updateRecipe = (id, title, ingredients, category) => {
  return dispatch => {
    dispatch(updateRecipeStart());
    const recipeData = {
      recipe: {
        title: title,
        ingredients: ingredients,
        category: category,
      }
    };
    let url = `http://localhost:3001/api/recipes/${id}`;
    const token = localStorage.getItem('token')
    fetch(url, {
            method: "PATCH",
            mode: "cors",
            credentials: "same-origin",
            headers: {
              'Authorization': `Bearer + ${token}`,
              'Content-Type': 'application/json; charset=utf-8"d'
            },
            body: JSON.stringify(recipeData),
        })
        .then( response => {
          return response.json()
        })
        .then( json => {
          if (json.status !== 200) { throw json }
          dispatch(updateRecipeSuccess(json.recipe))
        })
        .then()
        .catch(err => {
            dispatch(updateRecipeFail(err.errors));
        });
    }
}

export const getRecipesStart = () => {
    return {
        type: actionTypes.GET_RECIPES_START
    };
};

export const getRecipesSuccess = ( recipes ) => {
    return {
        type: actionTypes.GET_RECIPES_SUCCESS,
        recipes: recipes
    };
};

export const getRecipesFail = (error) => {
    return {
        type: actionTypes.GET_RECIPES_FAIL,
        error: error
    };
};

export const getRecipes = () =>{
  return dispatch => {
    dispatch(getRecipesStart());
    const token = localStorage.getItem('token')
    const url = 'http://localhost:3001/api/recipes'
    fetch(url, {
       method: 'GET',
       headers: {
         'Authorization': `Bearer + ${token}`,
         'Content-Type': 'application/json; charset=utf-8"d'
       },
     })
     .then( response => {
       return response.json()
     })
     .then( json => {
       if(json.status !== 200) {throw json}
       dispatch(getRecipesSuccess(json.recipes))
     })
     .catch( err => {
         dispatch(getRecipesFail(err.error))
     })
  }
}

export const getRecipeSuccess = ( recipe ) => {
    return {
        type: actionTypes.GET_RECIPE_SUCCESS,
        recipeId: recipe.id,
        recipeTitle: recipe.title,
        recipeCategory: recipe.category,
        recipeIngredients: recipe.ingredients
    };
};

export const getRecipeFail = (error) => {
    return {
        type: actionTypes.GET_RECIPE_FAIL,
        error: error
    };
};

export const getRecipe = (recipeId) =>{
  return dispatch => {
    const token = localStorage.getItem('token')
    const url = `http://localhost:3001/api/recipes/${recipeId}`
    fetch(url, {
       method: 'GET',
       headers: {
         'Authorization': `Bearer + ${token}`,
         'Content-Type': 'application/json; charset=utf-8"d'
       },
     })
     .then( response => {
       return response.json()
     })
     .then( json => {
       if(json.status !== 200) {throw json}
       dispatch(getRecipeSuccess(json.recipe))
     })
     .catch( err => {
         dispatch(getRecipeFail(err.error))
     })
  }
}

export const clearRecipe = () => {
    return {
        type: actionTypes.CLEAR_RECIPE
    };
};
