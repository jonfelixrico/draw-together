import { Outlet } from "react-router-dom";
import Container from 'react-bootstrap/Container'

export function Component () {
  return <Container className="vh-100">
    <Outlet />
  </Container>
}