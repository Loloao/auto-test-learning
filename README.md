# 自动化测试

测试分为两种，单元测试和集成测试，单元测试相当于模块测试，会使用各种各样的 mock 来代替引入的东西来提高性能，，而集成测试相当于多模块测试，会对单元和单元里的东西统一做测试

## jest

### 配置

- 如果想要使用 es6 的语法，需要使用 babel，jest 中集成了`babel-jest`插件，只需要配置 babel，jest 就会自动取`.babelrc`中的内容对代码进行转化

### matchers 匹配器

- `toBe`相当于全等，对于地址不同的对象会报错
- `toEqual`可以用来对内容比较，比如对象的内容相等，即使地址不同也会相等
- `toBeNull`字面意思
- `toBeUndefined`字面意思
- `toBeDefined`只要不是`undefined`
- `toBeTruthy`即不会被转化为 false 的值
- `toBeFalsy`会被转化为 false 的值
- `not`给接下来的匹配器取反`expect(a).not.toBeFalsy()`
- `toMatchObject`前面的内容包含这一项内容就行了
  **数字相关**
- `toBeGreaterThan`比输入的数值要大
- `toBeGreaterThanOrEqual`大于或等于输入的数值
- `toBeLessThan`比输入的数值小
- `toBeLessThanOrEqual`小于或等于输入的数值
- `toEqual`相等
- `toBeCloseTo`近似相等比如`0.1 + 0.2`
  **字符相关**
- 内容可以写正则
- `toMatch`包含对应字符
  **Array, Set**
- `toContain`包含某一项
  **异常情况**
- `toThrow`希望能够抛出异常，如果有异常内容，则希望异常内容一致

### 异步代码测试

**回调类型异步函数测试**

- 如果在`test`函数中直接发送请求，则因为请求函数直接执行完毕，所以即使请求失败也不会报错

```javascript
test(`fetchData 返回结果为 { success: true }`, () => {
  // 因下面函数总是会立即执行完成，所以总是能够测试通过
  fetchData((data) => {
    expect(data).toEqual({
      success: true,
    })
  })
})

// 可以在回调函数中接受一个参数为 done，只有 done 函数执行完毕才会完成测试
test(`fetchData 返回结果为 { success: true }`, (done) => {
  fetchData((data) => {
    expect(data).toEqual({
      success: true,
    })
    done()
  })
})
```

**返回一个 Promise 的测试异步函数**

- 此时需要返回 Promise 的结果

```javascript
function fetchData() {
  return axios.get('http://www.baidu.com')
}

test(`fetchData 返回结果为 { success: true }`, (done) => {
  return fetchData().catch((response) => {
    expect(data).toEqual({
      success: true,
    })
  })
})

test(`fetchData 返回结果为 404`, (done) => {
  expect.assertions(1)
  return fetchData().catch((e) => {
    expect(e.toString().indexOf('404') > -1).toBe(true)
  })
})
```

- `expect.assertions(1)`表示 expect 必须执行一次，用于`catch`语法，因为如果测试失败，则如果 Promise 执行成功会不走 catch，也会测试成功、
- 可以通过 resolves 来进行测试

```javascript
function fetchData() {
  return axios.get('http://www.baidu.com')
}

test(`fetchData 返回结果为 { success: true }`, () => {
  // resolves 返回的是 resolve 对象，看它是否包含{data: {success: true}}
  return expect(fetchData()).resolves.toMatchObject({
    data: {
      success: true,
    },
  })
})

test(`fetchData 返回结果为 404`, () => {
  return expect(fetchData()).rejects.toThrow()
})
```

- 也可以使用`async`来进行测试

```javascript
function fetchData() {
  return axios.get('http://www.baidu.com')
}

test(`fetchData 返回结果为 { success: true }`, async () => {
  await expect(fetchData()).resolves.toMatchObject({
    data: {
      success: true,
    },
  })
})
test(`fetchData 返回结果为 { success: true }`, async () => {
  const res = await fetchData()
  expect(res.data).toEqual({
    success: true,
  })
})

test(`fetchData 返回结果为 404`, async () => {
  await expect(fetchData()).rejects.toThrow()
})
test(`fetchData 返回结果为 404`, async () => {
  expect.assertions(1)
  try {
    await fetchData()
  } catch (e) {
    expect(e.toString().indexOf('404') > -1).toBe(true)
  }
})
```

### 钩子函数

