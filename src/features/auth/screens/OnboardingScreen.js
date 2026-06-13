import React, { useState } from 'react';
import AppText from '../../../components/AppText';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TaxeaseLogo from '../../../components/ui/TaxeaseLogo';
import Button from '../../../components/ui/Button';
import { COLORS, FONTS, SPACING } from '../../../theme/tokens';
import { useAuth } from '../../../providers/AuthProvider';
import { appImages } from '../../../lib/assets';

const SLIDES = [
  {
    id: '1',
    title: 'Calculate Your Taxes Easily',
    subtitle:
      'Get accurate tax estimates in seconds with our smart and simple tax calculator.',
    image: appImages.logo,
    logoOnly: true,
  },
  {
    id: '2',
    title: 'Learn About Taxes',
    subtitle:
      'Understand tax rules, deductions, and financial responsibilities with easy-to-follow guides.',
    image: appImages.onboardingLearnTaxes,
  },
  {
    id: '3',
    title: 'Calculate PAYE Accurately',
    highlight: 'PAYE',
    subtitle:
      'Enter your income and deductions to estimate your monthly tax and take-home pay.',
    image: appImages.individualCard,
  },
  {
    id: '4',
    title: 'Review Your Results',
    subtitle:
      'See a clear breakdown of gross income, deductions, tax, and final net salary.',
    image: appImages.historyCard,
  },
];

const splitTitle = (title, highlight) => {
  if (!highlight) return <AppText style={styles.title}>{title}</AppText>;
  const [before, after] = title.split(highlight);
  return (
    <AppText style={styles.title}>
      {before}
      <AppText style={styles.green}>{highlight}</AppText>
      {after}
    </AppText>
  );
};

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { completeOnboarding } = useAuth();
  const current = SLIDES[currentIndex];
  const isLast = currentIndex === SLIDES.length - 1;

  const goNext = async () => {
    if (!isLast) {
      setCurrentIndex((index) => index + 1);
      return;
    }
    await completeOnboarding();
    navigation.replace('GetStarted');
  };

  const skip = async () => {
    await completeOnboarding();
    navigation.replace('GetStarted');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.topRow}>
          <TaxeaseLogo size={28} showText={false} />
          <TouchableOpacity onPress={skip}>
            <AppText style={styles.skip}>Skip</AppText>
          </TouchableOpacity>
        </View>

        <View style={styles.imageWrap}>
          {current.logoOnly ? (
            <TaxeaseLogo size={148} showText={false} />
          ) : (
            <Image source={current.image} style={styles.heroImage} resizeMode="cover" />
          )}
        </View>

        <View style={styles.copy}>
          {splitTitle(current.title, current.highlight)}
          <AppText style={styles.subtitle}>{current.subtitle}</AppText>
        </View>
      </View>

      <View style={styles.bottom}>
        <Button
          title={isLast ? 'Get Started' : 'Next'}
          onPress={goNext}
          style={styles.nextButton}
          textStyle={styles.nextText}
        />
        <View style={styles.dots}>
          {SLIDES.map((slide, index) => (
            <View
              key={slide.id}
              style={[styles.dot, index === currentIndex && styles.activeDot]}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { flex: 1, paddingHorizontal: SPACING.lg, paddingTop: SPACING.xl },
  topRow: {
    height: 92,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skip: { fontSize: FONTS.sizes.md, color: '#D2D2D2' },
  imageWrap: {
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: SPACING.xl,
  },
  heroImage: { width: '100%', height: '100%' },
  copy: { minHeight: 160 },
  title: {
    fontSize: 32,
    lineHeight: 38,
    color: COLORS.textDark,
    fontWeight: '800',
    marginBottom: SPACING.lg,
  },
  green: { color: COLORS.primary },
  subtitle: {
    fontSize: 15,
    lineHeight: 23,
    color: COLORS.black,
    fontWeight: '500',
  },
  bottom: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
    alignItems: 'center',
  },
  nextButton: { width: '100%', minHeight: 58, borderRadius: 10 },
  nextText: { fontSize: 18, fontWeight: '800' },
  dots: { flexDirection: 'row', gap: 8, marginTop: SPACING.xl },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#D1D1D1' },
  activeDot: { backgroundColor: COLORS.black },
});

export default OnboardingScreen;