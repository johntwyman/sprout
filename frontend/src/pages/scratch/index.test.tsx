import { render, screen } from '@testing-library/react'
import Admin from '.'

it("App component renders with hello world text", () => {
  render(<Admin/>)
  expect(screen.getByText(/Hello World/i)).toBeInTheDocument()
})