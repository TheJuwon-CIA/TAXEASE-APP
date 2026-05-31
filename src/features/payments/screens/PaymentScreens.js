import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOWS, SPACING } from '../../../theme/tokens';

const PAYMENTS = ['Flutterwave', 'Remita'];
const METHODS = ['Card Payment', 'Bank Transfer', 'Digital wallet', 'Installment plan'];
const BANKS = ['Nombank MFB', 'Guaranty Trust Bank', 'Paystack-Titan Bank', 'Sterling Bank'];

const BackButton = ({ navigation, dark = false }) => (
  <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
    <Ionicons name="chevron-back" size={52} color={dark ? COLORS.textDark : COLORS.black} />
  </TouchableOpacity>
);

const Progress = ({ step, total = 4 }) => (
  <View style={styles.progressRow}>
    {Array.from({ length: total }).map((_, index) => (
      <View
        key={index}
        style={[styles.progressBar, index < step ? styles.progressActive : styles.progressIdle]}
      />
    ))}
  </View>
);

const PrimaryButton = ({ title, onPress, outline = false, wide = false, compact = false, icon = true }) => (
  <TouchableOpacity
    style={[
      styles.primaryButton,
      outline && styles.outlineButton,
      wide && styles.wideButton,
      compact && styles.compactButton,
    ]}
    onPress={onPress}
  >
    <Text style={[styles.primaryButtonText, compact && styles.compactButtonText, outline && styles.outlineButtonText]}>
      {title}
    </Text>
    {icon ? (
      <Ionicons
        name="chevron-forward"
        size={32}
        color={outline ? COLORS.textDark : COLORS.white}
        style={styles.buttonIcon}
      />
    ) : null}
  </TouchableOpacity>
);

const OptionRow = ({ title, selected, onPress }) => (
  <TouchableOpacity style={styles.optionRow} onPress={onPress}>
    <Text style={styles.optionText}>{title}</Text>
    <View style={[styles.radio, selected && styles.radioSelected]}>
      {selected ? <Ionicons name="checkmark" size={30} color={COLORS.primary} /> : null}
    </View>
  </TouchableOpacity>
);

const PaymentIllustration = () => (
  <View style={styles.illustrationCircle}>
    <View style={styles.phone}>
      <View style={styles.phoneSpeaker} />
      <View style={styles.receipt}>
        <Text style={styles.receiptCurrency}>$</Text>
      </View>
      <View style={styles.cardShape} />
      <View style={styles.phoneBar} />
    </View>
    <View style={styles.checkBubble}>
      <Ionicons name="checkmark" size={34} color={COLORS.white} />
    </View>
  </View>
);

export const PaymentPortalScreen = ({ navigation }) => {
  const [selected, setSelected] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.portalContent} showsVerticalScrollIndicator={false}>
        <BackButton navigation={navigation} />
        <PaymentIllustration />
        <Text style={styles.portalTitle}>Payment Portal</Text>
        <Text style={styles.portalSubtitle}>Select any of the below{'\n'}portal for payment</Text>
        {PAYMENTS.map((item) => (
          <OptionRow key={item} title={item} selected={selected === item} onPress={() => setSelected(item)} />
        ))}
        {selected ? (
          <View style={styles.bottomAction}>
            <PrimaryButton
              title="Next"
              onPress={() => navigation.navigate(selected === 'Flutterwave' ? 'FlutterwavePayment' : 'SelectPaymentMethod')}
            />
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export const FlutterwavePaymentScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.invoiceContent} showsVerticalScrollIndicator={false}>
      <BackButton navigation={navigation} />
      <Text style={styles.invoiceTitle}>Flutterwave Technology{'\n'}solutions limited</Text>
      <View style={styles.referenceBlock}>
        <Text style={styles.referenceLabel}>Payment Reference Number (PRN):</Text>
        <Text style={styles.referenceValue}>28645789765</Text>
      </View>
      <View style={styles.invoiceTable}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHead}>Description</Text>
          <Text style={styles.tableHead}>Amount</Text>
        </View>
        <View style={[styles.tableRow, styles.tableBodyRow]}>
          <Text style={styles.tableText}>Total</Text>
          <Text style={styles.tableText}>NGN 747,500.00</Text>
        </View>
      </View>
      <View style={styles.invoiceActions}>
        <PrimaryButton title="Pay Online" icon={false} compact onPress={() => navigation.navigate('LoadingPayment')} />
        <PrimaryButton
          title="Print (To Pay at Bank)"
          icon={false}
          outline
          compact
          onPress={() => navigation.navigate('SelectPaymentMethod')}
        />
      </View>
    </ScrollView>
  </SafeAreaView>
);

