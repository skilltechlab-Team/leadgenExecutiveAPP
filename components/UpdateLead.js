import React from 'react';
import {
    Button,
    Modal,
    VStack,
    Select,
    CheckIcon,
    FormControl
} from 'native-base';
import FormController from './FormController';
import LoadingButton from './LoadingButton';
const UpdateLead = ({ modalFN, details, userState, updateFN, uploadFn }) => {
    const [showModal, setShowModal] = modalFN;
    const [userExamDetails, userPaymentDetails] = details
    const [setExamDetails, setPaymentDetails] = userState;
    const [isUploading, setIsUploading] = uploadFn;
    return (
        <>
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
                                    selectedValue={userExamDetails.status}

                                >
                                    <Select.Item label={"Booked"} value={'booked'} />
                                    <Select.Item label={"Complete"} value={'complete'} />

                                </Select>
                            </VStack>
                        </FormControl>
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
                                    selectedValue={userPaymentDetails.status}

                                >
                                    <Select.Item label={"Recieved"} value={'Recieved'} />
                                    <Select.Item label={"Pending"} value={'Pending'} />
                                    <Select.Item label={"Due"} value={'Due'} />

                                </Select>
                            </VStack>
                        </FormControl>
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