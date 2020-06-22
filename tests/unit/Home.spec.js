import Home from '@/views/Home'
import { mount } from '@vue/test-utils'
//STUBBING THE CHILD COMPONENT OF HOME COMPONENT SO IT DOESN'T DO ITS API CALL -
//THIS CHILD COMPONENT COULD HAVE A LOT GOING ON AND STUBBING WILL PREVENT
//UNNEEDED STUFF FROM HAPPENING - ISOLATES WHAT WE TEST
//(NO API CALLS FOR EXAMPLE), TESTS ONE THING AT A
//TIME, AND HELPS PINPOINT WHAT PART OF YOUR CODE IS BROKEN - USE STUBS
//SPARINGLY SINCE YOU ARE NOT TESTING THE REAL COMPONENT,
//IT IS THE STUBBED VERSION - SHALLOW MOUNT COULD BE USED TO ONLY MOUNT THE
//PARENT COMPONENT AND NOT THE CHILD - BUT WE DON'T USE SHALLOW MOUNT HERE SINCE
//IT ALSO HAS DISADVANTAGES LIKE OVER-STUBBING DOES AND SOME LIBRARIES DON'T
//SUPPORT IT - LIKE VUE TESTING LIBRARY
describe('Home', () => {
  it ('Wraps MessageDisplay component', () => {
    const wrapper = mount(Home, {
      stubs: {
        //replace MessageDisplay component (child of Home component) -
        //this html substitutes for the real component MessageDisplay -
        //alse known as the stubbed version of component
        MessageDisplay: '<p data-testid="message">Hello from the db!</p>'
      }
    })

    const message = wrapper.find('[data-testid="message"]').element.textContent

    expect(message).toEqual('Hello from the db!')
  })
})