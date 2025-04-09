import React from 'react'
import { v4 as getUUID } from 'uuid'

import {
  supportedViewports,
  testUser,
} from '../../../cypress/support/variables'
import { StreamingText } from '..'
import Text from '../text/text'
import ElementRenderer from './elementRenderer'

const supportedElements = {
  text: Text,
  streamingText: StreamingText,
}

const sampleMessage = {
  id: '1',
  timestamp: '2020-01-02T00:00:00.000Z',
  sender: testUser,
  conversationId: 'lkd9vc',
  topic: 'default',
}

const commonProps = {
  sender: testUser,
  supportedElements: supportedElements,
}

describe('ElementRenderer', () => {
  supportedViewports.forEach((viewport) => {
    it(`renders the correct element for a supported format on ${viewport} screen`, () => {
      const mockWsClient = {
        send: cy.stub(),
        close: cy.stub(),
        reconnect: cy.stub(),
      }

      cy.viewport(viewport)
      cy.mount(
        <ElementRenderer
          messages={[
            {
              ...sampleMessage,
              data: { text: 'Test Text' },
              format: 'text',
            },
          ]}
          {...commonProps}
          ws={mockWsClient}
        />
      )
      cy.get('p').should('contain.text', 'Test Text')
    })

    it(`renders the original message and its update messages correctly on ${viewport} screen`, () => {
      const mockWsClient = {
        send: cy.stub(),
        close: cy.stub(),
        reconnect: cy.stub(),
      }

      cy.viewport(viewport)
      cy.mount(
        <ElementRenderer
          messages={[
            {
              ...sampleMessage,
              data: { text: 'This' },
              format: 'streamingText',
            },
            {
              id: getUUID(),
              timestamp: '2020-01-02T00:00:00.000Z',
              sender: testUser,
              conversationId: 'lkd9vc',
              topic: 'default',
              threadId: '1',
              data: { text: ' is' },
              format: 'streamingText',
            },
            {
              id: getUUID(),
              timestamp: '2020-01-02T00:00:00.000Z',
              sender: testUser,
              conversationId: 'lkd9vc',
              topic: 'default',
              threadId: '1',
              data: { text: ' streaming' },
              format: 'streamingText',
            },
            {
              id: getUUID(),
              timestamp: '2020-01-02T00:00:00.000Z',
              sender: testUser,
              conversationId: 'lkd9vc',
              topic: 'default',
              threadId: '1',
              data: { text: ' text.' },
              format: 'streamingText',
            },
          ]}
          {...commonProps}
          ws={mockWsClient}
        />
      )
      cy.get('p').should('contain.text', 'This is streaming text.')
    })

    it(`renders a message for an unsupported format on ${viewport} screen`, () => {
      const mockWsClient = {
        send: cy.stub(),
        close: cy.stub(),
        reconnect: cy.stub(),
      }

      cy.viewport(viewport)
      cy.mount(
        <ElementRenderer
          messages={[
            {
              ...sampleMessage,
              data: { text: 'Test Text' },
              format: 'unsupported',
            },
          ]}
          {...commonProps}
          ws={mockWsClient}
        />
      )

      cy.contains('Unsupported element format: unsupported').should('exist')
    })
  })
})
