import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Pressable,
  Image,
  ImageBackground,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Onboarding: undefined;
};

type OnboardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

const {width, height} = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Welcome to FoodApp',
    description: 'Discover the best food and drinks in your area',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
  },
  {
    id: '2',
    title: 'Easy Ordering',
    description: 'Order your favorite meals with just a few taps',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
  },
  {
    id: '3',
    title: 'Fast Delivery',
    description: 'Get your food delivered right to your doorstep',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
  },
];

const OnboardingScreen = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef<FlatList>(null);

  const viewableItemsChanged = useRef(({viewableItems}: any) => {
    setCurrentIndex(viewableItems[0]?.index ?? 0);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({index: currentIndex + 1});
    } else {
      navigation.navigate('Login');
    }
  };

  const renderItem = ({item}: {item: (typeof slides)[0]}) => {
    return (
      <View style={styles.slide}>
        <ImageBackground
          source={{uri: item.image}}
          style={styles.imageBackground}
          imageStyle={styles.image}>
          <View style={styles.overlay}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };

  const Pagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {slides.map((_, index) => (
          <View
            key={index.toString()}
            style={[
              styles.dot,
              {
                width: currentIndex === index ? 20 : 10,
                opacity: currentIndex === index ? 1 : 0.3,
              },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.skipContainer}>
        <Pressable
          onPress={() => navigation.navigate('Login')}
          style={({pressed}) => [
            styles.skipButton,
            pressed && styles.skipButtonPressed,
          ]}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>

      <FlatList
        data={slides}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={item => item.id}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

      <View style={styles.bottomContainer}>
        <Pagination />
        <Pressable
          onPress={scrollTo}
          style={({pressed}) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}>
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? "Let's Start" : 'Next'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  skipContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    padding: 20,
  },
  skipButton: {
    padding: 10,
  },
  skipButtonPressed: {
    opacity: 0.7,
  },
  skipText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  slide: {
    width,
    height: height,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  image: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    padding: 20,
  },
  textContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 20,
    borderRadius: 20,
    marginBottom: 100,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'transparent',
  },
  paginationContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: '#FF6B6B',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
