import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TaxeaseLogo from '../../../components/ui/TaxeaseLogo';
import Button from '../../../components/ui/Button';
import { COLORS, FONTS, SPACING } from '../../../theme/tokens';
import { useAuth } from '../../../providers/AuthProvider';
import { appImages } from '../../../lib/assets';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Calculate Your\n',
    titleHighlight: 'Taxes',
    titleSuffix: ' Easily!',
    subtitle:
      'Get accurate tax estimates in seconds with our smart and simple tax calculator.',
    isFirst: true,
  },
  {
    id: '2',
    title: 'Learn About Taxes',
    subtitle:
      'Understand tax rules, payment processes, and financial responsibilities with easy-to-follow guides',
    image: appImages.onboardingLearnTaxes,
  },
  {
    id: '3',
    title: 'Pay Taxes Securely',
    subtitle:
      'Make fast and secure tax payments directly from this app, anytime, anywhere.',
    image: appImages.onboardingPaySecurely,
  },
  {
    id: '4',
    title: 'Access Your ',
    titleHighlight: 'Receipts',
    titleSuffix: '\nAnytime',
    subtitle:
      'Download and store your payment receipts for easy tracking and future reference',
    image: appImages.onboardingReceipts,
    isLast: true,
  },
];

const OnboardingItem = ({ item }) => {
  return (
    <View style={[styles.slide, { width }]}>
      <View style={styles.topRow}>
        <TaxeaseLogo size={46} showText={false} />
        <TouchableOpacity>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.artWrap}>
        {item.isFirst ? (
          <TaxeaseLogo size={156} showText={false} />
        ) : (
          <Image source={item.image} style={styles.slideImage} resizeMode="cover" />
        )}
      </View>

      <View style={styles.copy}>
        <Text style={styles.slideTitle}>
          {item.title}
          {item.titleHighlight ? (
            <Text style={styles.slideGreen}>{item.titleHighlight}</Text>
          ) : null}
          {item.titleSuffix || ''}
        </Text>
        <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );
};

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const { completeOnboarding } = useAuth();

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleGetStarted();
    }
  };

  const handleGetStarted = async () => {
    await completeOnboarding();
    navigation.replace('GetStarted');
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        renderItem={({ item }) => <OnboardingItem item={item} />}
      />

      <View style={styles.bottomBar}>
        <Button
          title={currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          style={styles.nextBtn}
          textStyle={styles.nextText}
        />
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === currentIndex && styles.activeDot]}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  slide: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  topRow: {
    minHeight: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skipText: {
    fontSize: 28,
    color: '#D1D1D1',
    fontWeight: '400',
  },
  artWrap: {
    height: Math.min(width * 0.72, 380),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: SPACING.lg,
  },
  slideImage: {
    width: '116%',
    height: '118%',
  },
  copy: {
    marginTop: SPACING.xl,
  },
  slideTitle: {
    fontSize: 56,
    lineHeight: 66,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: SPACING.xl,
  },
  slideGreen: {
    color: COLORS.primaryLight,
  },
  slideSubtitle: {
    fontSize: 28,
    lineHeight: 42,
    color: COLORS.black,
    fontWeight: '500',
  },
  bottomBar: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    alignItems: 'center',
  },
  nextBtn: {
    width: '100%',
    minHeight: 78,
    borderRadius: 28,
  },
  nextText: {
    fontSize: 32,
    fontWeight: '800',
  },
  dots: {
    flexDirection: 'row',
    marginTop: SPACING.xl,
    gap: SPACING.sm,
  },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#D1D1D1',
  },
  activeDot: {
    backgroundColor: COLORS.black,
  },
});

export default OnboardingScreen;