- `beforeAll`在进行测试前，需要进行一些初始化操作，它会在所有测试用例运行之前调用
- `afterAll`在所有测试用例测试完之后进行调用
- `beforeEach`za 在每个测试用例执行之前都会让这个函数执行一下，在使用类的实例时需要这个钩子，因为每个测试用例需要对实例都不同

```javascript
let counter = null
beforeAll(() => {
  counter = new Counter()
})

test('测试 addOne', () => {
  counter.addOne()
  expect(counter.number).toBe(1)
})

test('测试 minusOne', () => {
  counter.minusOne()
  expect(counter.number).toBe(-1)
})
```

- `afterEach`在每个测试用例执行之后都会让这个函数执行一下
- `describe`有时我们想在一个测试文件中对测试用例进行分组，比如增加的函数为一组，减少的函数为一组，就相当于 namespace。在每个`describe`下都可以写对应的钩子函数，它只会作用于当前作用域下

```javascript
describe('测试增加相关的代码', () => {
  // 测试用例
  test('测试 addOne', () => {
    counter.addOne()
    expect(counter.number).toBe(1)
  })
})
```

- `only`如果只想在本文件中只有某个测试用例执行测试，`test.only('测试', () => { // 测试代码 })`

### Mock

- `toBeCalled`检测`jest.fn()`这一 mock 函数是否被调用过

```javascript
function runCallback(callback) {
  callback()
}

test('测试 runCallback', () => {
  // 此处使用 jext.fn() 生成 mock 函数，它会捕获函数的调用
  // func.mock 可以看它的 mock 属性，包括它接受的参数，返回值等
  const func = jest.fn()
  // 下例可以模拟函数返回值为 'Dell'，函数如果执行多次之后通过 func.mock 取得返回值时则这一次会返回 'Dell
  func.mockReturnValueOnce('Dell')
  runCallback(func)
  expect(func).toBeCalled()
})
```

- `mockReturnValue`用于模拟函数返回值，都会返回设定的值`func.mockReturnValue('dell')`，每次调用之后通过`func.mock`获取返回值
- `mockReturnValueOnce`多次调用函数时，只会返回一次设定的值
- `mockImplementation`用来设定函数实现`func.mockImplemantation(() => { // 需要模拟的函数内容 })`
- `toBeCalledWith`查看函数参数
- `jest.mock`改变函数内部实现

```javascript
function getData() {
  return axios.get('/data').then((res) => res.data)
}

jest.mock('axios')
test('测试 getData', async () => {
  // 此处直接模拟 axios 设定返回值
  axios.get.mockResolvedValue({ data: 'hello' })
  await getData().then((data) => {
    expect(data).toBe('hello')
  })
})
```

- `jest.mock`还可以接受第二个参数，为将函数模拟后的函数

- 我们还可以创建一个名为`__mock__`的文件夹，里面放置和需要测试的文件同名的文件，文件内容是不发送请求的 mock 代码，如果将`jest.config.js`中的`automock`设置为`true`，则每次不用使用`jest.mock`，jest 会自动的找到同名 mock 文件进行测试。

```javascript
function fetchData() {
  return new Promise((resolved, reject) => {
    resolved({ data: '123' })
  })
}

jest.mock('./mockfile')
// jest.unMock('./mockfile') 会让测试直接找到真正需要测试的代码

test('测试 getData', () => {
  return fetchData().then((data) => {
    expect(data).toEqual('123')
  })
})
```

如果需要对真实的源文件进行测试，则需要使用`jest.requireActual`

```javascript
// 比如 fetchData 我们需要 mock 但是 getNumber 不需要 mock
jest.mock('./demo')
import { fetchData } from './demo'
const { getNumber } = jest.requireActual('./demo')
```

**定时器模拟**

- 我们希望不必等定时器设定的时间就能对输入的函数进行测试

```javascript
function timer(callback) {
  setTimeout(() => {
    callback()
  }, 3000)
}
// 表示 setTimeout 使用使用 jest 自己的定时器
jest.useFakeTimers()

test('timer 测试', () => {
  const fn = jest.fn()
  timer(fn)
  // 表示立即执行定时器中的函数
  // 但是注意，但定时器中嵌套定时器时，嵌套的定时器也会直接运行
  jest.runAllTimers()
  // 表示 fn 至少需要调用一次
  expect(fn).toHaveBeenCalledTimers(1)
})
```

