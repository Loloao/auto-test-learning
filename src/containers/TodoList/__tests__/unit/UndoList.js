import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import UndoList from '../../components/UndoList'
import { findTestWrapper } from '../../../../utils/testUtils'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

describe('UndoList 组件', () => {
  it('渲染样式正常', () => {
    const listData = [
      { value: '学习Jest', status: 'div' },
      { value: '学习TDD', status: 'div' },
      { value: '学习单元测试', status: 'div' },
    ]
    const wrapper = shallow(<UndoList list={listData} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('未完成列表初始化 count 数目为 0，列表为无内容', () => {
    const wrapper = shallow(<UndoList list={[]} />)
    const countElem = findTestWrapper(wrapper, 'count')
    const listItems = findTestWrapper(wrapper, 'list-item')
    expect(countElem.text()).toEqual('0')
    expect(listItems.length).toBe(0)
  })

  it('未完成列表当数据有内容时 count 数目显示数据长度，列表不为空', () => {
    const listData = [
      { value: '学习Jest', status: 'div' },
      { value: '学习TDD', status: 'div' },
      { value: '学习单元测试', status: 'div' },
    ]
    const fn = jest.fn()
    const wrapper = shallow(<UndoList list={listData} deleteItem={fn} />)
    const countElem = findTestWrapper(wrapper, 'count')
    const listItems = findTestWrapper(wrapper, 'list-item')
    expect(countElem.text()).toEqual('3')
    expect(listItems.length).toBe(3)
  })

  it('未完成列表当数据有内容时，要存在删除按钮', () => {
    const listData = [
      {
        value: '学习Jest',
        status: 'div',
      },
      { value: '学习TDD', status: 'div' },
      { value: '学习单元测试', status: 'div' },
    ]
    const fn = jest.fn()
    const wrapper = shallow(<UndoList list={listData} deleteItem={fn} />)
    const deleteItems = findTestWrapper(wrapper, 'delete-item')
    expect(deleteItems.length).toBe(3)
  })

  it('当某一项被点击时，触发 changeStatus 函数', () => {
    const listData = [
      { value: '学习Jest', status: 'div' },
      { value: '学习TDD', status: 'div' },
      { value: '学习单元测试', status: 'div' },
    ]
    const fn = jest.fn()
    const index = 1
    const wrapper = shallow(<UndoList changeStatus={fn} list={listData} />)
    const listItems = findTestWrapper(wrapper, 'list-item')
    listItems.at(index).simulate('click')
    expect(fn).toHaveBeenLastCalledWith(index)
  })

  it('当某一项状态是 input 时，展示输入框', () => {
    const listData = [
      { value: '学习Jest', status: 'input' },
      { value: '学习TDD', status: 'div' },
      { value: '学习单元测试', status: 'div' },
    ]

    const wrapper = shallow(<UndoList list={listData} />)
    const inputItems = findTestWrapper(wrapper, 'input')
    expect(inputItems.length).toBe(1)
  })

  it('当某一个输入框失去焦点时，触发 handleBlur 方法', () => {
    const listData = [
      { value: '学习Jest', status: 'input' },
      { value: '学习TDD', status: 'div' },
      { value: '学习单元测试', status: 'div' },
    ]

    const fn = jest.fn()
    const wrapper = shallow(<UndoList handleBlur={fn} list={listData} />)
    const inputElem = findTestWrapper(wrapper, 'input')
    inputElem.simulate('blur')
    expect(fn).toHaveBeenLastCalledWith(0)
  })

  it('当某一个输入框变更时，触发 valueChange 方法', () => {
    const listData = [
      { value: '学习Jest', status: 'input' },
      { value: '学习TDD', status: 'div' },
      { value: '学习单元测试', status: 'div' },
    ]
    const value = '学习 TDD'
    const fn = jest.fn()
    const wrapper = shallow(<UndoList valueChange={fn} list={listData} />)
    const inputElem = findTestWrapper(wrapper, 'input')
    inputElem.simulate('change', {
      target: { value },
    })
    expect(fn).toHaveBeenLastCalledWith(0, value)
  })
})
