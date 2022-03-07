import { Alert, Text, StyleSheet, Pressable, PermissionsAndroid, ImageBackground, Platform } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Voximplant } from 'react-native-voximplant';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CallAction from '../components/CallAction';

const permissions = [
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    PermissionsAndroid.PERMISSIONS.CAMERA
]


const CallingScreen = ({ navigation, route }) => {

    // Android Permissions for Camera and Audio
    const [permissionsGranted, setPermissionsGranted] = useState(false);

    // voxinplant Instance
    const voximplant = Voximplant.getInstance();

    // call Status 
    const [callStatus, setCallStatus] = useState('Calling..')

    // local video stream Id
    const [localVideoStream, setLocalVideoStream] = useState({ islocalVideoStreamIdSet: false, localVideoStreamId: '' })

    // remote video stream Id
    const [remoteVideoStream, setRemoteVideoStream] = useState({ isremoteVideoStreamSet: false, remoteVideoStreamId: '' })

    // This is coming from incoming call screen
    const routeObject = route.params;

    // Get call referece if coming from Incoming Call Component
    var call = useRef(routeObject ? routeObject.userCall : undefined)

    // Intial Endpoint Values
    const endpoint = useRef(null);

    useEffect(() => {
        // Requesting for Camera and Audio
        const requestPermissions = async () => {
            const granted = await PermissionsAndroid.requestMultiple(permissions);
            const recordAudioGranted = granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === 'granted';
            const cameraGranted = granted[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted';
            !cameraGranted || !recordAudioGranted ? Alert.alert("Permissions not granted") : setPermissionsGranted(true)
        }
        Platform.OS === 'android' ? requestPermissions() : null
    }, [])

    // Below UseEffect Is Most Important......
    useEffect(() => {
        if (!permissionsGranted) { return; }

        const callSettings = {
            video: {
                sendVideo: true,
                receiveVideo: true,
            },
        };

        // Making Call
        const makeCall = async () => {
            // calling user
            call.current = await voximplant.call(routeObject.user, callSettings);
            // Events related to Make Call
            subscribeToCallEvents()
            // Note :- we don't have any call reference since we are making call so endpoint.current won't be performed unlike below answer call.
        }

        // Answer call
        const answerCall = async () => {
            // Events realted to Answer Call
            subscribeToCallEvents()
            // In Case of answer we already have an call reference with remoteStreamId from incoming call component i.e, call from xyz user
            endpoint.current = call.current.getEndpoints()[0];
            // Again calling subscribetoencpointevents , this time it will add remoteStreamId to state.
            subscribeToEndpointEvents()
            call.current.answer(callSettings)
        }

        // Events on Call
        const subscribeToCallEvents = async () => {
            // In case call failed                                            # It will be called last , in case call fails due to any reason.
            call.current.on(Voximplant.CallEvents.Failed, callEvent => showError(callEvent.reason));

            // call in progress                                               # It will be called third while call in progress.
            call.current.on(Voximplant.CallEvents.ProgressToneStart, callevent => setCallStatus('Calling..'));

            // call connected                                                 # It will be called at last if call succeed
            call.current.on(Voximplant.CallEvents.Connected, callevent => setCallStatus('Connected..'));

            // call disconnected                                              # It will be called if user declines
            call.current.on(Voximplant.CallEvents.Disconnected, callevent => navigation.navigate('Home'));

            // local stream i.e, adding own camera                            # It will be called second and endpoints have been added , it will connect to our camera.
            call.current.on(Voximplant.CallEvents.LocalVideoStreamAdded, callevent => {
                setLocalVideoStream(
                    {
                        ...localVideoStream, localVideoStreamId: callevent.videoStream.id,
                        islocalVideoStreamIdSet: true
                    }
                )
            });

            // it automatically runs firstly and contains many endpoints      # It will be called first
            call.current.on(Voximplant.CallEvents.EndpointAdded, callEvent => {
                endpoint.current = callEvent.endpoint
                subscribeToEndpointEvents()
            });

        }

        // Events related to endpoint
        const subscribeToEndpointEvents = async () => {
            // If user accepted call    # it will add remoteStreamId , it gets its reference from answer call
            endpoint.current.on(Voximplant.EndpointEvents.RemoteVideoStreamAdded, endpointEvent => {
                setRemoteVideoStream(
                    {
                        ...remoteVideoStream, remoteVideoStreamId: endpointEvent.videoStream.id,
                        isremoteVideoStreamSet: true
                    }
                )
            });
        }

        // Cheking for making call or answer call
        routeObject && routeObject.isIncomingCall === true ? answerCall() : makeCall()

        // unSubscribing or Cleaning Events 
        return () => {
            call.current.off(Voximplant.CallEvents.Failed);
            call.current.off(Voximplant.CallEvents.ProgressToneStart);
            call.current.off(Voximplant.CallEvents.Connected);
            call.current.off(Voximplant.CallEvents.Disconnected);
            call.current.off(Voximplant.CallEvents.LocalVideoStreamAdded);
            call.current.off(Voximplant.CallEvents.EndpointAdded);
            endpoint.current.off(Voximplant.EndpointEvents.RemoteVideoStreamAdded);
        }

    }, [permissionsGranted])


    // This Section Will have All the utility functios i.e, switching camera , audio realted thing call disconnect and other alerts .....
    const showError = async (reason) => {
        Alert.alert(
            "Called Failed !",
            `${reason} , please try again`,
            [
                { text: "OK", onPress: () => navigation.navigate('Home') }
            ]
        );
    }

    // HangUp Call Function
    const HangupCall = async () => {
        try {
            call.current.hangup()
            navigation.navigate('Home')
        }
        catch (error) {
            console.log(error)
        }
    }

    // Switch Camera Function
    const CameraSwitch = async (type) => {
        try {
            Voximplant.Hardware.CameraManager.getInstance().switchCamera(type)
        }
        catch (error) {
            console.log(error)
        }
    }

    // SendAudio Function
    const SendAudio = (bool) => {
        try {
            call.current.sendAudio(bool)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <ImageBackground
            source={require('../assets/login.jpg')}
            style={styles.container}
            resizeMode="cover"
            blurRadius={10}
        >

            <Pressable onPress={() => console.log("Back TO Home")} style={styles.backButton}>
                <Ionicons name="chevron-back" color="white" size={25} />
            </Pressable>


            {/* Camera Will Start from Top of Page */}
            <Pressable style={styles.cameraPreview} onPress={() => {
                console.log("Coming")
                console.log(call.current)
            }}>
                <Text style={styles.name}>{callStatus}</Text>
                {/* <Text style={styles.phoneNumber}>{`${callStatus}`}</Text> */}
            </Pressable>

            <Voximplant.VideoView
                videoStreamId={localVideoStream.localVideoStreamId}
                style={!remoteVideoStream.isremoteVideoStreamSet ? styles.localVideoBefore : styles.localVideoAfter}
            />

            {
                remoteVideoStream.isremoteVideoStreamSet ?
                    <Voximplant.VideoView
                        videoStreamId={remoteVideoStream.remoteVideoStreamId}
                        style={styles.remoteVideo}
                    />
                    :
                    (<></>)
            }

            <CallAction
                onHangupCall={HangupCall}
                onCameraSwitch={CameraSwitch}
                onSendAudio={SendAudio}
            />
        </ImageBackground>
    );
};





// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#201F1F'
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 10,
        zIndex: 999
    },
    cameraPreview: {
        position: 'absolute',
        alignSelf: 'center',
        alignItems: 'center'
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        fontStyle: 'normal',
        color: 'white',
        marginTop: 50,
        marginBottom: 3,
        fontFamily: 'monospace'
    },
    phoneNumber: {
        fontSize: 18,
        color: 'white',
    },
    localVideoBefore: {
        flex: 1,
        marginTop: 100
    },
    localVideoAfter: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: -10,
        top: 0
    },
    remoteVideo: {
        flex: 1,
        marginTop: 100
    }
});

export default CallingScreen;