import { Message } from '.'
import { User } from '../user'

let user, message

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  message = await Message.create({ sender: user, receiver: 'test', content: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = message.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(message.id)
    expect(typeof view.sender).toBe('object')
    expect(view.sender.id).toBe(user.id)
    expect(view.receiver).toBe(message.receiver)
    expect(view.content).toBe(message.content)
    expect(view.status).toBe(message.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = message.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(message.id)
    expect(typeof view.sender).toBe('object')
    expect(view.sender.id).toBe(user.id)
    expect(view.receiver).toBe(message.receiver)
    expect(view.content).toBe(message.content)
    expect(view.status).toBe(message.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
