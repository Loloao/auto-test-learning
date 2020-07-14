import React, { Component } from 'react'
import Header from './components/Header'
import './style.css'

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = { undoList: [] }
  }

  render() {
    return (
      <div>
        <Header addUndoItem={this.addUndoItem} />
      </div>
    )
  }

  addUndoItem = (value) => {
    const { undoList } = this.state
    this.setState({ undoList: [...undoList, value] })
  }
}

export default TodoList
