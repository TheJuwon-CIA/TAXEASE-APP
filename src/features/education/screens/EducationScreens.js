import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppText from '../../../components/AppText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOWS, SPACING } from '../../../theme/tokens';

const BackButton = ({ navigation }) => (
  <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
    <Ionicons name="chevron-back" size={52} color={COLORS.black} />
  </TouchableOpacity>
);

const Dots = ({ active }) => (
  <View style={styles.dots}>
    {Array.from({ length: 5 }).map((_, index) => (
      <View key={index} style={[styles.dot, index === active ? styles.dotActive : styles.dotIdle]} />
    ))}
  </View>
);

const ResourceIcon = ({ type, active }) => {
  const color = active ? COLORS.white : COLORS.primary;

  return (
    <View style={styles.iconBox}>
      {type === 'book' ? <Ionicons name="bookmark-outline" size={66} color={color} /> : null}
      {type === 'map' ? <Ionicons name="map-outline" size={66} color={color} /> : null}
      {type === 'faq' ? <AppText style={[styles.questionIcon, { color }]}>?</AppText> : null}
      {type === 'video' ? <Ionicons name="videocam-outline" size={70} color={color} /> : null}
    </View>
  );
};

const ResourceCard = ({ title, body, type, active, onPress }) => (
  <TouchableOpacity style={[styles.resourceCard, active && styles.resourceCardActive]} onPress={onPress}>
    <ResourceIcon type={type} active={active} />
    <AppText style={[styles.resourceText, active && styles.resourceTextActive]}>
      <AppText style={styles.resourceStrong}>{title}</AppText>
      {body}
    </AppText>
  </TouchableOpacity>
);

export const EducationalResourcesScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.resourcesContent} showsVerticalScrollIndicator={false}>
      <AppText style={styles.resourcesPill}>Educational Resources</AppText>
      <AppText style={styles.learnTitle}>
        Learn more about <AppText style={styles.green}>taxes</AppText>{'\n'}and <AppText style={styles.green}>Deductions</AppText>
      </AppText>
      <View style={styles.resourceList}>
        <ResourceCard
          title="Tax Basics: "
          body="Learn the Fundamental of Taxation"
          type="book"
          active
          onPress={() => navigation.navigate('TaxBasics')}
        />
        <ResourceCard
          title="Deduction Guide: "
          body="Understand how deduction works"
          type="map"
          onPress={() => navigation.navigate('DeductionGuide')}
        />
        <ResourceCard
          title="FAQs: "
          body="Common tax questions answered"
          type="faq"
          onPress={() => navigation.navigate('FAQs')}
        />
        <ResourceCard
          title="Video Tutorials: "
          body="Watch simple video explanations"
          type="video"
          onPress={() => navigation.navigate('VideoTutorials')}
        />
      </View>
      <Dots active={0} />
    </ScrollView>
  </SafeAreaView>
);

const Bullet = ({ children }) => (
  <View style={styles.bulletRow}>
    <View style={styles.bulletDot} />
    <AppText style={styles.bulletText}>{children}</AppText>
  </View>
);

export const TaxBasicsScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.articleContent} showsVerticalScrollIndicator={false}>
      <BackButton navigation={navigation} />
      <AppText style={styles.articlePill}>TAX BASICS</AppText>
      <AppText style={styles.articleHeading}>What is <AppText style={styles.green}>Tax?</AppText></AppText>
      <AppText style={styles.articleBody}>Tax is a compulsory contribution paid to the government to support public services.</AppText>
      <AppText style={styles.articleHeading}>Why do we pay <AppText style={styles.green}>Tax?</AppText></AppText>
      <Bullet>Road Construction</Bullet>
      <Bullet>Healthcare</Bullet>
      <Bullet>Education</Bullet>
      <Bullet>Security</Bullet>
      <Dots active={1} />
    </ScrollView>
  </SafeAreaView>
);

export const DeductionGuideScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.articleContent} showsVerticalScrollIndicator={false}>
      <BackButton navigation={navigation} />
      <AppText style={styles.darkArticleTitle}>DEDUCTION GUIDE</AppText>
      <AppText style={styles.articleBody}>Tax deductions are amounts removed from your income before or after tax calculation.</AppText>
      <AppText style={styles.articleHeading}>Common <AppText style={styles.green}>deductions</AppText>{'\n'}include:</AppText>
      <Bullet>Pension contributions</Bullet>
      <Bullet>Health insurance</Bullet>
      <Bullet>National insurance</Bullet>
      <Bullet>Business expenses</Bullet>
      <Dots active={2} />
    </ScrollView>
  </SafeAreaView>
);

export const FAQsScreen = ({ navigation }) => {
  const questions = [
    'How is my tax calculated?',
    'Can I pay my taxes directly the app?',
    'How do I download my payment receipt?',
    'What happens if I miss a tax payment deadline?',
    'Are my payment details secure?',
    'Can i calculate taxes for my business?',
    'What deductions are included in tax calculation?',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.faqContent} showsVerticalScrollIndicator={false}>
        <BackButton navigation={navigation} />
        <AppText style={styles.darkArticleTitle}>FAQs</AppText>
        <View style={styles.faqList}>
          {questions.map((question) => (
            <TouchableOpacity key={question} style={styles.faqRow}>
              <View style={styles.faqDot} />
              <AppText style={styles.faqQuestion}>{question}</AppText>
              <Ionicons name="caret-down" size={22} color={COLORS.black} />
            </TouchableOpacity>
          ))}
        </View>
        <Dots active={3} />
      </ScrollView>
    </SafeAreaView>
  );
};

