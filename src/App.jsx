import { Component } from 'react';
import { StyledAppContainer } from 'App.styled';
import { fetchPosts, findPostById } from 'services/api';
// import css from './App.module.css';
// import { Heading } from 'components/Heading/Heading';
// import { Book } from 'components/book/Book';
// import booksJson from '../src/books.json';
// import BookForm from 'components/BookForm/BookForm';
// import Modal from 'components/Modal/Modal';

// const books = booksJson.books;

export class App extends Component {
  state = {
    posts: null,
    isLoading: false,
    error: null,
    searchedPostId: null,
  };
  fetchAllPosts = async () => {
    try {
      this.setState({ isLoading: true });
      const posts = await fetchPosts();
      // console.log(posts);
      this.setState({ posts: posts });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };
  fetchPostById = async () => {
    try {
      this.setState({ isLoading: true });
      const post = await findPostById(this.state.searchedPostId);
      this.setState({
        posts: [post],
      });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };
  componentDidMount() {
    this.fetchAllPosts();
  }
  componentDidUpdate(_, prevState) {
    if (prevState.searchedPostId !== this.state.searchedPostId) {
      this.fetchPostById();
    }
  }

  handleSubmitSearch = event => {
    event.preventDefault();
    const searchedPostId = event.currentTarget.elements.searchPostId.value;
    console.log(searchedPostId);
    this.setState({
      searchedPostId: searchedPostId,
    });
    event.currentTarget.reset();
  };

  render() {
    const showPosts =
      Array.isArray(this.state.posts) && this.state.posts.length;
    return (
      <StyledAppContainer>
        <h1 className="title" tabIndex={0}>
          App title
        </h1>
        <form onSubmit={this.handleSubmitSearch}>
          <label>
            <p>Enter post ID to find in database</p>
            <input name="searchPostId" type="text" placeholder="Enter ID" />
            <button type="submit">Search</button>
            <button onClick={this.fetchAllPosts} type="reset">
              Reset
            </button>
          </label>
        </form>
        {this.state.isLoading && (
          <div>
            <p>Loading...</p>
          </div>
        )}
        {this.state.error && <p className="error">{this.state.error}</p>}
        <ul className="postList">
          {showPosts &&
            this.state.posts.map(post => {
              return (
                <li key={post.id} className="postListItem">
                  <span>Id: {post.id}</span>
                  <h3>Title: {post.title}</h3>
                  <h4>User Id: {post.userId}</h4>
                  <p>Body: {post.body}</p>
                </li>
              );
            })}
        </ul>
      </StyledAppContainer>
    );
  }
}
