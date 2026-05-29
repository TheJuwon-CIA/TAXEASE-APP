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
import TaxeaseLogo from '../components/TaxeaseLogo';
import Button from '../components/Button';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { useAuth } from '../context/AuthContext';

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
    illustration: 'learn',
  },
  {
    id: '3',
    title: 'Pay Taxes Securely',
    subtitle:
      'Make fast and secure tax payments directly from this app, anytime, anywhere.',
    illustration: 'pay',
  },
  {
    id: '4',
    title: 'Access Your ',
    titleHighlight: 'Receipts',
    titleSuffix: '\nAnytime',
    subtitle:
      'Download and store your payment receipts for easy tracking and future reference',
    illustration: 'receipts',
    isLast: true,
  },
];

const IllustrationPlaceholder = ({ type, size }) => {
  const colors = {
    learn: '#4A90D9',
    pay: '#E53935',
    receipts: '#8BC34A',
  };
  const icons = {
    learn: '📚',
    pay: '💳',
    receipts: '🧾',
  };
  return (
    <View
      style={[
        {
          width: size,
          height: size * 0.7,
          borderRadius: 16,
          backgroundColor: colors[type] + '22',
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}
    >
      <Text style={{ fontSize: size * 0.3 }}>{icons[type]}</Text>
    </View>
  );
};

const OnboardingItem = ({ item, logoSize, isSmall }) => {
  return (
    <View style={[styles.slide, { width }]}>
      {/* Top logo (small on slides 2-4) */}
      <View style={styles.topLogo}>
        <TaxeaseLogo size={item.isFirst ? 70 : 36} showText={false} />
      </View>

      <TouchableOpacity style={styles.skipBtn}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Content area */}
      <View style={styles.content}>
        {item.isFirst ? (
          <>
            <TaxeaseLogo size={70} showText={true} textSize={28} />
            <View style={styles.titleWrap}>
              <Text style={styles.titleBig}>
                Calculate Your{'\n'}
                <Text style={styles.titleGreen}>Taxes</Text>
                <Text style={styles.titleBig}> Easily!</Text>
              </Text>
            </View>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </>
        ) : (
          <>
            <IllustrationPlaceholder type={item.illustration} size={width * 0.7} />
            <View style={styles.textBox}>
              <Text style={styles.slideTitle}>
                {item.title}
                {item.titleHighlight ? (
                  <Text style={styles.slideGreen}>{item.titleHighlight}</Text>
                ) : null}
                {item.titleSuffix || ''}
              </Text>
              <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
            </View>
          </>
        )}
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

      {/* Bottom nav */}
      <View style={styles.bottomBar}>
        <Button
          title={currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
          style={styles.nextBtn}
        />
        {/* Dots */}
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
    paddingTop: SPACING.md,
  },
  topLogo: {
    marginBottom: SPACING.sm,
  },
  skipBtn: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.lg,
  },
  skipText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.gray500,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: SPACING.lg,
  },
  titleWrap: {
    marginTop: SPACING.xl,
    alignSelf: 'flex-start',
    width: '100%',
  },
  titleBig: {
    fontSize: FONTS.sizes.xxxl,
    fontWeight: '800',
    color: COLORS.secondary,
    lineHeight: 44,
  },
  titleGreen: {
    color: COLORS.primaryLight,
    fontWeight: '800',
    fontSize: FONTS.sizes.xxxl,
  },
  subtitle: {
    marginTop: SPACING.md,
    fontSize: FONTS.sizes.md,
    color: COLORS.textMedium,
    lineHeight: 24,
    alignSelf: 'flex-start',
  },
  textBox: {
    borderWidth: 1.5,
    borderColor: '#4A90D9',
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginTop: SPACING.md,
    width: '100%',
  },
  slideTitle: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: SPACING.sm,
  },
  slideGreen: {
    color: COLORS.primaryLight,
  },
  slideSubtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textMedium,
    lineHeight: 22,
  },
  bottomBar: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    alignItems: 'center',
  },
  nextBtn: {
    width: '100%',
  },
  dots: {
    flexDirection: 'row',
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.gray300,
  },
  activeDot: {
    backgroundColor: COLORS.textDark,
  },
});

export default OnboardingScreen;
