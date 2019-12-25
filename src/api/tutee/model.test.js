import { Tutee } from '.'

let tutee

beforeEach(async () => {
  tutee = await Tutee.create({ user: 'test', address: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = tutee.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(tutee.id)
    expect(view.user).toBe(tutee.user)
    expect(view.address).toBe(tutee.address)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = tutee.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(tutee.id)
    expect(view.user).toBe(tutee.user)
    expect(view.address).toBe(tutee.address)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
