import AppHeader from '@/components/AppHeader'
import { mount } from '@vue/test-utils'

describe('AppHeader', () => {
  test('If user is not logged in, do not show logout button', () => {
    const wrapper = mount(AppHeader)
    //assertion about outcome - isVisible() returns boolean (user not logged in so it should be false)
    expect(wrapper.find('button').isVisible()).toBe(false)
  })

  test('If user is logged in, show logout button', async () => {
    const wrapper = mount(AppHeader)
    //vue utils can help us change data in component
    wrapper.setData({ loggedIn: true })

    //test will run before button can render to DOM, so to prevent this test from
    //failing, we use the async/await and nextTick so that we
    //wait for the DOM updates
    await wrapper.vm.$nextTick()
    expect(wrapper.find('button').isVisible()).toBe(true)
  })
})