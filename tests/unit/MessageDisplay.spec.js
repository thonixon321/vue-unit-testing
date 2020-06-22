import MessageDisplay from '@/components/MessageDisplay'
import { mount } from '@vue/test-utils'
import { getMessage } from '@/services/axios'
import flushPromises from 'flush-promises'

//TESTING API CALLS

//mocks the getMessage module from services/axios
jest.mock('@/services/axios')
beforeEach(() => {
  //clears out the mock calls, so when the first test does a mock call, it sets
  //the toHaveBeenCalled() back to 0, so we can expect toHaveBeenCalled() to equal 1 in the next test after it makes its mock api call
  jest.clearAllMocks()
})

describe('MessageDisplay', () => {
  it('Calls getMessage and displays message', async () => {
     const mockMessage = 'Hello from the db'
     //mock the getMessage api call that resolves to a value we expect the api to return
     getMessage.mockResolvedValueOnce({ text: mockMessage }) // calling our mocked get request
     const wrapper = mount(MessageDisplay)
      // wait for promise to resolve (con't access the aysnc in the MessageDisplay.vue file, so we use the 3rd party plugin flushPromises to await this mock api call to finish and return a value - resolves promises and then we can go onto assertions)
      await flushPromises()
      // check that call happened once
      expect(getMessage).toHaveBeenCalledTimes(1)
      // check that component displays message (the p tag with the data attribute will be found if api call resolved properly)
      const message = wrapper.find('[data-testid="message"]').element.textContent
      //assert that the api returned the correct text
      expect(message).toEqual(mockMessage)
  })

  it('Displays an error when getMessage call fails', async () => {
    const mockError = 'Oops! Something went wrong.'
    //mock the failed API call
    getMessage.mockRejectedValueOnce(mockError)
    const wrapper = mount(MessageDisplay)
    //wait for promise to resolve
    await flushPromises()
    //check that call happened once (have to clear out the one that happened above first)
    expect(getMessage).toHaveBeenCalledTimes(1)
    //check that component displays error
    const error = wrapper.find('[data-testid="message-error"]').element.textContent
    expect(error).toEqual(mockError)

  })
})