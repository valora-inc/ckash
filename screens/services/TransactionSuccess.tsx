import * as React from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native'

export default function TransactionSuccess() {
  const handleClose = () => {
    console.log('Close pressed')
  }

  const handleViewActivities = () => {
    console.log('View Activities pressed')
  }

  return (
    <View style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
        <Text style={styles.closeIcon}>✕</Text>
      </TouchableOpacity>

      {/* Success Animation Container */}
      <View style={styles.animationContainer}>
        {/* Outer Ring */}
        <View style={styles.outerRing}>
          {/* Decorative Dots */}
          <View style={[styles.dot, styles.dot1]} />
          <View style={[styles.dot, styles.dot2]} />
          <View style={[styles.dot, styles.dot3]} />
          <View style={[styles.dot, styles.dot4]} />
          <View style={[styles.dot, styles.dot5]} />
          <View style={[styles.dot, styles.dot6]} />
        </View>

        {/* Middle Ring */}
        <View style={styles.middleRing} />

        {/* Inner Ring */}
        <View style={styles.innerRing} />

        {/* Success Check Circle */}
        <View style={styles.successCircle}>
          <Text style={styles.checkMark}>✓</Text>
        </View>
      </View>

      {/* Success Text */}
      <View style={styles.textContainer}>
        <Text style={styles.mainText}>
          Your Transaction is{'\n'}
          <Text style={styles.successText}>Successful</Text>
        </Text>

        <TouchableOpacity
          style={styles.viewActivitiesButton}
          onPress={handleViewActivities}
        >
          <Text style={styles.viewActivitiesText}>View on Activities</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E9F3',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  closeIcon: {
    fontSize: 18,
    color: '#333',
    fontWeight: '400',
  },
  animationContainer: {
    width: 280,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
    position: 'relative',
  },
  outerRing: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 1,
    borderColor: '#C8E6C9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleRing: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 1,
    borderColor: '#A5D6A7',
    backgroundColor: 'rgba(200, 230, 201, 0.3)',
  },
  innerRing: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: '#81C784',
    backgroundColor: 'rgba(165, 214, 167, 0.3)',
  },
  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4A7C59',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  checkMark: {
    fontSize: 40,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  dot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#81C784',
  },
  dot1: {
    top: 20,
    left: '50%',
    marginLeft: -4,
  },
  dot2: {
    top: 60,
    right: 30,
  },
  dot3: {
    right: 20,
    top: '50%',
    marginTop: -4,
  },
  dot4: {
    bottom: 60,
    right: 30,
  },
  dot5: {
    bottom: 20,
    left: '50%',
    marginLeft: -4,
  },
  dot6: {
    left: 30,
    top: '50%',
    marginTop: -4,
  },
  textContainer: {
    alignItems: 'center',
  },
  mainText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 20,
  },
  successText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4A7C59',
  },
  viewActivitiesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  viewActivitiesText: {
    fontSize: 16,
    color: '#4A7C59',
    fontWeight: '500',
    marginRight: 8,
  },
  arrow: {
    fontSize: 16,
    color: '#4A7C59',
    fontWeight: '500',
  },
})
