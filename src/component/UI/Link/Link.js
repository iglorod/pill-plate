import React from 'react';
import { Link } from 'react-router-dom';

export const ReactLink = React.forwardRef((routeProps, ref) => (
    <Link ref={ref} {...routeProps} />
));