import React from 'react';
import renderer from 'react-test-renderer';
import Item from './Item';

describe('<AutoCompletion />', () => {
  it('renders', () => {
    const tree = renderer
      .create(
        <Item key={1} onSelect={() => {}} caption="Hey" active={false} onActive={() => {}} />,
    )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
