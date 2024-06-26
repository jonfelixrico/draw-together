import Container from 'react-bootstrap/Container'
import { useLocalStorage } from 'react-use'
import { If, Then, Else } from 'react-if'
import HomeActionStep from '@/modules/home/HomeActionStep'
import HomeUsernameStep from '@/modules/home/HomeUsernameStep'

export function Component() {
  const [username, setUsername, clearUsername] = useLocalStorage(
    'username',
    '',
    {
      raw: true,
    }
  )

  return (
    <Container className="min-vh-100 py-5 d-flex flex-column justify-content-center">
      <If condition={!!username}>
        <Then>
          <HomeActionStep
            username={username ?? ''}
            clearUsername={clearUsername}
          />
        </Then>

        <Else>
          <HomeUsernameStep onInput={setUsername} />
        </Else>
      </If>
    </Container>
  )
}
