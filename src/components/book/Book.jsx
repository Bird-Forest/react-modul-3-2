import React from 'react';
import css from './Book.module.css';
import { ReactComponent as IconHeart } from '../../img/heart-alt-svgrepo-com.svg';

export const Book = ({
  title,
  author,
  year,
  genre,
  favourite,
  cover,
  handleIncrement,
  handleDelete,
  onOpenModal,
}) => {
  return (
    <li className={css.book}>
      <div className={css.thumbWrap}>
        <img className={css.thumbImg} src={cover} alt={title} />
        <button className={css.favBtn}>
          <IconHeart
            className={`${css.iconHeart} ${favourite ? css.favourite : ''}`}
          />
        </button>
      </div>
      <h3 className={css.title}>{title}</h3>
      <h4 className={css.author}>{author}</h4>
      <p className={css.year}>
        Year: <b>{year}</b>
      </p>
      <p className={css.gener}>
        Genere: <b>{genre}</b>
      </p>
      <button onClick={() => handleIncrement(title, author, year)}>
        Click to see event
      </button>
      <button onClick={() => handleDelete(title)}>Delete</button>
      <button onClick={() => onOpenModal({ title, author })}>Open modal</button>
    </li>
  );
};
