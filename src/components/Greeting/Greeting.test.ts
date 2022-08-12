import { mount, shallowMount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Greeting from './Greeting.vue'
describe('Greeting.vue', () => {
  it('mount', () => {
    const wrapper = mount(Greeting)
    expect(wrapper.text()).toMatch('Vue and TDD')
  })
  it('shallowMount', () => {
    const shallowWrapper = shallowMount(Greeting, {
      propsData: { foo: 'bar' },
    })
    expect(shallowWrapper.text()).toMatch('Vue and TDD')
  })
})
