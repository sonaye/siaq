import ContextStore from '../../lib';

export default class TweetsStore extends ContextStore {
  state = { tweets: [], loading: true };

  componentDidMount() {
    setTimeout(
      () =>
        this.setState({
          tweets: ['A state walks into a bar ..'],
          loading: false
        }),
      1000
    );
  }

  compose = tweet =>
    tweet && this.setState(state => ({ tweets: state.tweets.concat(tweet) }));

  remove = index =>
    this.setState(state => ({
      tweets: state.tweets.filter((tweet, i) => index !== i)
    }));
}

export const withTweetsStore = TweetsStore.inject('tweetsStore');
