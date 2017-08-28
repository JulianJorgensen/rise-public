import React from 'react';
import {Link} from 'react-router-dom';
import cn from 'classnames';
import RTButton from 'react-toolbox/lib/button';
import customTheme from './Button.css';

const Button = ({ className, white, hollow, primary, target, theme, href, ...others }) => {
  const _className = cn(className, {
    [customTheme.white]: white,
    [customTheme.hollow]: hollow,
    [customTheme.primary]: primary
  });

  if (href === undefined) {
    return <RTButton className={_className} theme={customTheme} {...others}/>;
  }

  return (
    <Link to={href} target={target}>
      <RTButton className={_className} theme={customTheme} {...others}/>
    </Link>
  )
};

export default Button;
