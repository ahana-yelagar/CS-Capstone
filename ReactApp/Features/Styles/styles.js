// styles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Background image for HomeScreen

  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#003366',  // Drake Blue
  },

  // General container
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1, 
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  gradient: {
  flex: 1, 
},

  formContainer: {
  padding: 20,
  },

  // Welcome card at the top
  gradient: {
    flex: 1,
  },

  formContainer: {
    padding: 20,
  },

  loginBox: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 25,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },

  loginButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },

  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Welcome card styling
  welcomeCard: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginTop: -100,
    marginBottom: 20,
    marginTop: -100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },

  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003366',
    textAlign: 'center',
    color: '#003366',
  },

  tagline: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  // Emergency Call Button
  callButton: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
    
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Navigation Bar

  navBar: {
    width: '100%',
    height: 60,
    backgroundColor: '#003366',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  navButton: {
    padding: 10,
  },

  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // ReportScreen styles
  scrollView: {
    flex: 1,
    padding: 20,
    paddingRight: 0,
  },

  label: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 5,
  },


  scrollView: {
    flex: 1,
    padding: 20,
    paddingRight: 0,
  },

  label: {
    fontSize: 16,
    color: '#fff',
    alignSelf: 'flex-start',
    marginTop: 10,
    marginBottom: 5,
  },

  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  subtitle: {
    fontSize: 16,
    color: '#fac919',
    marginBottom: 30,
    textAlign: 'center',
  },

input: {
  width: '100%',
  backgroundColor: '#fff',
  borderRadius: 8,
  paddingVertical: 14,
  paddingHorizontal: 16,
  marginBottom: 15,
  fontSize: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2,
},


subtitle: {
  fontSize: 16,
  color: '#fac919',
  marginBottom: 30,
  textAlign: 'center',
},


  picker: {
    width: '100%',
    backgroundColor: '#fff',
    color: '#000',
    marginBottom: 15,
  },

  selectedText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },


  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Timer styles
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    marginTop: 70,
    color: '#fac919',
    textAlign: 'center',
  },


  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF5733',
    textAlign: 'center',
    marginTop: 20,
  },

  pickerWrapper: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    justifyContent: 'center',
  },

  pickerIcon: {
    position: 'absolute',
    right: 10,
    top: 18,
    pointerEvents: 'none',
    zIndex: 1,
  },

  pickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },

  wheelPicker: {
    width: 150,
    height: 150,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },

  wheelPickerText: {
    color: '#003366',
    fontSize: 20,
    fontWeight: '500',
  },

  selectedIndicator: {
    borderColor: '#fac919',
    borderWidth: 2,
  },

  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },

  formSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },

  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },

  locationText: {
    flex: 1,
    color: '#fff',
  },

  refreshButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 18,
  },

  refreshButtonText: {
    fontSize: 18,
  },

  timePickerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },

  timePickerText: {
    color: '#fff',
    fontSize: 16,
  },

  notesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    textAlignVertical: 'top',
    marginBottom: 24,
    height: 100,
  },

  requestButton: {
    backgroundColor: '#fac919',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalContent: {
    backgroundColor: '#003366',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },

  modalDetails: {
    marginBottom: 20,
  },

  modalLabel: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 8,
  },

  modalText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },

  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cancelModalButton: {
    flex: 1,
    backgroundColor: '#666',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginRight: 8,
  },

  confirmButton: {
    flex: 1,
    backgroundColor: '#fac919',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginLeft: 8,
  },

  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },

  statusContainer: {
    flex: 1,
    padding: 20,
  },

  statusTracker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 24,
    position: 'relative',
    paddingHorizontal: 10,
  },

  statusStepContainer: {
    alignItems: 'center',
    width: 60,
  },

  statusCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    zIndex: 2,
  },

  activeStatusCircle: {
    backgroundColor: '#fac919',
  },

  statusCircleText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  statusText: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'center',
  },

  activeStatusText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  statusLine: {
    position: 'absolute',
    top: 18,
    left: 40,
    right: -40,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    zIndex: 1,
  },

  activeStatusLine: {
    backgroundColor: '#fac919',
  },

  statusMessageBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#fac919',
  },

  statusMessage: {
    color: '#fff',
    fontSize: 16,
  },

  requestDetails: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },

  detailLabel: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 2,
  },

  detailText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 12,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cancelButton: {
    flex: 1,
    backgroundColor: '#E74C3C',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginRight: 8,
  },

  completeButton: {
    flex: 1,
    backgroundColor: '#2ECC71',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginLeft: 8,
  },

  chaperoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7CA18',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  chaperoneButtonIcon: {
    fontSize: 24,
    marginRight: 12,
  },

  chaperoneButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },

  featureButtonsContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  marginTop: 30, // Add spacing
},

featureButton: {
  width: 100, // Square button
  height: 100,
  backgroundColor: '#003366',
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
  margin: 10, // Add spacing between buttons
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  elevation: 3,
},

featureButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center',
},

});

