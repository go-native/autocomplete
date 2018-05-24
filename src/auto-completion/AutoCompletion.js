import React, { Component } from 'react';
import { debounce } from 'throttle-debounce';
import List from './List';
import Item from './Item';

const DEBOUNCE_TIMEOUT = 500;
class AutoCompletion extends Component {
  constructor(props) {
    super(props);
    this.state = { showList: true, value: "", activeIndex: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.debounceChange = debounce(DEBOUNCE_TIMEOUT, this.debounceChange);
  }
  handleBlur(e) {
    this.setState({
      showList: false
    });
  }
  handleFocus(e) {
    this.setState({
      showList: true,
    });
  }
  handleChange(e) {
    this.setState({
        value: e.target.value,
        showList: true,
        activeIndex: null
    })
    this.debounceChange(e.target.value);
  }
  debounceChange(value) {
    this.props.onChange(value);
  }
  selectItem(item) {
    this.props.onSelect(item);
    this.setState({
      value: item.name,
      showList: false,
      activeIndex: null
    });    
  }
  render() {
    return (
      <form className="autocomplete-cnt" tabIndex="0" onBlur={this.handleBlur}>
        <div className="form-group">
          <input type="text" value={this.state.value} onFocus={this.handleFocus} className="form-control" placeholder="Search here..." onChange={this.handleChange} />
          {this.props.isFetching && <label>Fetching</label>}
        </div>
        {this.state.showList && <List>
          {this.props.items.map((i, index) => <Item key={i.id} onSelect={() => this.selectItem(i)} caption={i.name} active={this.props.items[this.state.activeIndex] === i} onActive={() => this.setState({ activeIndex: index })} />)}
        </List>}
      </form>
    );
  }
}

export default AutoCompletion;
