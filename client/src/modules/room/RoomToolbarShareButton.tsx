import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import BasicModal from '@/modules/common/BasicModal'
import Stack from 'react-bootstrap/Stack'

export default function RoomToolbarShareButton({
  roomId,
  url,
  onCopy,
}: {
  roomId: string
  url: string
  onCopy: (copied: string) => void
}) {
  const [show, setShow] = useState(false)

  function copyHandler(copied: string) {
    onCopy(copied)
    setShow(false)
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
              onClick={() => copyHandler(roomId)}
              data-cy="room-id"
              className="cursor-pointer text-primary"
            >
              {roomId}
            </strong>
          </div>
          <div>
            Join URL:{' '}
            <strong
              onClick={() => copyHandler(url)}
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
