import React from 'react';
import renderer from 'react-test-renderer';
import AutoCompletion from './AutoCompletion';

const ALL_REPOS_MOCK = [
  { id: 1, name: "Tensorflow" },
  { id: 3, name: "VisualStudioCode" },
  { id: 2, name: "Quandoo" }
]
function searchReposMock(query) {
  this.setState({ repos: ALL_REPOS.filter(r => r.name.indexOf(query) !== -1) })
}
describe('<AutoCompletion />', () => {
  it('renders', () => {
    const tree = renderer
      .create(
        <AutoCompletion
          items={ALL_REPOS_MOCK}
          onSelect={(selectedItem) => console.log(selectedItem)}
          onChange={(query) => searchReposMock((query))}
        />,
    )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
