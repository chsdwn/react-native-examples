import { fireEvent, render, screen } from '@testing-library/react-native';

import { Login } from '@/screens';

describe('[Login]', () => {
  it('should show an error message when username or password is wrong', () => {
    render(<Login />);

    fireEvent.changeText(screen.getByTestId('LoginUsernameInput'), 'chsdwn');
    fireEvent.changeText(screen.getByTestId('LoginPasswordInput'), '123455');
    fireEvent.press(screen.getByTestId('LoginLoginButton'));

    expect(screen.getByTestId('LoginErrorMessageText')).toBeOnTheScreen();
  });
});
