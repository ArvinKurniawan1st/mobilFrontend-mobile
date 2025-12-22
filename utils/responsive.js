import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Device categories
export const isSmallDevice = width < 375;
export const isMediumDevice = width >= 375 && width < 768;
export const isTablet = width >= 768;
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const screenWidth = width;
export const screenHeight = height;

/**
 * Responsive size - returns appropriate size based on device
 * @param {number} small - Size for small devices (<375px)
 * @param {number} medium - Size for medium devices (375-767px)
 * @param {number} large - Size for tablets (>=768px)
 */
export const rs = (small, medium = null, large = null) => {
  if (isTablet && large !== null) return large;
  if (isMediumDevice && medium !== null) return medium;
  return small;
};

/**
 * Responsive font size
 * @param {number} baseSize - Base font size
 */
export const rfs = (baseSize) => {
  if (isSmallDevice) return baseSize * 0.9;
  if (isTablet) return baseSize * 1.15;
  return baseSize;
};

/**
 * Responsive spacing scale
 */
export const SPACING = {
  xs: rs(4, 6, 8),
  sm: rs(8, 10, 12),
  md: rs(12, 16, 20),
  lg: rs(16, 20, 24),
  xl: rs(20, 24, 30),
  xxl: rs(24, 30, 40)
};

/**
 * Responsive border radius
 */
export const RADIUS = {
  sm: rs(8, 10, 12),
  md: rs(12, 15, 18),
  lg: rs(16, 20, 24),
  xl: rs(20, 24, 28),
  round: rs(100, 100, 100)
};

/**
 * Platform-specific shadow
 */
export const getShadow = (color, opacity = 0.3, radius = 8) => ({
  shadowColor: color,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: opacity,
  shadowRadius: radius,
  elevation: radius
});