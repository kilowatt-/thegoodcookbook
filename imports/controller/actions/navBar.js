export const BROWSE_FAVORITES = 'SHOW_FAVORITES';
export const BROWSE_ADDED = 'SHOW_ADDED';
export const BROWSE_ALL = 'SHOW_ALL';

export const browseFavorites = () => {
  return {
    type: BROWSE_FAVORITES
  }
}

export const browseAdded = () => {
  return {
    type: BROWSE_ADDED
  }
}

export const browseAll = () => {
  return {
    type: BROWSE_ALL
  }
}
