import { fireEvent, render, screen } from '@testing-library/react-native';

import { App } from '@/App';
import { useUserStore } from '@/stores';

describe('[App]', () => {
  it('should log in the user if the provided username and password are correct', () => {
    render(<App />);

    const username = 'chsdwn';
    fireEvent.changeText(screen.getByTestId('LoginUsernameInput'), username);
    fireEvent.changeText(screen.getByTestId('LoginPasswordInput'), '123456');
    fireEvent.press(screen.getByTestId('LoginLoginButton'));

    expect(screen.getByText(`Welcome: ${username}`));
  });

  it('should log out the user when the Logout button is pressed', () => {
    const username = 'chsdwn';
    useUserStore.getState().login(username);

    render(<App />);

    fireEvent.press(screen.getByTestId('HomeLogoutButton'));

    expect(screen.getByTestId('LoginUsernameInput')).toBeOnTheScreen();
  });
});
