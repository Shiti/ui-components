import { formatDateAndTime } from '../../src/components/helper'

describe('formatDateAndTime', () => {
  beforeEach(() => {
    cy.clock(new Date('2023-01-02T12:00:00Z').getTime(), ['Date'])
  })

  it('should format the date correctly', () => {
    const utcTimestamp = '2023-01-01T12:00:00Z'
    const formatted = formatDateAndTime(utcTimestamp)
    expect(formatted).to.eq('Jan 1 4:00 AM')
  })

  it('should include year when the time difference is more than 365 days', () => {
    const utcTimestamp = '2022-01-01T12:00:00Z'
    const formatted = formatDateAndTime(utcTimestamp)
    expect(formatted).to.eq('Jan 1 2022 4:00 AM')
  })
})
