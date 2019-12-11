import { Tutor } from '.'

let tutor

beforeEach(async () => {
  tutor = await Tutor.create({ user_id: 'test', address: 'test', bio: 'test', skills: 'test', pricePerHour: 'test', tagline: 'test', rating: 'test', taughtContract: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = tutor.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(tutor.id)
    expect(view.user_id).toBe(tutor.user_id)
    expect(view.address).toBe(tutor.address)
    expect(view.bio).toBe(tutor.bio)
    expect(view.skills).toBe(tutor.skills)
    expect(view.pricePerHour).toBe(tutor.pricePerHour)
    expect(view.tagline).toBe(tutor.tagline)
    expect(view.rating).toBe(tutor.rating)
    expect(view.taughtContract).toBe(tutor.taughtContract)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = tutor.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(tutor.id)
    expect(view.user_id).toBe(tutor.user_id)
    expect(view.address).toBe(tutor.address)
    expect(view.bio).toBe(tutor.bio)
    expect(view.skills).toBe(tutor.skills)
    expect(view.pricePerHour).toBe(tutor.pricePerHour)
    expect(view.tagline).toBe(tutor.tagline)
    expect(view.rating).toBe(tutor.rating)
    expect(view.taughtContract).toBe(tutor.taughtContract)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
