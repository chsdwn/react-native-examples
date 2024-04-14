import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z
  .object({
    email: z.string().email('Enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  });

type FormSchema = z.infer<typeof schema>;

const defaultValues: FormSchema = {
  email: '',
  password: '',
  passwordConfirmation: '',
};

export const App = () => {
  const {
    control,
    formState: { isSubmitted, isValid },
    handleSubmit,
  } = useForm<FormSchema>({
    defaultValues,
    resolver: zodResolver(schema) as any,
  });

  const handleRegister = (values: FormSchema) => {
    console.warn('[Register Form]:', values);
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <View>
            <TextInput
              placeholder="chsdwn@github.com"
              value={value}
              onChangeText={onChange}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {error?.message && (
              <Text style={styles.errorLabel}>{error.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <View>
            <TextInput
              placeholder="Enter your password"
              value={value}
              onChangeText={onChange}
              style={styles.input}
            />
            {error?.message && (
              <Text style={styles.errorLabel}>{error.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="passwordConfirmation"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <View>
            <TextInput
              placeholder="Enter your password again"
              value={value}
              onChangeText={onChange}
              style={styles.input}
            />
            {error?.message && (
              <Text style={styles.errorLabel}>{error.message}</Text>
            )}
          </View>
        )}
      />

      <Pressable
        disabled={isSubmitted && !isValid}
        onPress={handleSubmit(handleRegister)}
        style={{
          backgroundColor: 'skyblue',
          borderRadius: 8,
          alignItems: 'center',
          padding: 16,
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Register</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 16,
  },
  input: {
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
  },
  errorLabel: {
    marginTop: 4,
    color: 'red',
    fontSize: 14,
  },
});
