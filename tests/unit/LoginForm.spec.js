import LoginForm from '@/components/LoginForm'
import { mount } from '@vue/test-utils'
//TESTING EMITTED EVENTS
describe('LoginForm', () => {
  it('emits an event with a user data payload', () => {
    const wrapper = mount(LoginForm)
    // 1. Find text input (finds input based on its data attribute testid)
    const input = wrapper.find('[data-testid="name-input"]')
    // 2. Set value for text input
    input.setValue('Tom Nixon')
    // 3. Simulate form submission (don't need to trigger on button because form element is in place at the wrapper root level)
    wrapper.trigger('submit')
    // 4. Assert event has been emitted (formSubmitted is the name of the custom event we are checking for, which returns array of formSubmitted event call )
    const formSubmittedCalls = wrapper.emitted('formSubmitted')
    //check formSubmitted event was emitted
    expect(formSubmittedCalls).toHaveLength(1)
    // 5. Assert payload is correct
    const expectedPayload = { name: 'Tom Nixon' }
    //comes out like [[{ name: 'Tom Nixon' }]] so use [0][0] to access
    expect(wrapper.emitted('formSubmitted')[0][0]).toMatchObject(expectedPayload)
  })
})