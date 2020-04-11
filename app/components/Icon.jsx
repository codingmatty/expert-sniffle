import React from 'react';

export default function Icon({ name, className = '' }) {
  return <i className={`material-icons ${className}`}>{name}</i>;
}
