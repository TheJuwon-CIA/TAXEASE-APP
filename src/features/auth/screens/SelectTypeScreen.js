import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SPACING, RADIUS } from '../../../theme/tokens';
import { useAuth } from '../../../providers/AuthProvider';

const USER_TYPES = [
  {
    id: 'individual',
    label: 'Individual Use',
    description: 'For personal understanding of income tax deductions',
  },
  {
    id: 'freelancer',
    label: 'Freelancer',
    description:
      'An independent professional who offers services to multiple clients',
  },
  {
    id: 'employee',
    label: 'Employee',
    description:
      'Employed for wages or salary, especially at non-executive level',
  },
  {
    id: 'business',
    label: 'Business Owner',
    description:
      'Oversees a company that sells goods or services for profit',
  },
];

const SelectTypeScreen = ({ navigation }) => {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, login } = useAuth();

  const handleSelect = async (typeId) => {
    setSelected(typeId);
    setLoading(true);
    await login(
      {
        id: user?.id || 'demo-user',
        email: user?.email || 'demo@taxease.app',
        firstName: user?.firstName || 'Demo',
        lastName: user?.lastName || 'User',
        userType: typeId,
      },
      'demo-token'
    );
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={26} color={COLORS.textDark} />
      </TouchableOpacity>

      <Text style={styles.title}>Tell Us About You</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {USER_TYPES.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={styles.card}
            onPress={() => handleSelect(type.id)}
            activeOpacity={0.75}
          >
            {/* Icon row */}
            <View style={styles.iconRow}>
              <View style={styles.iconCircle}>
                <Ionicons name="person" size={22} color={COLORS.white} />
              </View>
              <View style={styles.labelBg}>
                <Text style={styles.typeLabel}>{type.label}</Text>
              </View>
            </View>
            {/* Description */}
            <Text style={styles.typeDescription}>{type.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.lg,
  },
  backBtn: {
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
    width: 36,
  },
  title: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '800',
    color: COLORS.primaryLight,
    marginBottom: SPACING.xl,
  },
  card: {
    marginBottom: SPACING.lg,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  labelBg: {
    flex: 1,
    backgroundColor: COLORS.gray300,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.sm,
  },
  typeLabel: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.primaryLight,
  },
  typeDescription: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textMedium,
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: SPACING.sm,
  },
});

export default SelectTypeScreen;
