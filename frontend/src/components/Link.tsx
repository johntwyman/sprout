import React, { FC } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';

import { Link as MuiLink, LinkProps } from '@mui/material';

const Link: FC<LinkProps> = props => {
  return (
    <MuiLink {...props} component={ReactRouterLink} to={props.href ?? "#"} />
  );
};

export default Link;