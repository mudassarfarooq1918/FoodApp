import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
  ViewToken,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthStackParamList} from '../../navigation/AuthNavigator';

const {width, height} = Dimensions.get('window');

type OnboardingScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'Onboarding'
>;

interface OnboardingItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

const onboardingData: OnboardingItem[] = [
  {
    id: '1',
    title: 'Welcome to FoodApp',
    description: 'Discover the best food and drinks in your area',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
  },
  {
    id: '2',
    title: 'Fast Delivery',
    description: 'Get your favorite meals delivered to your doorstep',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
  },
  {
    id: '3',
    title: 'Easy Ordering',
    description: 'Order your favorite food with just a few taps',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
  },
];

const OnboardingScreen = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList<OnboardingItem>>(null);

  const viewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      setCurrentIndex(viewableItems[0]?.index ?? 0);
    },
  ).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const scrollTo = () => {
    if (currentIndex < onboardingData.length - 1) {
      slidesRef.current?.scrollToIndex({index: currentIndex + 1});
    } else {
      navigation.navigate('Login');
    }
  };

  const renderItem = ({item}: {item: OnboardingItem}) => {
    return (
      <View style={styles.slide}>
        <Image source={{uri: item.image}} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  const Paginator = () => {
    return (
      <View style={styles.paginationContainer}>
        {onboardingData.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  opacity,
                },
              ]}
              key={index.toString()}
            />
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flatListContainer}>
        <FlatList
          data={onboardingData}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={item => item.id}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>
      <Paginator />
      <TouchableOpacity style={styles.button} onPress={scrollTo}>
        <Text style={styles.buttonText}>
          {currentIndex === onboardingData.length - 1 ? 'Get Started' : 'Next'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatListContainer: {
    flex: 3,
  },
  slide: {
    width,
    height: height * 0.75,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    borderRadius: 20,
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  paginationContainer: {
    flexDirection: 'row',
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF6B6B',
    marginHorizontal: 8,
  },
  button: {
    backgroundColor: '#FF6B6B',
    padding: 20,
    borderRadius: 10,
    marginBottom: Platform.OS === 'ios' ? 40 : 20,
    width: width * 0.8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingScreen;
