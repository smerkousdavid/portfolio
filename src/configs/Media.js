import React from 'react';
import MediaQuery from 'react-responsive';

const Desktop = props => <MediaQuery {...props} minWidth={992} />;
const Mobile = props => <MediaQuery {...props} maxWidth={991} />;

export { Desktop, Mobile };
