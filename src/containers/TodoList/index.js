import React, { Component } from 'react'
import Header from './components/Header'
import UndoList from './components/UndoList'
import './style.css'

class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = { undoList: [] }
  }

  render() {
    const { undoList } = this.state
    return (
      <div>
        <Header addUndoItem={this.addUndoItem} />
        <UndoList list={undoList} deleteItem={this.deleteItem} />
      </div>
    )
  }

  addUndoItem = (value) => {
    const { undoList } = this.state
    this.setState({ undoList: [...undoList, value] })
  }

  deleteItem = (i) => {
    const newList = [...this.state.undoList]
    newList.splice(i, 1)
    this.setState({
      undoList: newList,
    })
  }
}

export default TodoList