const videos = [
  ['How to Calculate Your Tax', '3 mins'],
  ['How to read your tax result', '2 mins'],
  ['Understanding tax deductions', '4 mins'],
  ['How to estimate net salary', '2 mins'],
  ['Avoid common filling mistakes', '4 mins'],
];

const VideoThumb = () => (
  <View style={styles.videoThumb}>
    <View style={styles.videoTop} />
    <View style={styles.videoBody}>
      <Ionicons name="play" size={26} color={COLORS.white} />
    </View>
  </View>
);

export const VideoTutorialsScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.videoContent} showsVerticalScrollIndicator={false}>
      <BackButton navigation={navigation} />
      <AppText style={styles.darkArticleTitle}>Video Tutorials</AppText>
      <View style={styles.videoList}>
        {videos.map(([title, time]) => (
          <TouchableOpacity key={title} style={styles.videoRow}>
            <VideoThumb />
            <View style={styles.videoCopy}>
              <AppText style={styles.videoTitle}>{title}</AppText>
              <AppText style={styles.videoTime}>{time}</AppText>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <Dots active={4} />
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  resourcesContent: { flexGrow: 1, paddingHorizontal: SPACING.lg, paddingTop: SPACING.xxl, paddingBottom: SPACING.lg },
  resourcesPill: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md,
    overflow: 'hidden',
    marginBottom: SPACING.xl,
  },
  learnTitle: { fontSize: FONTS.sizes.xxl, color: COLORS.black, fontWeight: '500', lineHeight: 46, marginBottom: SPACING.xxxl },
  green: { color: COLORS.primary },
  resourceList: { gap: SPACING.lg },
  resourceCard: {
    minHeight: 88,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    ...SHADOWS.medium,
  },
  resourceCardActive: { backgroundColor: COLORS.primary },
  iconBox: { width: 92, height: 78, alignItems: 'center', justifyContent: 'center', marginRight: SPACING.md },
  questionIcon: { fontSize: 92, fontWeight: '500', lineHeight: 96 },
  resourceText: { flex: 1, fontSize: 23, color: COLORS.primary, lineHeight: 36 },
  resourceTextActive: { color: COLORS.white },
  resourceStrong: { fontWeight: '900' },
  dots: { flexDirection: 'row', alignSelf: 'center', gap: SPACING.sm, marginTop: 'auto', paddingTop: SPACING.xl },
  dot: { width: 18, height: 18, borderRadius: 9 },
  dotActive: { backgroundColor: COLORS.black },
  dotIdle: { backgroundColor: '#D9D9D9' },
  articleContent: { flexGrow: 1, paddingHorizontal: SPACING.lg, paddingTop: SPACING.xl, paddingBottom: SPACING.lg },
  backButton: { alignSelf: 'flex-start', marginBottom: SPACING.xl },
  articlePill: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    fontSize: FONTS.sizes.xxl,
    fontWeight: '900',
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    overflow: 'hidden',
    marginBottom: SPACING.xxxl,
  },
  darkArticleTitle: { fontSize: FONTS.sizes.xxl, fontWeight: '900', color: COLORS.textDark, marginBottom: SPACING.xxxl },
  articleHeading: { fontSize: FONTS.sizes.xxl, fontWeight: '600', color: COLORS.black, lineHeight: 46, marginBottom: SPACING.lg },
  articleBody: { fontSize: 27, color: COLORS.black, fontWeight: '600', lineHeight: 48, marginBottom: SPACING.xxl },
  bulletRow: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.xl, paddingLeft: SPACING.lg },
  bulletDot: { width: 18, height: 18, borderRadius: 9, backgroundColor: '#7A7A7A', marginRight: SPACING.xl },
  bulletText: { fontSize: FONTS.sizes.xl, color: COLORS.black, fontWeight: '600' },
  faqContent: { flexGrow: 1, paddingHorizontal: SPACING.lg, paddingTop: SPACING.xl, paddingBottom: SPACING.lg },
  faqList: { gap: SPACING.md },
  faqRow: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.black,
  },
  faqDot: { width: 18, height: 18, borderRadius: 9, backgroundColor: '#7A7A7A', marginRight: SPACING.lg },
  faqQuestion: { flex: 1, fontSize: 22, color: COLORS.black, fontWeight: '600', lineHeight: 32 },
  videoContent: { flexGrow: 1, paddingHorizontal: SPACING.lg, paddingTop: SPACING.xl, paddingBottom: SPACING.lg },
  videoList: { gap: SPACING.xl },
  videoRow: { flexDirection: 'row', alignItems: 'center' },
  videoThumb: { width: 96, height: 72, backgroundColor: COLORS.white, ...SHADOWS.medium, marginRight: SPACING.md },
  videoTop: { height: 12, backgroundColor: COLORS.textDark },
  videoBody: { flex: 1, margin: SPACING.sm, backgroundColor: '#FF383C', alignItems: 'center', justifyContent: 'center' },
  videoCopy: { flex: 1 },
  videoTitle: { fontSize: 23, color: COLORS.black, fontWeight: '500', lineHeight: 30 },
  videoTime: { fontSize: FONTS.sizes.md, color: COLORS.black, fontWeight: '700' },
});
