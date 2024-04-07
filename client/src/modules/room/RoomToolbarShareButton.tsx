import { useState } from 'react'
import { toast } from 'react-toastify'
import { useCopyToClipboard } from 'react-use'
import Button from 'react-bootstrap/Button'
import BasicModal from '@/modules/common/BasicModal'
import Stack from 'react-bootstrap/Stack'

export default function RoomToolbarShareButton({
  roomId,
  url,
}: {
  roomId: string
  url: string
}) {
  const [show, setShow] = useState(false)
  const copy = useCopyToClipboard()[1]

  function copyCode() {
    copy(roomId as string)
    setShow(false)
    toast('The room code has been copied to the clipboard')
  }

  function copyUrl() {
    copy(url)
    setShow(false)
    toast('The join URL has been copied to the clipboard')
  }

  return (
    <>
      <Button
        size="sm"
        variant="primary"
        onClick={() => setShow(true)}
        data-cy="share-button"
      >
        Share
      </Button>
      <BasicModal
        title="Share"
        show={show}
        onHide={() => {
          setShow(false)
        }}
        data-cy="share-modal"
      >
        <Stack gap={2}>
          <div>
            Invite your friends! They can join through the <em>room code</em> or
            the <em>join URL</em>. Click to copy.
          </div>
          <div>
            Room code:{' '}
            <strong
              onClick={copyCode}
              data-cy="room-id"
              className="cursor-pointer text-primary"
            >
              {roomId}
            </strong>
          </div>
          <div>
            Join URL:{' '}
            <strong
              onClick={copyUrl}
              data-cy="url"
              className="cursor-pointer text-primary"
            >
              {url}
            </strong>
          </div>
        </Stack>
      </BasicModal>
    </>
  )
}
