import Relay from 'react-relay'

// https://facebook.github.io/relay/docs/en/classic/classic-guides-mutations.html

export default class SigninUser extends Relay.Mutation {
  // This method should return a GraphQL operation that represents
  // the mutation to be performed. This presumes that the server
  // implements a mutation type named ‘likeStory’.
  getVariables () {
    return {
      auth0: {
        idToken: this.props.idToken
      }
    }
  }

  // Use this method to prepare the variables that will be used as
  // input to the mutation. Our ‘likeStory’ mutation takes exactly
  // one variable as input – the ID of the story to like.
  getMutation () {

  }

  getFatQuery () {

  }

  getConfigs () {

  }
}
