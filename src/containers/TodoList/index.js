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
        <UndoList
          changeStatus={this.changeStatus}
          list={undoList}
          deleteItem={this.deleteItem}
          handleBlur={this.handleBlur}
          valueChange={this.valueChange}
        />
      </div>
    )
  }

  addUndoItem = (value) => {
    const { undoList } = this.state
    this.setState({ undoList: [...undoList, { status: 'div', value }] })
  }

  deleteItem = (i) => {
    const newList = [...this.state.undoList]
    newList.splice(i, 1)
    this.setState({
      undoList: newList,
    })
  }

  changeStatus = (i) => {
    const newList = this.state.undoList.map((v, i1) => {
      if (i1 === i) {
        v.status = 'input'
      } else {
        v.status = 'div'
      }
      return v
    })

    this.setState({ undoList: newList })
  }

  handleBlur = (i) => {
    const newList = this.state.undoList.map((v, i1) => {
      if (i1 === i) {
        v.status = 'div'
      }
      return v
    })

    this.setState({ undoList: newList })
  }

  valueChange = (i, value) => {
    const newList = this.state.undoList.map((v, i1) => {
      if (i1 === i) {
        v.value = value
      }
      return v
    })

    this.setState({ undoList: newList })
  }
}

export default TodoList
