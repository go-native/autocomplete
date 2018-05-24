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
    this.arrowMove = this.arrowMove.bind(this);
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
    // Debounce the function call to avoid multiple requests
    this.debounceChange(e.target.value);
  }
  debounceChange(value) {
    this.props.onChange(value);
  }
  selectItem(item) {
    // Propogate the item to the parent
    this.props.onSelect(item);
    this.setState({
      value: item.name,
      showList: false,
      activeIndex: null
    });    
  }
  arrowMove(e) {
    if (e.key === 'ArrowDown') {
        // Looping through the items from top to bottom
        e.preventDefault();
        let activeIndex = (this.state.activeIndex === null) ? -1 : this.state.activeIndex;
        let index = (((activeIndex + 1) % this.props.items.length) + this.props.items.length) % this.props.items.length;
        this.setState({
            activeIndex: index
        });
    }
    if (e.key === 'ArrowUp') {
        // Looping through the items from bottom to top
        e.preventDefault();
        let activeIndex = (this.state.activeIndex === null) ? 10 : this.state.activeIndex;
        let index = (((activeIndex - 1) % this.props.items.length) + this.props.items.length) % this.props.items.length;
        this.setState({
            activeIndex: index
        });
    }
    if (e.key === 'Enter') {
        // Select an item when the Enter key is hit
        e.preventDefault();
        this.selectItem(this.props.items[this.state.activeIndex]);
    }   
  }
  render() {
    return (
      <form className="autocomplete-cnt" tabIndex="0" onBlur={this.handleBlur}>
        <div className="form-group">
          <input type="text" 
            onKeyDown={this.arrowMove} 
            value={this.state.value} 
            onFocus={this.handleFocus} 
            className="form-control" 
            placeholder="Search here..." 
            onChange={this.handleChange} 
          />
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
