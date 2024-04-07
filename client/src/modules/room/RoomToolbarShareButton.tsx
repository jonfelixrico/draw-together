import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCopyToClipboard } from 'react-use'
import Button from 'react-bootstrap/Button'
import BasicModal from '@/modules/common/BasicModal'
import Stack from 'react-bootstrap/Stack'

export function RoomToolbarShareButton() {
  const [show, setShow] = useState(false)
  const { roomId } = useParams()
  const link = window.location.href
  const copy = useCopyToClipboard()[1]

  function copyCode() {
    copy(roomId as string)
    setShow(false)
    toast('The room code has been copied to the clipboard')
  }

  function copyUrl() {
    copy(link)
    setShow(false)
    toast('The join URL has been copied to the clipboard')
  }

  return (
    <>
      <Button size="sm" variant="primary" onClick={() => setShow(true)}>
        Share
      </Button>
      <BasicModal
        title="Share"
        show={show}
        onHide={() => {
          setShow(false)
        }}
      >
        <Stack gap={2}>
          <div>
            Invite your friends! They can join through the <em>room code</em> or
            the <em>join URL</em>. Click to copy.
          </div>
          <div>
            Room code:{' '}
            <strong onClick={copyCode} className="cursor-pointer text-primary">
              {roomId}
            </strong>
          </div>
          <div>
            Join URL:{' '}
            <strong onClick={copyUrl} className="cursor-pointer text-primary">
              {link}
            </strong>
          </div>
        </Stack>
      </BasicModal>
    </>
  )
}
