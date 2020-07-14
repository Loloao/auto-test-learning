import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import UndoList from '../../components/UndoList'
import { findTestWrapper } from '../../../../utils/testUtils'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })

it('未完成列表初始化 count 数目为 0，列表为无内容', () => {
  const wrapper = shallow(<UndoList list={[]} />)
  const countElem = findTestWrapper(wrapper, 'count')
  const listItems = findTestWrapper(wrapper, 'list-item')
  expect(countElem.text()).toEqual('0')
  expect(listItems.length).toBe(0)
})

it('未完成列表当数据有内容时 count 数目显示数据长度，列表不为空', () => {
  const listData = ['学习Jest', '学习TDD', '学习单元测试']
  const fn = jest.fn()
  const wrapper = shallow(<UndoList list={listData} deleteItem={fn} />)
  const countElem = findTestWrapper(wrapper, 'count')
  const listItems = findTestWrapper(wrapper, 'list-item')
  expect(countElem.text()).toEqual('3')
  expect(listItems.length).toBe(3)
})

it('未完成列表当数据有内容时，要存在删除按钮', () => {
  const listData = ['学习Jest', '学习TDD', '学习单元测试']
  const fn = jest.fn()
  const wrapper = shallow(<UndoList list={listData} deleteItem={fn} />)
  const deleteItems = findTestWrapper(wrapper, 'delete-item')
  expect(deleteItems.length).toBe(3)
})
