import React from 'react';
import renderer from 'react-test-renderer';
import List from './List';

describe('<AutoCompletion />', () => {
  it('renders children', () => {
    const tree = renderer
      .create(
        <List>
          <div></div>
        </List>,
    )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
