import css from './Heading.module.css';
export const Heading = ({ children, className }) => {
  return <h1 className={`${css['heading-1v1']} ${className}`}>{children}</h1>;
};
