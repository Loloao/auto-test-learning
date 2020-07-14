import React, { Component } from 'react'

class UndoList extends Component {
  render() {
    const { list, deleteItem } = this.props
    return (
      <div className="undo-list">
        <div className="undo-list-title">
          正在进行
          <div className="undo-list-count" data-test="count">
            {list.length}
          </div>
        </div>
        <ul className="undo-list-content">
          {list.map((v, i) => {
            return (
              <li
                className="undo-list-item"
                data-test="list-item"
                key={`${v}-${i}`}
              >
                {v}
                <div
                  className="undo-list-delete"
                  data-test="delete-item"
                  onClick={() => deleteItem(i)}
                >
                  -
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default UndoList
