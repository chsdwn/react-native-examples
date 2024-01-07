import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Icon } from './components';
import { initializeUnistyles } from './lib';

initializeUnistyles();

export const App = () => {
  const { styles, theme } = useStyles(stylesheet);

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.container}>
        <View style={[styles.container, styles.safeContainer]}>
          <View style={styles.header}>
            <Icon.ChevronLeft color={theme.colors.icon} />
          </View>

          <View style={styles.logoContainer}>
            <Icon.Instagram color={theme.colors.logo} />
          </View>

          <View style={styles.usernameInputContainer}>
            <TextInput
              placeholder="Username"
              placeholderTextColor={theme.colors.inputPlaceholder}
              style={styles.input}
            />
          </View>

          <View style={styles.passwordInputContainer}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={theme.colors.inputPlaceholder}
              style={styles.input}
              secureTextEntry
            />
          </View>

          <View style={styles.forgotPasswordBtnContainer}>
            <Pressable>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </Pressable>
          </View>

          <Pressable style={styles.loginBtn}>
            <Text style={styles.loginBtnText}>Log in</Text>
          </Pressable>

          <Pressable style={styles.loginWithFacebookBtn}>
            <Icon.Facebook />
            <Text style={styles.loginWithFacebookBtnText}>
              Log in with Facebook
            </Text>
          </Pressable>

          <View style={styles.seperator}>
            <View style={styles.seperatorLine} />
            <Text style={styles.seperatorText}>OR</Text>
            <View style={styles.seperatorLine} />
          </View>

          <View style={styles.signupContainer}>
            <Text style={styles.signupLabel}>Don't have an account?</Text>
            <Pressable style={styles.signupBtn}>
              <Text style={styles.signupBtnText}>Sign up.</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Instagram by Facebook</Text>
        </View>
      </SafeAreaView>

      <StatusBar style="auto" />
    </View>
  );
};

const stylesheet = createStyleSheet((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  container: {
    flex: 1,
  },
  safeContainer: {
    marginHorizontal: 16,
  },
  header: {
    marginTop: 12,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 96,
  },
  usernameInputContainer: {
    marginTop: 40,
  },
  input: {
    backgroundColor: theme.colors.inputBg,
    borderColor: theme.colors.inputBorder,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 5,
  },
  passwordInputContainer: {
    marginTop: 12,
  },
  forgotPasswordBtnContainer: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    color: theme.colors.linkBtnText,
    fontSize: 12,
    fontWeight: '500',
  },
  loginBtn: {
    backgroundColor: theme.colors.btnBgDisabled,
    padding: 14,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 30,
  },
  loginBtnText: {
    color: theme.colors.btnText,
    fontSize: 14,
    fontWeight: '600',
  },
  loginWithFacebookBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 36,
  },
  loginWithFacebookBtnText: {
    color: theme.colors.linkBtnText,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  seperator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  seperatorLine: {
    height: StyleSheet.hairlineWidth,
    flex: 1,
    backgroundColor: theme.colors.seperatorLine,
  },
  seperatorText: {
    color: theme.colors.seperatorText,
    fontSize: 12,
    fontWeight: '600',
    marginHorizontal: 30,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  signupLabel: {
    color: theme.colors.label,
    fontSize: 14,
    fontWeight: '400',
  },
  signupBtn: {
    marginLeft: 4,
  },
  signupBtnText: {
    color: theme.colors.linkBtnText,
    fontSize: 14,
    fontWeight: '400',
  },
  footer: {
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.footerBorder,
    backgroundColor: theme.colors.footerBg,
  },
  footerText: {
    color: theme.colors.label,
    fontSize: 12,
    fontWeight: '400',
  },
}));
