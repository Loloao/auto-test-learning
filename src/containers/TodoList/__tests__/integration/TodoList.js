import React from 'react'
import Enzyme, { mount } from 'enzyme'
import TodoList from '../../index'
import { findTestWrapper } from '../../../../utils/testUtils'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import store from '../../../../store/createStore'
Enzyme.configure({ adapter: new Adapter() })

it(`
  1. Header 输入框输入内容
  2. 点击回车
  3. 列表中展示用户输入的内容项
`, () => {
  const wrapper = mount(
    <Provider store={store}>
      <TodoList />
    </Provider>
  )
  const inputElem = findTestWrapper(wrapper, 'header-input')
  const content = 'Dell Lee'
  inputElem.simulate('change', {
    target: { value: content },
  })
  inputElem.simulate('keyUp', {
    keyCode: 13,
  })
  const listItem = findTestWrapper(wrapper, 'list-item')
  expect(listItem.length).toEqual(1)
  expect(listItem.text()).toContain(content)
})