- 当有定时器嵌套时，我们只想当前正在跑的定时器执行，这时可以使用`jest.runOnlyPendingTimers`

```javascript
function timer(callback) {
  setTimeout(() => {
    callback()
    setTimeout(() => {
      callback()
    })
  }, 3000)
}

jest.useFakeTimers()

test('timer 测试', () => {
  const fn = jest.fn()
  timer(fn)
  // 此时会直接运行当前队列中的 timer 而不会运行嵌套 timer
  jest.runOnlyPendingTimers()
  expect(fn).toHaveBeenCalledTimers(1)
})
```

- `jest.advanceTimersByTime`可以接受一个时间参数，它能够设定时间快进多久从而触发 timer 设定的函数。另外注意这个函数会影响到当前作用域的所有测试用例，所以需要使用`beforeEach(() => jest.useFakeTimers())`在测试用例跑之前对 timer 进行初始化

**类的 mock**

- 直接使用`jest.mock('./utils')`来对类进行模拟

```javascript
// 运行完这步之后，util 类包括它的方法都相当于被替换为 jest.fn()
jest.mock('./utils')
import Utils from './utils'
import { demoFunction } from './demo'

test('测试 demoFunction', () => {
  // demoFunction 用于创建 Utils 类的实例，它调用了 Utils 类的 a 方法
  const utils = demoFunction()
  expect(utils).toHaveBeenCalled()
  expect(utils.mock.instances[0].a).toHaveBeenCalled()
})
```

### Snapshot 快照测试

- 快照测试一般用于测试配置文件
- `toMatchSnapshot`这个方法会让`expect`中的函数生成一个快照，当下次运行的时候如果生成的快照和之前生成的快照不匹配时就会报错。
- 如果快照中有`Date`，会导致每次快照匹配不上，此时可以在`toMatchSnapshot`中添加参数

```javascript
test('测试 generateConfig 函数', () => {
  expect(generateConfig()).toMatchSnapshot({
    // 表示每次测试时不用比较 time 属性是否相等
    time: expect.any(Date),
  })
})
```

- `toMatchInlineSnapshot`可以让生成的快照自动生成在测试用例中

### 对 DOm 节点操作的测试

- 正常的调用测试就行，因为 jest 在 node 环境下自己模拟了一套 dom 的 api

```javascript
function addDivToBody() {
  $('body').append('<div></div>')
}

test('addDivToBody 测试', () => {
  addDivToBody()
  expect($('body').find('div').length).toBe(2)
})
```

## Enzyme 配置

Enzyme 来自 airbnb 公司，是一个用于 React 的 JavaScript 测试工具，方便你判断、操纵和历遍 React Components 输出。

- enzyme 实际上就是对 react-dom 做了一些封装，所以不需要 react-dom
- `shallow`方法实际上就是一个浅渲染，它只关注输入的组件的渲染，对组件中的子组件会以简单的形式代替。它对单个组件做单元测试非常合适
  - `find`相当于一个 dom 选择器
  - `debug`能够输出 bug 日志
- `mount`与`shallow`相反，为全渲染，这个适用于集成测试
- 为防止某些选择器比如类选择器和代码耦合，可以在组件中加一个`data-test`属性，再通过`find([data-test='container'])`选择
- `npm i jest-enzyme -D`，注意我们需要先初始化这个插件，可以把初始化代码放在`jest.config.js`中
- `simulate`模拟事件，在事件触发之后如果还想使用这个组件，就需要重新获取

```javascript
const fn = jest.fn()
const wrapper = shallow(<Header addUndoItem={fn} />)
const inputElem = wrapper.find("[data-test='input']")
const userInput = '学习 React'
wrapper.setState({ value: userInput })
inputElem.simulate('keyUp', {
  keyCode: 13,
})
const newInputElem = wrapper.find("[data-test='input']")
expect(newInputElem.prop('value')).toBe('')
```

## TDD (Test Driven Development) 测试驱动的开发

1. 编写测试用例
2. 运行测试，测试用例无法通过测试
3. 编写代码，使测试用例通过测试
4. 优化代码完成开发
5. 重复上述步骤

所以 TDD 一般也被称为 Red-Green Development

**TDD 的优势**

1. 长期减少回归 bug
2. 代码质量更好（组织，可维护性）
3. 测试覆盖率高，但是注意测试覆盖率过高或耗费很多精力
4. 错误测试代码不容易出现

### React 环境中配置 Jest