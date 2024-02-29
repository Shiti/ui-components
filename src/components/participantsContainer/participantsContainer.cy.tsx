/* eslint-disable no-magic-numbers */
import { ParticipantsContainer } from '..'
import { ParticipantRole, ParticipantType } from '../types'

describe('ParticipantsContainer', () => {
  const participantList = '[data-cy=participant-list]'
  const participantListItem = '[data-cy=participant-list-item]'
  const participantRole = '[data-cy=participant-role]'
  const toggleParticipantListButton = '[data-cy=toggle-participant-list-button]'

  const createRandomParticipants = (numberOfParticipants: number) => {
    const participants = []
    for (let i = 0; i < numberOfParticipants; i++) {
      participants.push({
        id: `${i}`,
        displayName: `someUser${i}`,
        participantRole:
          i === 1 ? ParticipantRole.Owner : ParticipantRole.Member,
        participantType:
          i % 2 === 0 ? ParticipantType.Agent : ParticipantType.Human,
      })
    }

    return participants
  }

  beforeEach(() => {
    cy.mount(
      <ParticipantsContainer
        participants={createRandomParticipants(5)} // creates 2 humans and 3 agents
        isParticipantListOpen={true}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onClose={() => {}}
      />
    )
  })

  it('should display the users with role "Owner" first', () => {
    cy.get(`${participantListItem} ${participantRole}`)
      .first()
      .should('have.text', 'Owner')
  })

  it('renders the correct number of participants', () => {
    cy.get('[data-cy="participants-dialog-title"]').should(
      'have.text',
      'Participants (5)'
    )

    cy.get(participantList)
      .eq(0)
      .find(participantListItem)
      .should('have.length', 2)

    cy.get(participantList)
      .eq(1)
      .find(participantListItem)
      .should('have.length', 3)
  })

  it('should initially show 3 participants in each list and expand to all after clicking "Show All"', () => {
    cy.mount(
      <ParticipantsContainer
        participants={createRandomParticipants(9)} // creates 4 humans and 5 agents
        isParticipantListOpen={true}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onClose={() => {}}
      />
    )

    const initialParticipantsVisible = 3
    const participantsVisbileAfterShowAll = 4

    cy.get(participantList)
      .eq(0)
      .find(participantListItem)
      .should('have.length', initialParticipantsVisible)

    cy.get(toggleParticipantListButton)
      .first()
      .should('have.text', `Show All ${participantsVisbileAfterShowAll}`)

    cy.get(toggleParticipantListButton).first().click()
    cy.get(participantList)
      .eq(0)
      .find(participantListItem)
      .should('have.length', participantsVisbileAfterShowAll)

    cy.get(toggleParticipantListButton).first().should('have.text', 'Show Less')
  })
})
