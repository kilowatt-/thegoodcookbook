export const loadUser = () => {
  return dispatch => {
    Tracker.autorun(() => {
      dispatch({
        type: USER_DATA,
        data: Meteor.user()
      })
    })
  }
}