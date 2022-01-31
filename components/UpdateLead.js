import React from 'react';
import {
    Button,
    Modal,
    VStack,
    Select,
    CheckIcon,
    FormControl,
    Input,
    Icon,
    Text,
    Pressable
} from 'native-base';
import { MaterialIcons, FontAwesome } from "@expo/vector-icons"
import DateTimePicker from '@react-native-community/datetimepicker';
import date_time from 'date-and-time';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
const UpdateLead = ({ modalFN, details, userState, updateFN, uploadFn, leadMaster }) => {
    const [showModal, setShowModal] = modalFN;
    const [examDetails, paymentDetails] = details
    const [setExamDetails, setPaymentDetails] = userState;
    const [isUploading, setIsUploading] = uploadFn;
    const pattern = date_time.compile('ddd, MMM DD YYYY');
    const pattern2 = date_time.compile('hh : mm A');
    const [date, setDate] = React.useState(new Date());
    const [mode, setMode] = React.useState('date');
    const [show, setShow] = React.useState(false);
    const [leadSetter, setLeadSetter] = leadMaster
    const DismissKeyboard = ({ children }) => (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    );

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const onChange = (event, selectedDate) => {
        if (event.type !== "dismissed") {
            const currentDate = selectedDate || date;
            setShow(Platform.OS === 'ios');
            setDate(currentDate);
            setExamDetails((exam) => ({ ...exam, proposedDate: date_time.format(currentDate, pattern) }))
            setExamDetails((exam) => ({ ...exam, proposedTime: date_time.format(currentDate, pattern2) }))
            setLeadSetter((lead) => ({ ...lead, proposedDate: date_time.format(currentDate, pattern), proposedTime: date_time.format(currentDate, pattern2) }))

        } else setShow(!true);
    };

    const updateExamState = () => {
        setExamDetails((exam) => ({ ...exam, proposedDate: "" }))
        setExamDetails((exam) => ({ ...exam, proposedTime: "" }))
        setLeadSetter((lead) => ({ ...lead, proposedDate: "", proposedTime: "" }))
    }

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={false}
                    display="default"
                    onChange={onChange}

                />
            )}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Update Lead Status</Modal.Header>
                    <Modal.Body>
                        <FormControl my={3}>
                            <FormControl.Label>Exam Status</FormControl.Label>
                            <VStack alignItems="center" space={4} w={"100%"} >
                                <Select
                                    minWidth="58%"
                                    _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size="5" />,
                                    }}
                                    mt={1}
                                    placeholder="--Select Exam Status--"
                                    borderColor={'muted.600'}
                                    onValueChange={(itemValue) => {
                                        setExamDetails(exam => ({ ...exam, status: itemValue }))

                                    }}
                                    selectedValue={examDetails.status}

                                >
                                    <Select.Item label={"Booked"} value={'booked'} />
                                    <Select.Item label={"Complete"} value={'complete'} />
                                    <Select.Item label={"Reschedule"} value={'reschedule'} />
                                </Select>
                            </VStack>
                        </FormControl>
                        {
                            examDetails.status === "booked" ||
                                examDetails.status === "reschedule" ?
                                <FormControl my={3} isRequired >
                                    <FormControl.Label>Select Date</FormControl.Label>
                                    <Pressable onPress={showDatepicker} >
                                        <Input
                                            w={{
                                                base: "100%",
                                                md: "25%",
                                            }}
                                            isDisabled={true}
                                            InputLeftElement={
                                                <Icon
                                                    as={<MaterialIcons name="calendar-today" />}
                                                    size={5}
                                                    ml="2"
                                                    color="muted.400"
                                                />
                                            }
                                            placeholder="DD/MM/YYYY"
                                            borderColor={'muted.600'}
                                            value={date_time.format(new Date(examDetails.proposedDate), pattern)}

                                        />
                                    </Pressable>
                                </FormControl> : <></>
                        }
                        {
                            examDetails.status === "booked" ||
                                examDetails.status === "reschedule" ?
                                <FormControl my={3} isRequired  >
                                    <FormControl.Label>Select Date</FormControl.Label>
                                    <Pressable onPress={showTimepicker}>
                                        <Input
                                            w={{
                                                base: "100%",
                                                md: "25%",
                                            }}
                                            isDisabled={true}
                                            InputLeftElement={
                                                <Icon
                                                    as={<MaterialIcons name="calendar-today" />}
                                                    size={5}
                                                    ml="2"
                                                    color="muted.400"
                                                />
                                            }
                                            placeholder="HH : MM"
                                            borderColor={'muted.600'}
                                            value={examDetails.proposedTime}
                                        />
                                    </Pressable>
                                </FormControl> : <></>
                        }
                        <FormControl >
                            <FormControl.Label>Payment Status</FormControl.Label>
                            <VStack alignItems="center" space={4} w={"100%"} >
                                <Select
                                    minWidth="58%"
                                    _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size="5" />,
                                    }}
                                    mt={1}
                                    placeholder="--Select Payment Status--"
                                    borderColor={'muted.600'}
                                    onValueChange={(itemValue) => {
                                        setPaymentDetails(payment => ({ ...payment, status: itemValue }))
                                    }}
                                    selectedValue={paymentDetails.status}

                                >
                                    <Select.Item label={"Recieved"} value={'Recieved'} />
                                    <Select.Item label={"Pending"} value={'Pending'} />
                                </Select>
                            </VStack>
                        </FormControl>
                        {
                            paymentDetails.status === 'Recieved' ?
                                <FormControl isRequired={true} my={3} >
                                    <FormControl.Label>Confirmation Number</FormControl.Label>
                                    <Input

                                        w={{
                                            base: "100%",
                                            md: "25%",
                                        }}
                                        InputLeftElement={
                                            <Icon
                                                as={<FontAwesome name="file" />}
                                                size={5}
                                                ml="2"
                                                color="muted.400"
                                            />
                                        }
                                        placeholder="Enter Confirmation Number"
                                        borderColor={'muted.600'}
                                        onChangeText={(val) => {
                                            setPaymentDetails(payment => ({ ...payment, confirmation_number: val }))
                                            setLeadSetter(lead => ({ ...lead, confirmation_number: val }))
                                        }}
                                        onBlur={() => {
                                            if (paymentDetails.confirmation_number !== null)
                                                setPaymentDetails(payment => ({ ...payment, confirmation_number: payment.confirmation_number.trim() }))
                                            setLeadSetter(lead => ({ ...lead, confirmation_number: lead.confirmation_number.trim() }))
                                        }}
                                        value={paymentDetails.confirmation_number}
                                    />
                                </FormControl>
                                : <></>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button
                                variant="ghost"
                                colorScheme="blueGray"
                                onPress={() => {
                                    setShowModal(false)
                                }}
                            >
                                Cancel
                            </Button>
                            {
                                !isUploading ? <Button
                                    onPress={updateFN}
                                >
                                    Save
                                </Button> : <Button isLoading
                                    _loading={{
                                        bg: "muted.700",
                                        _text: {
                                            color: "muted.50",
                                        },
                                    }}
                                    _spinner={{
                                        color: "white",
                                    }}
                                    isLoadingText="Please Wait"
                                >
                                    Please Wait
                                </Button>
                            }
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </>
    );
}
export default UpdateLead;