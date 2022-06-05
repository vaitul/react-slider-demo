import React from 'react';

import Component from "../../components/IconButton";

export default {
  title: 'Components/Icon Button',
  component: Component,
};

export const IconButton = (args) => <Component {...args} />;

IconButton.args = {
    type:'next'
};


