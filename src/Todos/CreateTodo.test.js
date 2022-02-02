import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CreateTodo } from './CreateTodo'

test('On add new todo input field is empty', async () => {
    render(<CreateTodo />)

    userEvent.click(screen.getByRole('img', {name: 'Add icon'}))
    expect(screen.getByTestId('todo-input')).toHaveTextContent('')
})
