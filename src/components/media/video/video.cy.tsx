/* eslint-disable no-magic-numbers */
import 'cypress-real-events'

import { supportedViewports } from '../../../../cypress/support/variables'
import Video from './video'

describe('Video', () => {
  const videoElement = '[data-cy=video-element]'
  const controls = '[data-cy=controls]'
  const volumeSlider = '[data-cy=volume-slider]'
  const muteButton = '[data-cy=mute-button]'
  const progressSlider = '[data-cy=progress-slider]'
  const pauseButton = '[data-cy=pause-button]'
  const playButton = '[data-cy=play-button]'
  const pictureInPictureButton = '[data-cy=picture-in-picture-button]'
  const pictureInPictureExitButton = '[data-cy=exit-picture-in-picture-button]'
  const fullScreenEnterButton = '[data-cy=fullscreen-button]'
  const fullScreenExitButton = '[data-cy=exit-fullscreen-button]'
  const transcript = '[data-cy=transcript]'
  const transcriptToggle = '[data-cy=transcript-toggle]'
  const error = '[data-cy=error]'

  const src = '/videoExamples/videoStorybook.mp4'
  const title = 'Video Component'
  const captions = '/audioExamples/captions.vtt'
  const transcriptContent =
    'This is a sample transcript for testing the video component.'

  beforeEach(() => {
    cy.mount(
      <Video
        src={src}
        title={title}
        captions={captions}
        transcript={transcriptContent}
      />
    )
    cy.get('[data-cy="spinner"]').should('be.visible')
    cy.get('[data-cy="spinner"]').should('not.exist')
  })

  supportedViewports.forEach((viewport) => {
    it(`should toggle between pause and play when clicking the play/pause button on ${viewport} screen`, () => {
      cy.viewport(viewport)
      if (viewport === 'macbook-13') {
        cy.get(controls).realHover()
      }
      cy.get(playButton).should('be.visible')
      cy.get(videoElement).its('0.paused').should('equal', true)
      cy.get(playButton).realClick()
      cy.get(pauseButton).should('be.visible')
      cy.get(videoElement).its('0.paused').should('equal', false)
      cy.get(pauseButton).click()
      cy.get(playButton).should('be.visible')
    })
    it(`should show and hide the transcript when clicking the transcript toggle on ${viewport} screen`, () => {
      cy.viewport(viewport)
      cy.get(transcript).should('not.exist')
      cy.get(transcriptToggle).should('contain', 'Show')
      cy.get(transcriptToggle).click()
      cy.get(transcript).should('be.visible')
      cy.get(transcriptToggle).should('contain', 'Hide')
    })
    it('should toggle between fullscreen and normal mode when clicking the fullscreen button', () => {
      cy.viewport(viewport)
      if (viewport === 'macbook-13') {
        cy.get(controls).realHover()
      }
      cy.get(fullScreenEnterButton).realClick()
      cy.document().then((doc) => {
        expect(doc.fullscreenElement).to.not.be.null
      })
      cy.get(fullScreenExitButton).should('exist')
      cy.get(fullScreenExitButton).click()
      cy.document().then((doc) => {
        expect(doc.fullscreenElement).to.be.null
      })
    })
    it(`should display an error message when no valid sources are found on ${viewport} screen`, () => {
      cy.viewport(viewport)
      cy.mount(<Video src="" />)
      cy.get(videoElement).should('not.exist')
      cy.get(error).should('be.visible')
      cy.get(error).should('contain', 'The video resource has failed to load')
    })
    it(`should display an error message when the resource loading has been stalled on ${viewport} screen`, () => {
      cy.viewport(viewport)
      // Delay server response to simulate stalled media loading
      cy.intercept(src, (req) => {
        req.on('response', (res) => {
          // Wait for delay in milliseconds before sending the response to the client.
          res.setDelay(5000)
        })
      })
      // Listen for the stalled event on the video element
      cy.get(videoElement).then((video) => {
        video.on('stalled', () => {
          cy.get(error).should('contain', 'Failed to fetch data, but trying')
        })
      })
    })
    it(`should display an error message if entering fullscreen fails on ${viewport} screen`, () => {
      cy.viewport(viewport)
      cy.window().then((window) => {
        cy.stub(window.HTMLElement.prototype, 'requestFullscreen').rejects(
          new TypeError('some error')
        )
      })

      if (viewport === 'macbook-13') {
        cy.get(controls).realHover()
      }
      cy.get(fullScreenEnterButton).realClick()
      cy.get('[data-cy=control-error-message]').should('be.visible')
    })
    it(`should display an error message if pressing play fails on ${viewport} screen`, () => {
      cy.viewport(viewport)
      cy.window().then((window) => {
        cy.stub(window.HTMLMediaElement.prototype, 'play').rejects(
          new DOMException('some error')
        )
      })

      if (viewport === 'macbook-13') {
        cy.get(controls).realHover()
      }
      cy.get(playButton).click()
      cy.get('[data-cy=control-error-message]').should('be.visible')
    })
  })

  context('Mobile', () => {
    beforeEach(() => {
      cy.viewport('iphone-6')
      cy.mount(
        <Video
          src={src}
          title={title}
          captions={captions}
          transcript={transcriptContent}
        />
      )
      cy.get('[data-cy="spinner"]').should('be.visible')
      cy.get('[data-cy="spinner"]').should('not.exist')
    })

    it('should show all the controls on fullscreen mode', () => {
      cy.get(fullScreenEnterButton).should('be.visible')
      cy.get(fullScreenEnterButton).realClick()
      cy.get(controls).click()
      cy.get(playButton).should('be.visible')
      cy.get(transcriptToggle).should('be.visible')
      cy.get(fullScreenExitButton).should('be.visible')
      cy.get(pictureInPictureButton).should('be.visible')
      cy.get(progressSlider).should('be.visible')
    })
  })

  context('Desktop', () => {
    beforeEach(() => {
      cy.viewport('macbook-13')
      cy.mount(
        <Video
          src={src}
          title={title}
          captions={captions}
          transcript={transcriptContent}
        />
      )
      cy.get('[data-cy="spinner"]').should('be.visible')
      cy.get('[data-cy="spinner"]').should('not.exist')
    })
    it(`should go forwards and backwards 10 seconds when clicking the forward/back buttons`, () => {
      cy.get(controls).realHover()
      cy.get('[data-cy=forward-ten-seconds-button]').click()
      cy.get(videoElement).its('0.currentTime').should('equal', 10)
      cy.get('[data-cy=replay-ten-seconds-button]').click()
      cy.get(videoElement).its('0.currentTime').should('equal', 0)
    })
    it(`should mute and unmute the audio when clicking the mute button`, () => {
      cy.get(controls).realHover()
      cy.get(playButton).click()
      cy.get(videoElement).its('0.muted').should('equal', false)
      cy.get(muteButton).click({ force: true })
      cy.get(videoElement).its('0.muted').should('equal', true)
    })
    it(`should change the volume when adjusting the volume slider on desktop`, () => {
      cy.get(videoElement).its('0.volume').should('equal', 1)
      cy.get(controls).realHover()
      cy.get(muteButton).focus().get(volumeSlider).should('be.visible')
      // wait for slider animation
      cy.wait(1000)
      cy.get(volumeSlider).type('{leftArrow}')
      cy.get(videoElement).its('0.volume').should('be.lessThan', 1)
    })
    it(`should change the time when the video progress slider is adjusted`, () => {
      cy.get(videoElement).its('0.currentTime').should('equal', 0)
      cy.get(controls).realHover()
      cy.get(progressSlider).type('{rightArrow}')
      cy.get(videoElement).its('0.currentTime').should('be.greaterThan', 0)
    })
    it('should show the correct view when going to fullscreen mode then changing the viewport size', () => {
      cy.get(controls).realHover()
      cy.get(fullScreenEnterButton).should('be.visible')
      cy.get(fullScreenEnterButton).realClick()
      cy.document().then((doc) => {
        expect(doc.fullscreenElement).to.not.be.null
      })
      cy.viewport('iphone-6')
      cy.get(controls).realHover()
      cy.get(fullScreenExitButton).should('be.visible')
      cy.get(fullScreenExitButton).click()
      cy.document().then((doc) => {
        expect(doc.fullscreenElement).to.be.null
      })
    })
    it('should toggle between picture-in-picture and normal mode when clicking the picture-in-picture button', () => {
      cy.get(pictureInPictureButton).realClick()
      cy.document().then((doc) => {
        expect(doc.pictureInPictureElement).to.not.be.null
      })
      cy.get(pictureInPictureExitButton).should('exist')
      cy.get(pictureInPictureExitButton).click()
      cy.document().then((doc) => {
        expect(doc.pictureInPictureElement).to.be.null
      })
    })
  })
})