export const SelectPaymentMethodScreen = ({ navigation }) => {
  const [selected, setSelected] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.flowContent} showsVerticalScrollIndicator={false}>
        <View style={styles.titleRow}>
          <BackButton navigation={navigation} />
          <Text style={styles.paymentTitle}>Payment</Text>
        </View>
        <Progress step={1} />
        <Text style={styles.flowHeading}>Select payment method</Text>
        {METHODS.map((item) => (
          <OptionRow key={item} title={item} selected={selected === item} onPress={() => setSelected(item)} />
        ))}
        {selected ? (
          <View style={styles.bottomAction}>
            <PrimaryButton
              title="Next"
              onPress={() => navigation.navigate(selected === 'Bank Transfer' ? 'SelectPreferredAccount' : 'LoadingPayment')}
            />
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export const SelectPreferredAccountScreen = ({ navigation }) => {
  const [selected, setSelected] = useState('Nombank MFB');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.flowContent} showsVerticalScrollIndicator={false}>
        <BackButton navigation={navigation} />
        <Progress step={2} />
        <Text style={styles.darkHeading}>Select preferred account</Text>
        <Text style={styles.flowSub}>Choose any of the account below to{'\n'}process your payment</Text>
        <View style={styles.bankList}>
          {BANKS.map((bank) => (
            <TouchableOpacity
              key={bank}
              style={[styles.bankCard, selected === bank && styles.bankCardActive]}
              onPress={() => setSelected(bank)}
            >
              <Text style={[styles.bankText, selected === bank && styles.bankTextActive]}>{bank}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.bottomAction}>
          <PrimaryButton title="Next" onPress={() => navigation.navigate('MakeTransfer', { bank: selected })} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const MakeTransferScreen = ({ navigation, route }) => {
  const bank = route.params?.bank || 'Nombank MFB';

  return (
    <SafeAreaView style={styles.transferContainer}>
      <ScrollView contentContainerStyle={styles.transferContent} showsVerticalScrollIndicator={false}>
        <BackButton navigation={navigation} dark />
        <Progress step={3} />
        <Text style={styles.transferTitle}>Make a transfer</Text>
        <Text style={styles.transferSub}>
          Transfer to the account below to complete your payment. Do not save for future use.
          Payment maybe declined if the amount does not match.
        </Text>
        <View style={styles.transferBank}>
          <Text style={styles.bankTextActive}>{bank}</Text>
        </View>
        <TransferDetail label="Amount" value="NGN 747,500.00" />
        <TransferDetail label="Account number" value="26708966425" />
        <View style={styles.transferDetail}>
          <Text style={styles.transferLabel}>Beneficiary</Text>
          <Text style={styles.transferValue}>FIRS Payment</Text>
        </View>
      </ScrollView>
      <View style={styles.transferFooter}>
        <Text style={styles.timerText}>Complete transfer in 120mins</Text>
        <PrimaryButton title="I have paid" icon={false} wide onPress={() => navigation.navigate('LoadingPayment')} />
      </View>
    </SafeAreaView>
  );
};

const TransferDetail = ({ label, value }) => (
  <View style={styles.transferDetail}>
    <View>
      <Text style={styles.transferLabel}>{label}</Text>
      <Text style={styles.transferValue}>{value}</Text>
    </View>
    <Ionicons name="copy-outline" size={32} color={COLORS.gray400} />
  </View>
);

export const LoadingPaymentScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => navigation.replace('PaymentSuccess'), 1600);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.loadingWrap}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingTitle}>Processing your payment</Text>
        <Text style={styles.loadingText}>We will confirm your payment attempt{'\n'}soon. Please stay on this page.</Text>
      </View>
    </SafeAreaView>
  );
};

const ReceiptFacts = () => (
  <View style={styles.receiptFacts}>
    {[
      ['Receipt Number:', 'TXR-2026-001'],
      ['Date:', 'January 15, 2026'],
      ['Paid By:', 'John Deo'],
      ['Amount Paid:', 'NGN 747,500.00'],
      ['Tax Period:', '2025 Q4'],
      ['Tax Type:', 'Corporate Income Tax'],
      ['Received By:', 'Taxease'],
    ].map(([label, value]) => (
      <Text key={label} style={styles.factText}>
        <Text style={styles.factLabel}>{label} </Text>
        {value}
      </Text>
    ))}
  </View>
);

