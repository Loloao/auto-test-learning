import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Header from '../../components/Header'
import { findTestWrapper } from '../../../../utils/testUtils'
import Adapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new Adapter() })
it('Header 组件渲染样式正常', () => {
  const wrapper = shallow(<Header />)
  expect(wrapper).toMatchSnapshot()
})

it('Header 组件包含一个 input 框', () => {
  const wrapper = shallow(<Header />)
  const inputElem = findTestWrapper(wrapper, 'input')
  expect(inputElem).toExist()
})

it('Header 组件的 input 框初始化应该为空', () => {
  const wrapper = shallow(<Header />)
  const inputElem = findTestWrapper(wrapper, 'input')
  expect(inputElem.prop('value')).toEqual('')
})

it('Header 组件 input 框输入回车时，如果 input 无内容，无操作', () => {
  const fn = jest.fn()
  const wrapper = shallow(<Header addUndoItem={fn} />)
  const inputElem = findTestWrapper(wrapper, 'input')
  wrapper.setState({ value: '' })
  inputElem.simulate('keyUp', {
    keyCode: 13,
  })
  expect(fn).not.toHaveBeenCalled()
})

it('Header 组件 input 框输入回车时，如果 input 有内容，函数应该被调用', () => {
  const fn = jest.fn()
  const wrapper = shallow(<Header addUndoItem={fn} />)
  const inputElem = findTestWrapper(wrapper, 'input')
  const userInput = '学习 React'
  wrapper.setState({ value: userInput })
  inputElem.simulate('keyUp', {
    keyCode: 13,
  })
  expect(fn).toHaveBeenCalled()
  expect(fn).toHaveBeenLastCalledWith(userInput)
  expect(inputElem.prop('value')).toBe('')
})

it('Header 组件 input 框输入回车时，如果 input 有内容，应该清除掉', () => {
  const fn = jest.fn()
  const wrapper = shallow(<Header addUndoItem={fn} />)
  const inputElem = findTestWrapper(wrapper, 'input')
  const userInput = '学习 React'
  wrapper.setState({ value: userInput })
  inputElem.simulate('keyUp', {
    keyCode: 13,
  })
  const newInputElem = findTestWrapper(wrapper, 'input')
  expect(newInputElem.prop('value')).toBe('')
})
