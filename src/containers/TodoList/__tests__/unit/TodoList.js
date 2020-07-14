import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import TodoList from '../../index'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

describe('TodoList 组件', () => {
  it('初始化列表为空', () => {
    const wrapper = shallow(<TodoList />)
    expect(wrapper.state('undoList')).toEqual([])
  })

  it('给 Header 传递一个增减 undoList 内容的方法', () => {
    const wrapper = shallow(<TodoList />)
    const Header = wrapper.find('Header')

    expect(Header.prop('addUndoItem')).toBeTruthy()
  })

  it('当 Header 回车时，undoList 应该新增内容', () => {
    const wrapper = shallow(<TodoList />)
    wrapper.instance().addUndoItem('学习 React')
    const value = '学习 React'
    expect(wrapper.state('undoList').length).toBe(1)
    expect(wrapper.state('undoList')[0]).toBe(value)
  })

  it('给为完成列表传递 list 数据，以及 deleteItem 方法', () => {
    const wrapper = shallow(<TodoList />)
    const UndoList = wrapper.find('UndoList')

    expect(UndoList.prop('list')).toBeTruthy()
    expect(UndoList.prop('deleteItem')).toBeTruthy()
  })

  it('当 deleteItem 方法被执行时，undoList 应该删除内容', () => {
    const wrapper = shallow(<TodoList />)
    wrapper.setState({
      undoList: ['学习 jest', '学习 React', '学习单元测试'],
    })
    wrapper.instance().deleteItem(1)
    expect(wrapper.state('undoList')).toEqual(['学习 jest', '学习单元测试'])
  })
})
