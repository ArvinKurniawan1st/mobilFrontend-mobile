// components/CameraView.js
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

import { getShadow, isSmallDevice, RADIUS, rfs, rs, SPACING } from "../utils/responsive";

export default function CameraView() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageKey, setImageKey] = useState(0);
  
  const CAMERA_URL = "http://192.168.100.138/stream";
  
  useEffect(() => {
    // Refresh image every 100ms for smooth video-like experience
    const interval = setInterval(() => {
      setImageKey(prev => prev + 1);
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  const handleImageLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <LinearGradient
      colors={['#1a2347', '#0f1729']}
      style={styles.card}
    >
      <View style={styles.header}>
        <View style={styles.iconBadge}>
          <Text style={styles.icon}>📷</Text>
        </View>
        <Text style={styles.title}>LIVE CAMERA</Text>
        <View style={[styles.liveDot, error && styles.liveDotError]} />
      </View>

      <View style={styles.cameraWrapper}>
        <View style={styles.cameraContainer}>
          {loading && (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="#00d4ff" />
              <Text style={styles.loadingText}>Connecting...</Text>
            </View>
          )}
          
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorIcon}>📷</Text>
              <Text style={styles.errorTitle}>Camera Offline</Text>
              <Text style={styles.errorText}>
                Cannot connect to ESP32-CAM
              </Text>
              <Text style={styles.errorSubtext}>
                Check: {'\n'}
                • ESP32-CAM is powered on{'\n'}
                • IP address is correct{'\n'}
                • Same WiFi network
              </Text>
            </View>
          )}
          
          {!error && (
            <Image
              key={imageKey}
              source={{ 
                uri: `${CAMERA_URL}?t=${imageKey}`,
                cache: 'reload'
              }}
              style={styles.cameraImage}
              onLoad={handleImageLoad}
              onError={handleImageError}
              resizeMode="cover"
            />
          )}
          
          {/* Corner Frames */}
          {!error && (
            <>
              <View style={styles.frameTopLeft} />
              <View style={styles.frameTopRight} />
              <View style={styles.frameBottomLeft} />
              <View style={styles.frameBottomRight} />
            </>
          )}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.2)',
    ...getShadow('#00d4ff', 0.3, 8)
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    gap: 8
  },
  iconBadge: {
    width: rs(32, 36, 40),
    height: rs(32, 36, 40),
    borderRadius: rs(16, 18, 20),
    backgroundColor: 'rgba(0, 212, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.3)'
  },
  icon: {
    fontSize: rs(16, 18, 20)
  },
  title: {
    flex: 1,
    fontSize: rfs(13),
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 1
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00ff88',
    shadowColor: '#00ff88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6
  },
  liveDotError: {
    backgroundColor: '#ff3838',
    shadowColor: '#ff3838'
  },
  cameraWrapper: {
    aspectRatio: isSmallDevice ? 4/3 : 16/9,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    backgroundColor: '#000'
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cameraImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000'
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    gap: 12,
    zIndex: 10
  },
  loadingText: {
    color: '#00d4ff',
    fontSize: rfs(12),
    fontWeight: '600'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0e27',
    padding: SPACING.lg,
    gap: 8
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 8,
    opacity: 0.5
  },
  errorTitle: {
    fontSize: rfs(16),
    fontWeight: '700',
    color: '#ff3838',
    marginBottom: 4
  },
  errorText: {
    fontSize: rfs(12),
    color: '#8a9bc4',
    textAlign: 'center'
  },
  errorSubtext: {
    fontSize: rfs(10),
    color: '#4a5a7a',
    textAlign: 'left',
    marginTop: 12,
    lineHeight: 18
  },
  frameTopLeft: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: rs(14, 16, 18),
    height: rs(14, 16, 18),
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#00d4ff'
  },
  frameTopRight: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: rs(14, 16, 18),
    height: rs(14, 16, 18),
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: '#00d4ff'
  },
  frameBottomLeft: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    width: rs(14, 16, 18),
    height: rs(14, 16, 18),
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#00d4ff'
  },
  frameBottomRight: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: rs(14, 16, 18),
    height: rs(14, 16, 18),
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: '#00d4ff'
  }
});