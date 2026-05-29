import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOWS, SPACING } from '../constants/theme';

const tabs = ['All', 'Successful', 'Failed'];

const payments = [
  { date: 'January 15, 2026', time: '10:45am', amount: 'NGN 747,500.00', status: 'Successful' },
  { date: 'December 12, 2025', time: '8:45pm', amount: 'NGN 700,500.00', status: 'Successful' },
  { date: 'November 15, 2026', time: '11:00am', amount: 'NGN 640,000.00', status: 'Successful' },
  { date: 'October 15, 2026', time: '10:05am', amount: 'NGN 724,050.00', status: 'Failed' },
];

const ReceiptsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('All');
  const filtered = activeTab === 'All' ? payments : payments.filter((item) => item.status === activeTab);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={38} color={COLORS.black} />
          </TouchableOpacity>
          <Text style={styles.title}>Payment History</Text>
        </View>

        <View style={styles.tabs}>
          {tabs.map((tab) => (
            <TouchableOpacity key={tab} style={styles.tabButton} onPress={() => setActiveTab(tab)}>
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
              {activeTab === tab ? <View style={styles.tabLine} /> : null}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Recent payments</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={30} color="#777777" />
          </TouchableOpacity>
        </View>

        <View style={styles.list}>
          {filtered.map((item) => (
            <TouchableOpacity
              key={`${item.date}-${item.amount}`}
              style={styles.paymentCard}
              onPress={() => navigation.navigate(item.status === 'Successful' ? 'ReceiptDetail' : 'PaymentFailed')}
            >
              <View>
                <Text style={styles.paymentType}>Corporate Income Tax</Text>
                <Text style={styles.paymentDate}>{item.date}</Text>
                <Text style={styles.paymentTime}>{item.time}</Text>
              </View>
              <View style={styles.amountBlock}>
                <Text style={styles.amount}>{item.amount}</Text>
                <Text style={[styles.status, item.status === 'Failed' && styles.statusFailed]}>{item.status}</Text>
              </View>
              <Ionicons name="chevron-forward" size={32} color={COLORS.textDark} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  content: { paddingTop: SPACING.xl, paddingBottom: SPACING.xl },
  header: { paddingHorizontal: SPACING.lg },
  title: {
    color: COLORS.primary,
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#F4F4F4',
    paddingHorizontal: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
  },
  tabButton: { flex: 1, alignItems: 'center', paddingTop: SPACING.md },
  tabText: { fontSize: FONTS.sizes.md, color: COLORS.textDark, fontWeight: '700', marginBottom: SPACING.md },
  tabTextActive: { color: COLORS.textDark },
  tabLine: { width: '100%', height: 3, backgroundColor: '#FF8B2B' },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    marginBottom: SPACING.md,
  },
  sectionTitle: { fontSize: FONTS.sizes.lg, color: COLORS.black, fontWeight: '900' },
  searchButton: {
    width: 58,
    height: 58,
    borderRadius: RADIUS.md,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: { paddingHorizontal: SPACING.md, gap: SPACING.xs },
  paymentCard: {
    minHeight: 96,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    backgroundColor: COLORS.white,
    padding: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  paymentType: { fontSize: FONTS.sizes.md, color: COLORS.textDark, fontWeight: '900', marginBottom: SPACING.sm },
  paymentDate: { fontSize: FONTS.sizes.md, color: COLORS.textDark, textAlign: 'center' },
  paymentTime: { fontSize: FONTS.sizes.md, color: COLORS.textDark, textAlign: 'center' },
  amountBlock: { marginLeft: 'auto', alignItems: 'flex-end', gap: SPACING.sm },
  amount: { fontSize: FONTS.sizes.md, color: COLORS.textDark, fontWeight: '900' },
  status: { fontSize: FONTS.sizes.md, color: COLORS.primary },
  statusFailed: { color: '#FF383C' },
});

export default ReceiptsScreen;
