import React, { Component } from 'react';

class Item extends Component {
  constructor(props) {
    super(props);
    this.handleHover = this.handleHover.bind(this);
  }
  handleHover() {
    this.props.onActive();
  }
  render() {
    const itemClass = this.props.active ? "list-group-item active" : "list-group-item";
    return (<li
      onMouseEnter={this.handleHover}
      onMouseLeave={this.handleHover}
      onMouseDown={() => this.props.onSelect()}
      className={itemClass}>{this.props.caption}
    </li>)
  }
}

export default Item;
