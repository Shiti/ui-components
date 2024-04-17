import './video.css'

import { useMediaQuery, useTheme } from '@mui/material'
import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Fade from '@mui/material/Fade'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'

import type { VideoFormat } from '../../types'
import {
  MoveTenSecondsButton,
  PlaybackRateButton,
  PlayOrPauseButton,
  ProgressSlider,
  ToggleTranscriptButton,
  VolumeSettings,
} from '../controls/commonControls'
import { MediaIconButton } from '../controls/mediaIconButton'
import {
  FullscreenButton,
  PictureInPictureButton,
} from '../controls/videoControls'
import TimeIndicator from '../timeIndicator/timeIndicator'
import Transcript from '../transcript/transcript'

export default function Video(props: VideoFormat) {
  const [isTranscriptVisible, setIsTranscriptVisible] = useState(false)
  const [areCaptionsVisible, setAreCaptionsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement)
  const [areControlsVisible, setAreControlsVisible] = useState(false)

  const [controlErrorMessage, setControlErrorMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [elapsedTime, setElapsedTime] = useState(0)

  const videoContainerRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const inActivityTimeout = 3000 // Hide controls after 3 seconds of inactivity
  useEffect(() => {
    const loadingErrorMessage = 'The video resource has failed to load'
    const stalledErrorMessage = 'Failed to fetch data, but trying'

    function updateElapsedTime() {
      if (videoRef.current) {
        setElapsedTime(videoRef.current.currentTime)
      }
    }
    function handleCanPlay() {
      setErrorMessage('')
      setIsLoading(false)
    }
    function handleError(errorMessage: string) {
      setErrorMessage(errorMessage)
      setIsLoading(false)
    }
    let timeoutId: ReturnType<typeof setTimeout>

    function startTimeout() {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(
        () => setAreControlsVisible(false),
        inActivityTimeout
      )
    }

    videoRef.current?.addEventListener('timeupdate', updateElapsedTime)
    videoRef.current?.addEventListener('canplay', handleCanPlay)
    videoRef.current?.addEventListener('error', () =>
      handleError(loadingErrorMessage)
    )
    videoRef.current?.addEventListener('stalled', () =>
      handleError(stalledErrorMessage)
    )
    document.addEventListener('fullscreenchange', () => {
      setIsFullscreen(!!document.fullscreenElement)
    })

    videoContainerRef.current?.addEventListener('mousemove', () => {
      setAreControlsVisible(true)
      startTimeout()
    })
    videoContainerRef.current?.addEventListener('mouseleave', () => {
      setAreControlsVisible(false)
    })
    videoContainerRef.current?.addEventListener('keydown', () => {
      setAreControlsVisible(true)
      startTimeout()
    })
  }, [])

  const controlStyles = {
    backgroundColor: theme.palette.background.paper,
    opacity: areControlsVisible ? 1 : 0,
  }

  function renderVideoElement() {
    return (
      <video
        className="rustic-video-element"
        data-cy="video-element"
        ref={videoRef}
        src={props.src}
        poster={props.poster}
      >
        {areCaptionsVisible && (
          <track src={props.captions} kind="captions" default />
        )}
      </video>
    )
  }

  function renderTitle() {
    if (videoRef.current && videoContainerRef.current) {
      return (
        <Box className="rustic-video-title" sx={controlStyles}>
          <Typography variant="body2" data-cy="video-title">
            {props.title}
          </Typography>
          {isFullscreen && isMobile && (
            <Box>
              <PictureInPictureButton
                mediaElement={videoRef.current}
                onError={setControlErrorMessage}
              />
              <FullscreenButton
                element={videoContainerRef.current}
                onError={setControlErrorMessage}
              />
            </Box>
          )}
        </Box>
      )
    }
  }

  function renderTranscript() {
    if (props.transcript && isTranscriptVisible) {
      return <Transcript transcript={props.transcript} />
    }
  }

  function renderCaptionsButton() {
    if (props.captions && props.captions.length > 0) {
      const action = areCaptionsVisible ? 'captionsOff' : 'captionsOn'

      return (
        <MediaIconButton
          action={action}
          onClick={() => setAreCaptionsVisible(!areCaptionsVisible)}
        />
      )
    }
  }

  function renderToggleTranscriptButton() {
    if (props.transcript) {
      return (
        <ToggleTranscriptButton
          isTranscriptVisible={isTranscriptVisible}
          setIsTranscriptVisible={() =>
            setIsTranscriptVisible(!isTranscriptVisible)
          }
        />
      )
    }
  }

  function renderMobileView() {
    if (isFullscreen) {
      return (
        <>
          {videoRef.current && videoContainerRef.current && (
            <Box
              className="rustic-video-controls"
              data-cy="controls"
              sx={controlStyles}
            >
              <Box className="rustic-video-top-controls">
                <PlayOrPauseButton
                  mediaElement={videoRef.current}
                  onError={setControlErrorMessage}
                />
                <ProgressSlider mediaElement={videoRef.current} />
                <TimeIndicator
                  elapsedTimeInSeconds={elapsedTime}
                  durationTimeInSeconds={videoRef.current.duration}
                />
              </Box>

              <Box className="rustic-video-bottom-controls">
                <Box className="rustic-time-controls">
                  <MoveTenSecondsButton
                    mediaElement={videoRef.current}
                    movement="replay"
                  />
                  <MoveTenSecondsButton
                    mediaElement={videoRef.current}
                    movement="forward"
                  />
                  {renderCaptionsButton()}
                  <PlaybackRateButton mediaElement={videoRef.current} />
                </Box>

                {renderToggleTranscriptButton()}
              </Box>
              {renderTranscript()}
            </Box>
          )}
        </>
      )
    }
    return (
      <>
        {videoRef.current && videoContainerRef.current && (
          <Box className="rustic-video-controls-mobile-preview">
            <PlayOrPauseButton
              mediaElement={videoRef.current}
              onError={setControlErrorMessage}
            />
            <Box className="rustic-video-controls-right">
              {renderToggleTranscriptButton()}
              <FullscreenButton
                element={videoContainerRef.current}
                onError={setControlErrorMessage}
              />
            </Box>
          </Box>
        )}
      </>
    )
  }

  function renderDesktopView() {
    return (
      <>
        {videoRef.current && videoContainerRef.current && (
          <Box
            className="rustic-video-controls"
            data-cy="controls"
            sx={controlStyles}
          >
            <ProgressSlider mediaElement={videoRef.current} />

            <Box className="rustic-video-bottom-controls">
              <Box className="rustic-video-bottom-controls-left">
                <PlayOrPauseButton
                  mediaElement={videoRef.current}
                  onError={setControlErrorMessage}
                />
                <MoveTenSecondsButton
                  mediaElement={videoRef.current}
                  movement="replay"
                />
                <MoveTenSecondsButton
                  mediaElement={videoRef.current}
                  movement="forward"
                />
                {renderCaptionsButton()}
                <PlaybackRateButton mediaElement={videoRef.current} />

                <VolumeSettings mediaElement={videoRef.current} />

                <TimeIndicator
                  elapsedTimeInSeconds={elapsedTime}
                  durationTimeInSeconds={videoRef.current.duration}
                  style="condensed"
                />
              </Box>

              <Box className="rustic-video-bottom-controls-right">
                {renderToggleTranscriptButton()}
                <PictureInPictureButton
                  mediaElement={videoRef.current}
                  onError={setControlErrorMessage}
                />
                <FullscreenButton
                  element={videoContainerRef.current}
                  onError={setControlErrorMessage}
                />
              </Box>
            </Box>
            {isFullscreen && renderTranscript()}
          </Box>
        )}
      </>
    )
  }

  const renderControls = isMobile ? renderMobileView : renderDesktopView

  if (errorMessage.length > 0) {
    return (
      <Alert severity="error" data-cy="error">
        {errorMessage}
      </Alert>
    )
  }

  return (
    <Box className="rustic-video" data-cy="video">
      {isLoading && (
        <CircularProgress
          data-cy="spinner"
          className="rustic-video-loading-spinner"
        />
      )}

      <Box
        ref={videoContainerRef}
        className="rustic-video-screen"
        data-cy="video-screen"
        sx={{
          visibility: isLoading ? 'hidden' : 'visible',
        }}
      >
        <Fade in={controlErrorMessage.length > 0}>
          <Alert
            severity="error"
            className="rustic-video-control-error-message"
            data-cy="control-error-message"
            onClose={() => setControlErrorMessage('')}
          >
            {controlErrorMessage}
          </Alert>
        </Fade>

        {(!isMobile || isFullscreen) && renderTitle()}
        {renderVideoElement()}
        {renderControls()}
      </Box>
      {!isFullscreen && renderTranscript()}
    </Box>
  )
}
