import { Contract } from '.'

let contract

beforeEach(async () => {
  contract = await Contract.create({ tutor: 'test', tutee: 'test', hours: 'test', price: 'test', startDate: 'test', endDate: 'test', status: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = contract.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(contract.id)
    expect(view.tutor).toBe(contract.tutor)
    expect(view.tutee).toBe(contract.tutee)
    expect(view.hours).toBe(contract.hours)
    expect(view.price).toBe(contract.price)
    expect(view.startDate).toBe(contract.startDate)
    expect(view.endDate).toBe(contract.endDate)
    expect(view.status).toBe(contract.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = contract.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(contract.id)
    expect(view.tutor).toBe(contract.tutor)
    expect(view.tutee).toBe(contract.tutee)
    expect(view.hours).toBe(contract.hours)
    expect(view.price).toBe(contract.price)
    expect(view.startDate).toBe(contract.startDate)
    expect(view.endDate).toBe(contract.endDate)
    expect(view.status).toBe(contract.status)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
