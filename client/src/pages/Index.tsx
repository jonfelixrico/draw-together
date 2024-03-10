import Container from 'react-bootstrap/Container'
import { useLocalStorage } from 'react-use'
import { If, Then, Else } from 'react-if'
import HomeActionStep from '../components/home/HomeActionStep'
import HomeUsernameStep from '../components/home/HomeUsernameStep'

export function Component () {
  const [username, setUsername, clearUsername] = useLocalStorage('username', '')

  return <Container className="vh-100 d-flex flex-column justify-content-center">
    <If condition={!!username}>
      <Then>
        <HomeActionStep username={username ?? ''} clearUsername={clearUsername} />
      </Then>

      <Else>
        <HomeUsernameStep onInput={setUsername} />
      </Else>
    </If>
  </Container>
}