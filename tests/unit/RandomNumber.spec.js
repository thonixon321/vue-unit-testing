import RandomNumber from '@/components/RandomNumber'
import { mount } from "@vue/test-utils";
//TESTING PROPS
describe('RandomNumber', () => {
  test('By default, randomNumber data value should be 0', () => {
    const wrapper = mount(RandomNumber)
    //the span contains the randomNumber data value - should be 0 on load
    expect(wrapper.html()).toContain('<span>0</span>')
  })

  test('If button is clicked, randomNumber should be between 1 and 10', async () => {
    const wrapper = mount(RandomNumber)
    wrapper.find('button').trigger('click')
    //have to wait for dom to finish rendering so do the await $nextTick
    await wrapper.vm.$nextTick()
    //after button is clicked, check the text in span
    const randomNumber = parseInt(wrapper.find('span').element.textContent)
    expect(randomNumber).toBeGreaterThanOrEqual(1)
    expect(randomNumber).toBeLessThanOrEqual(10)
  })

  test('If button is clicked, randomNumber should be between 200 and 300', async () => {
    //this is how you update the props in component (200 for min, 300 for max)
    const wrapper = mount(RandomNumber, {
      propsData: {
        min: 200,
        max: 300,
      }
    })
    wrapper.find('button').trigger('click')
    //have to wait for dom to finish rendering so do the await $nextTick
    await wrapper.vm.$nextTick()
    //after button is clicked, check the text in span
    const randomNumber = parseInt(wrapper.find('span').element.textContent)
    expect(randomNumber).toBeGreaterThanOrEqual(200)
    expect(randomNumber).toBeLessThanOrEqual(300)
  })
})