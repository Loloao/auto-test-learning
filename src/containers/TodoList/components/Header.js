import React, { Component } from 'react'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
  }
  render() {
    const { value } = this.state
    return (
      <div className="header">
        <div className="header-content">
          TodoList
          <input
            placeholder="Todo"
            className="header-input"
            data-test="input"
            value={value}
            onChange={this.handleInputChange}
            onKeyUp={this.handleInputKeyUp}
          />
        </div>
      </div>
    )
  }

  handleInputChange = (e) => {
    this.setState({ value: e.target.value })
  }

  handleInputKeyUp = (e) => {
    const { addUndoItem } = this.props
    const { value } = this.state
    if (e.keyCode === 13 && value) {
      addUndoItem(value)
      this.setState({ value: '' })
    }
  }
}

export default Header