const SuccessBadge = ({ small = false }) => (
  <View style={[styles.successBadge, small && styles.successBadgeSmall]}>
    <Ionicons name="checkmark" size={small ? 26 : 40} color={COLORS.white} />
  </View>
);

export const PaymentSuccessScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.successContent} showsVerticalScrollIndicator={false}>
      <Progress step={4} />
      <SuccessBadge />
      <Text style={styles.successTitle}>Payment Successful</Text>
      <Text style={styles.receiptTitle}>Tax payment receipt</Text>
      <ReceiptFacts />
      <View style={styles.successActions}>
        <PrimaryButton title="Download receipt" icon={false} compact onPress={() => navigation.navigate('ReceiptDetail')} />
        <PrimaryButton
          title="Back to dashboard"
          icon={false}
          outline
          compact
          onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
        />
      </View>
    </ScrollView>
  </SafeAreaView>
);

export const PaymentFailedScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.failedContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.failedTop}>Payment Failed</Text>
      <View style={styles.errorCircle}>
        <Text style={styles.errorBang}>!</Text>
      </View>
      <Text style={styles.failedTitle}>Payment Unsuccessful</Text>
      <Text style={styles.failedCopy}>We couldn't process your payment.{'\n'}Please check your details and try again.</Text>
      <View style={styles.errorBox}>
        <Text style={styles.errorTitle}>Error Message</Text>
        <Text style={styles.errorText}>Insufficient balance in your account{'\n'}(Error Code: PAY-455)</Text>
      </View>
      <View style={styles.failedActions}>
        <PrimaryButton title="Try again" icon={false} wide onPress={() => navigation.navigate('PaymentPortal')} />
        <PrimaryButton
          title="Back to dashboard"
          icon={false}
          outline
          wide
          onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}
        />
      </View>
    </ScrollView>
  </SafeAreaView>
);

