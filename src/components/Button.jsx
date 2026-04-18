import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

const Button = forwardRef(function Button({
  children,
  icon: Icon,
  variant = 'primary', // 'primary' | 'secondary' | 'tertiary'
  reverse = false,     // true for color-inverted tertiary on dark backgrounds
  href,
  to,
  badge,
  className = '',
  type = 'button',
  iconOnly = false,
  title,
  ...props
}, ref) {
  const baseClass = `btn btn--${variant} ${reverse ? 'btn--reverse' : ''} ${
    iconOnly || (!children && !!Icon) ? 'btn--icon-only' : ''
  } ${className}`.trim();

  const tooltipProps = title ? {
    'data-tooltip': title,
    'aria-label': props['aria-label'] || title
  } : {};

  const content = (
    <>
      <span className="btn__ripple" />
      {Icon && <Icon className="btn__icon" />}
      {children && <span className="btn__label">{children}</span>}
      {badge !== undefined && <span className="btn__badge">{badge}</span>}
    </>
  );

  // If a react-router 'to' prop is provided, render a <Link>
  if (to) {
    return (
      <Link
        ref={ref}
        to={to}
        className={baseClass}
        {...tooltipProps}
        {...props}
      >
        {content}
      </Link>
    );
  }

  // If a standard 'href' is provided, render an <a>
  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        className={baseClass}
        {...tooltipProps}
        {...props}
      >
        {content}
      </a>
    );
  }

  // Otherwise, render a <button>
  return (
    <button
      ref={ref}
      type={type} 
      className={baseClass} 
      {...tooltipProps} 
      {...props}
    >
      {content}
    </button>
  );
});

export default Button;
