import React, { Component } from 'react'

class UndoList extends Component {
  render() {
    const {
      list,
      deleteItem,
      changeStatus,
      handleBlur,
      valueChange,
    } = this.props
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
                key={i}
                onClick={() => changeStatus(i)}
              >
                {v.status === 'div' ? (
                  v.value
                ) : (
                  <input
                    className="list-item-input"
                    data-test="input"
                    value={v.value}
                    onBlur={() => handleBlur(i)}
                    onChange={(e) => valueChange(i, e.target.value)}
                  />
                )}
                <div
                  className="undo-list-delete"
                  data-test="delete-item"
                  onClick={(e) => {
                    e && e.stopPropagation()
                    deleteItem(i)
                  }}
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