export const ReceiptDetailScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={styles.receiptContent} showsVerticalScrollIndicator={false}>
      <SuccessBadge small />
      <Text style={styles.receiptSuccess}>Successful</Text>
      <Text style={styles.receiptTitle}>Tax payment receipt</Text>
      <View style={styles.receiptBox}>
        <ReceiptFacts />
      </View>
      <View style={styles.thankBox}>
        <Text style={styles.thankTitle}>Thank you!</Text>
        <Text style={styles.thankText}>Receipt downloaded successfully</Text>
      </View>
      <PrimaryButton title="Back to history" icon={false} outline wide onPress={() => navigation.navigate('MainTabs', { screen: 'Receipts' })} />
    </ScrollView>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  portalContent: { flexGrow: 1, paddingHorizontal: SPACING.lg, paddingTop: SPACING.xl, paddingBottom: SPACING.xl },
  backButton: { alignSelf: 'flex-start', marginBottom: SPACING.lg },
  illustrationCircle: {
    width: 156,
    height: 156,
    borderRadius: 78,
    backgroundColor: COLORS.systemInfo,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xl,
  },
  phone: {
    width: 58,
    height: 112,
    borderRadius: 10,
    backgroundColor: COLORS.textDark,
    alignItems: 'center',
    paddingTop: 8,
  },
  phoneSpeaker: { width: 16, height: 3, borderRadius: 2, backgroundColor: COLORS.gray500, marginBottom: 12 },
  receipt: { width: 28, height: 36, backgroundColor: COLORS.white, alignItems: 'center', justifyContent: 'center' },
  receiptCurrency: { fontSize: 20, color: COLORS.gray500, fontWeight: '900' },
  cardShape: {
    position: 'absolute',
    top: 50,
    left: -18,
    width: 86,
    height: 48,
    borderRadius: 4,
    backgroundColor: '#F66A66',
    borderTopWidth: 8,
    borderTopColor: COLORS.textDark,
  },
  phoneBar: { position: 'absolute', bottom: 6, width: 16, height: 5, borderRadius: 2, backgroundColor: COLORS.gray500 },
  checkBubble: {
    position: 'absolute',
    right: 36,
    top: 48,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#79C9C2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  portalTitle: { fontSize: FONTS.sizes.xxl, fontWeight: '900', color: COLORS.primary, marginBottom: SPACING.xl },
  portalSubtitle: { fontSize: FONTS.sizes.xl, fontWeight: '700', color: COLORS.black, lineHeight: 40, marginBottom: SPACING.lg },
  optionRow: {
    minHeight: 78,
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.sm,
  },
  optionText: { fontSize: FONTS.sizes.lg, color: COLORS.textDark, fontWeight: '500' },
  radio: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 3,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: { backgroundColor: COLORS.white },
  bottomAction: { marginTop: 'auto', alignItems: 'flex-end', paddingTop: SPACING.xxl },
  primaryButton: {
    minHeight: 64,
    minWidth: 144,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.medium,
  },
  outlineButton: { backgroundColor: COLORS.white, borderWidth: 2, borderColor: COLORS.primary },
  compactButton: { flex: 1, minWidth: 0, paddingHorizontal: SPACING.sm },
  wideButton: { width: '100%' },
  primaryButtonText: { color: COLORS.white, fontSize: FONTS.sizes.xl, fontWeight: '900' },
  compactButtonText: { fontSize: 20, textAlign: 'center' },
  outlineButtonText: { color: COLORS.textDark },
  buttonIcon: { marginLeft: SPACING.sm },
  invoiceContent: { flexGrow: 1, paddingHorizontal: SPACING.xl, paddingTop: SPACING.xl, paddingBottom: SPACING.xl },
  invoiceTitle: { textAlign: 'center', color: COLORS.primary, fontSize: 28, fontWeight: '900', lineHeight: 38, marginTop: SPACING.xl, marginBottom: 180 },
  referenceBlock: { alignItems: 'center', marginBottom: SPACING.xl },
  referenceLabel: { fontSize: FONTS.sizes.lg, fontWeight: '900', color: COLORS.textDark, textAlign: 'center' },
  referenceValue: { fontSize: FONTS.sizes.lg, color: COLORS.textDark, marginTop: SPACING.sm },
  invoiceTable: { borderWidth: 1, borderColor: '#D9D9D9', marginBottom: SPACING.xxxl },
  tableRow: { flexDirection: 'row', minHeight: 58 },
  tableBodyRow: { backgroundColor: '#F4F4F4' },
  tableHead: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: FONTS.sizes.lg,
    fontWeight: '900',
    color: COLORS.textDark,
    paddingVertical: SPACING.md,
    borderWidth: 1,
    borderColor: '#D9D9D9',
  },
  tableText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: FONTS.sizes.lg,
    color: COLORS.textDark,
    paddingVertical: SPACING.md,
    borderWidth: 1,
    borderColor: '#D9D9D9',
  },
  invoiceActions: { flexDirection: 'row', gap: SPACING.md, justifyContent: 'space-between' },
  flowContent: { flexGrow: 1, paddingHorizontal: SPACING.lg, paddingTop: SPACING.xl, paddingBottom: SPACING.xl },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.lg },
  paymentTitle: { color: COLORS.primary, fontSize: FONTS.sizes.xxl, fontWeight: '900', marginLeft: SPACING.md },
  progressRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: SPACING.xl },
  progressBar: { width: '19%', height: 4, borderRadius: 2 },
  progressActive: { backgroundColor: '#FF8B2B' },
  progressIdle: { backgroundColor: '#D9D9D9' },
  flowHeading: { fontSize: FONTS.sizes.xl, color: COLORS.black, fontWeight: '500', marginBottom: SPACING.lg },
  darkHeading: { fontSize: FONTS.sizes.xl, color: COLORS.textDark, fontWeight: '900', marginTop: SPACING.xl, marginBottom: SPACING.md },
  flowSub: { fontSize: FONTS.sizes.lg, color: COLORS.textDark, lineHeight: 32, marginBottom: SPACING.xl },
  bankList: { gap: SPACING.md },
  bankCard: {
    minHeight: 72,
    borderRadius: RADIUS.md,
    borderWidth: 2,
    borderColor: '#D9D9D9',
    justifyContent: 'center',
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.white,
    ...SHADOWS.medium,
  },
  bankCardActive: { borderColor: '#D9D9D9' },
  bankText: { fontSize: FONTS.sizes.lg, color: COLORS.black, fontWeight: '800' },
  bankTextActive: { fontSize: FONTS.sizes.lg, color: COLORS.textDark, fontWeight: '900' },
  transferContainer: { flex: 1, backgroundColor: '#F0F0F0' },
  transferContent: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.xl, paddingBottom: SPACING.xl },
  transferTitle: { color: COLORS.primary, fontSize: FONTS.sizes.xxl, fontWeight: '900', marginBottom: SPACING.md },
  transferSub: { fontSize: FONTS.sizes.lg, color: COLORS.textDark, lineHeight: 30, marginBottom: SPACING.lg },
  transferBank: {
    minHeight: 72,
    borderRadius: RADIUS.md,
    borderWidth: 2,
    borderColor: '#D9D9D9',
    justifyContent: 'center',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.lg,
  },
  transferDetail: {
    minHeight: 78,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
  },
  transferLabel: { fontSize: FONTS.sizes.lg, color: COLORS.textDark, marginBottom: SPACING.sm },
  transferValue: { fontSize: FONTS.sizes.lg, color: COLORS.textDark, fontWeight: '900' },
  transferFooter: { backgroundColor: '#E4E4E4', padding: SPACING.lg, gap: SPACING.lg },
  timerText: { fontSize: FONTS.sizes.lg, color: COLORS.textDark },
  loadingWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: SPACING.lg },
  loadingTitle: { marginTop: SPACING.xl, fontSize: FONTS.sizes.xxl, fontWeight: '900', color: COLORS.primary, textAlign: 'center' },
  loadingText: { marginTop: SPACING.lg, fontSize: FONTS.sizes.lg, color: COLORS.textDark, textAlign: 'center', lineHeight: 30 },
  successContent: { flexGrow: 1, paddingHorizontal: SPACING.lg, paddingTop: SPACING.xxxl, paddingBottom: SPACING.xl, alignItems: 'center' },
  successBadge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.xxxl,
    marginBottom: SPACING.lg,
  },
  successBadgeSmall: { width: 52, height: 52, borderRadius: 26, marginTop: SPACING.xl },
  successTitle: { color: COLORS.primary, fontSize: FONTS.sizes.xxl, fontWeight: '900', textAlign: 'center' },
  receiptTitle: { color: COLORS.textDark, fontSize: FONTS.sizes.lg, fontWeight: '900', textAlign: 'center', marginBottom: SPACING.xl },
  receiptFacts: { width: '100%', gap: SPACING.lg },
  factText: { fontSize: FONTS.sizes.lg, color: COLORS.textDark },
  factLabel: { fontWeight: '900' },
  successActions: { marginTop: SPACING.xl, width: '100%', flexDirection: 'row', gap: SPACING.sm },
  failedContent: { flexGrow: 1, paddingHorizontal: SPACING.lg, paddingTop: SPACING.xxxl, paddingBottom: SPACING.xl, alignItems: 'center' },
  failedTop: { fontSize: FONTS.sizes.xl, color: '#291F3B', fontWeight: '900', marginBottom: SPACING.xxl },
  errorCircle: { width: 78, height: 78, borderRadius: 39, backgroundColor: '#FF383C', alignItems: 'center', justifyContent: 'center', marginBottom: SPACING.xl },
  errorBang: { color: COLORS.white, fontSize: 54, fontWeight: '900' },
  failedTitle: { fontSize: FONTS.sizes.xxl, fontWeight: '900', color: COLORS.textDark, textAlign: 'center' },
  failedCopy: { marginTop: SPACING.md, fontSize: FONTS.sizes.lg, color: COLORS.textDark, textAlign: 'center', lineHeight: 30 },
  errorBox: { width: '100%', borderWidth: 1, borderColor: '#FF383C', backgroundColor: '#FFF6F6', borderRadius: RADIUS.md, padding: SPACING.xl, marginTop: SPACING.xxl },
  errorTitle: { color: '#FF383C', fontSize: FONTS.sizes.lg, fontWeight: '900', marginBottom: SPACING.sm },
  errorText: { color: COLORS.textDark, fontSize: FONTS.sizes.lg, lineHeight: 30 },
  failedActions: { width: '100%', marginTop: 'auto', gap: SPACING.lg, paddingTop: SPACING.xxxl },
  receiptContent: { flexGrow: 1, paddingHorizontal: SPACING.lg, paddingTop: SPACING.xl, paddingBottom: SPACING.xl, alignItems: 'center' },
  receiptSuccess: { color: COLORS.primary, fontSize: FONTS.sizes.xxl, fontWeight: '900', marginBottom: SPACING.sm },
  receiptBox: { borderWidth: 1, borderColor: '#D9D9D9', padding: SPACING.md, marginBottom: SPACING.xl },
  thankBox: { width: '100%', backgroundColor: '#F4F4F4', padding: SPACING.lg, marginBottom: SPACING.xl },
  thankTitle: { fontSize: FONTS.sizes.md, color: COLORS.textDark, fontWeight: '900' },
  thankText: { fontSize: FONTS.sizes.md, color: COLORS.textDark, marginTop: SPACING.xs },
});
