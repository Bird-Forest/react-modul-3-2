import React, { Component } from 'react';
import css from './Form.module.css';

/*
Алгоритм роботи з формами:

1. Розмітити HTML самої форми.
2. Створити стейт, поля якого будуть збігатися з назвами атрибутів "name" у інпутів.
3. Прив`язати поля стейту до атрибуту "value" відповідних інпутів.
4. Створити обробник подій, який буде обробляти поля вводу і встановлювати значення в стейт.
5. Обробник подій, прикріпити до події onChange у кожного інпуту.
6. Додати обробник сабміту форми, де ми згрупуємо фінальні дані та надішлемо їх назовні.

*/
// rcc - для установки компонента класс

export default class BookForm extends Component {
  state = {
    title: '',
    author: '',
    year: '',
    genre: '',
    favourite: false,
  };

  handleInputChange = event => {
    const type = event.target.type;
    if (type === 'checkbox') {
      this.setState({
        [event.target.name]: event.target.checked,
      });
      return;
    }
    console.log(event.target.name);
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    // const bookData = {
    //   ...this.state,
    //   year: Number.parseInt(this.state.year),
    //   cover: 'https://images.gr-assets.com/books/1361975680l/2657.jpg',
    // };

    const bookData = {
      title: this.state.title,
      author: this.state.author,
      genre: this.state.genre,
      favourite: this.state.favourite,
      year: Number.parseInt(this.state.year),
      cover: 'https://images.gr-assets.com/books/1361975680l/2657.jpg',
    };
    this.props.handleAddBook(bookData);

    this.setState({
      title: '',
      author: '',
      year: '',
      genre: '',
      favourite: false,
    });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} className={css.form}>
        <h2>BookForm</h2>
        <label>
          <span>Title:</span>
          <input
            onChange={this.handleInputChange}
            value={this.state.title}
            name="title"
            type="text"
            required
          />
        </label>
        <label>
          <span>Author:</span>
          <input
            onChange={this.handleInputChange}
            value={this.state.author}
            name="author"
            type="text"
            required
          />
        </label>
        <label>
          <span>Year:</span>
          <input
            onChange={this.handleInputChange}
            value={this.state.year}
            name="year"
            type="text"
            required
          />
        </label>
        <label>
          <span>Genre:</span>
          <input
            onChange={this.handleInputChange}
            value={this.state.genre}
            name="genre"
            type="text"
            required
          />
        </label>
        <label>
          <span>
            Favourite:
            <input
              onChange={this.handleInputChange}
              checked={this.state.favourite}
              name="favourite"
              type="checkbox"
            />
          </span>
        </label>
        <button type="submit">Add book</button>
      </form>
    );
  }
}
