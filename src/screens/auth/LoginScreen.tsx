import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Pressable,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Onboarding: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

const {width, height} = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Implement login logic here
    console.log('Login pressed');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.contentContainer}>
            <View style={styles.logoContainer}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
                }}
                style={styles.logo}
              />
              <Text style={styles.title}>Welcome Back!</Text>
              <Text style={styles.subtitle}>Sign in to continue</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Icon
                  name="mail-outline"
                  size={20}
                  color="#FFA000"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.inputContainer}>
                <Icon
                  name="lock-closed-outline"
                  size={20}
                  color="#FFA000"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  placeholderTextColor="#999"
                />
                <Pressable
                  onPress={togglePasswordVisibility}
                  style={({pressed}) => [
                    styles.eyeIcon,
                    pressed && styles.eyeIconPressed,
                  ]}>
                  <Icon
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#FFA000"
                  />
                </Pressable>
              </View>

              <Pressable
                onPress={() => navigation.navigate('ForgotPassword')}
                style={({pressed}) => [
                  styles.forgotPassword,
                  pressed && styles.forgotPasswordPressed,
                ]}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </Pressable>

              <Pressable
                onPress={handleLogin}
                style={({pressed}) => [
                  styles.loginButton,
                  pressed && styles.loginButtonPressed,
                ]}>
                <LinearGradient
                  colors={['#FFA000', '#FFC107']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.gradient}>
                  <Text style={styles.loginButtonText}>Login</Text>
                </LinearGradient>
              </Pressable>

              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account? </Text>
                <Pressable
                  onPress={() => navigation.navigate('Signup')}
                  style={({pressed}) => [
                    styles.signupLink,
                    pressed && styles.signupLinkPressed,
                  ]}>
                  <Text style={styles.signupLinkText}>Sign Up</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.05,
  },
  logo: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE082',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: '#fff',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    padding: 0,
  },
  eyeIcon: {
    padding: 5,
    marginLeft: 5,
  },
  eyeIconPressed: {
    opacity: 0.7,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
    padding: 5,
  },
  forgotPasswordPressed: {
    opacity: 0.7,
  },
  loginButton: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginButtonPressed: {
    opacity: 0.8,
  },
  gradient: {
    padding: 15,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    color: '#666',
    fontSize: 14,
  },
  signupLink: {
    padding: 5,
  },
  signupLinkPressed: {
    opacity: 0.7,
  },
  signupLinkText: {
    color: '#FFA000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#FFA000',
    fontSize: 14,
  },
});

export default LoginScreen;
