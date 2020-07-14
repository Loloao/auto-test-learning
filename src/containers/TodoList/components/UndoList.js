import React, { Component } from 'react'

class UndoList extends Component {
  render() {
    const { list, deleteItem } = this.props
    return (
      <div>
        <div data-test="count">{list.length}</div>
        <ul>
          {list.map((v, i) => {
            return (
              <li data-test="list-item" key={`${v}-${i}`}>
                {v}
                <span data-test="delete-item" onClick={deleteItem(i)}>
                  -
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default UndoList
