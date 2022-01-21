import React, { useRef } from 'react';
import { CheckIcon, Icon, Input, Select, VStack } from 'native-base';
import { MaterialIcons, FontAwesome } from "@expo/vector-icons"
import { useState } from 'react';
import FormController from './FormController';
import country_codes from '../constants/country_codes'
import DateTimePicker from '@react-native-community/datetimepicker';
// import DismissKeyboard from './DismissKeyboard';
import date_time from 'date-and-time';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
const CreateLead = ({ leadSetter }) => {
    const [lead, setLead, vendorList, examListDetails, calculateNetProfit] = leadSetter;
    const countryDetails = useRef(country_codes())
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const pattern = date_time.compile('ddd, MMM DD YYYY');
    const pattern2 = date_time.compile('hh : mm A');

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
            setLead((lead) => ({ ...lead, proposedDate: date_time.format(currentDate, pattern) }))
            setLead((lead) => ({ ...lead, proposedTime: date_time.format(currentDate, pattern2) }))
        }
    };



    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    return (
        <>
            <FormController isRequired={true} label="Lead Name" >
                <Input
                    w={{
                        base: "80%",
                        md: "25%",
                    }}
                    InputLeftElement={
                        <Icon
                            as={<MaterialIcons name="person-add" />}
                            size={5}
                            ml="2"
                            color="muted.400"
                        />
                    }
                    placeholder="Lead Name"
                    borderColor={'muted.600'}
                    onChangeText={(val) => {
                        setLead({ ...lead, name: val })
                    }}
                    onBlur={() => {
                        setLead({ ...lead, name: lead.name.trim() })
                    }}
                    value={lead.name}
                />
            </FormController>
            <FormController isRequired={false} label="Lead Email" >
                <Input

                    w={{
                        base: "80%",
                        md: "25%",
                    }}
                    InputLeftElement={
                        <Icon
                            as={<MaterialIcons name="email" />}
                            size={5}
                            ml="2"
                            color="muted.400"
                        />
                    }
                    placeholder="Lead Email"
                    borderColor={'muted.600'}
                    onChangeText={(val) => {
                        setLead({ ...lead, email: val })
                    }}
                    onBlur={() => {
                        setLead({ ...lead, email: lead.email.trim().toLowerCase() })
                    }}
                    value={lead.email}
                />
            </FormController>
            <FormController isRequired={false} label="Country Code" >
                <VStack alignItems="center" space={4} w={"80%"} >
                    <Select
                        minWidth="58%"
                        _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />,
                        }}
                        mt={1}
                        placeholder="--Select Country--"
                        borderColor={'muted.600'}
                        onValueChange={(itemValue) => {
                            setLead({ ...lead, country_code: itemValue })
                        }}
                        selectedValue={lead.country_code}

                    >
                        {
                            countryDetails.current.map((country_code, index) => {
                                const code = country_code.code;
                                const name = country_code.name;
                                return (<Select.Item label={code + " - " + name} value={code} key={index.toString()} />)
                            })
                        }

                    </Select>
                </VStack>
            </FormController>
            <FormController isRequired={true} label="Lead Phone Number" >
                <Input

                    w={{
                        base: "80%",
                        md: "25%",
                    }}
                    InputLeftElement={
                        <Icon
                            as={<MaterialIcons name="phone-android" />}
                            size={5}
                            ml="2"
                            color="muted.400"
                        />
                    }
                    keyboardType='decimal-pad'
                    placeholder="Lead Phone Number"
                    borderColor={'muted.600'}
                    onChangeText={(val) => {
                        setLead({ ...lead, phone: val })
                    }}
                    onBlur={() => {
                        setLead({ ...lead, phone: lead.phone.trim() })
                    }}
                    value={lead.phone}
                />
            </FormController>


            {
                vendorList.length > 0 ?
                    <FormController isRequired={true} label="Select Vendor" >
                        <VStack alignItems="center" space={4} w={"80%"} >
                            <Select
                                minWidth="58%"
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="5" />,
                                }}
                                mt={1}
                                placeholder="--Select Vendor--"
                                borderColor={'muted.600'}
                                onValueChange={(itemValue) => {
                                    setLead({ ...lead, vendor_id: itemValue })
                                }}
                                selectedValue={lead.vendor_id}

                            >
                                <Select.Item label={"Self"} value={"Self"} />
                                {
                                    vendorList.map((vendor, index) => {
                                        return (<Select.Item label={vendor.vendor_Name} value={vendor.id} key={vendor.id + Math.random(3000).toString() + index.toString()} />)
                                    })
                                }

                            </Select>
                        </VStack>
                    </FormController>
                    : <></>
            }


            {
                examListDetails.length > 0 ?
                    <FormController isRequired={true} label="Select Exam" >
                        <VStack alignItems="center" space={4} w={"80%"} >
                            <Select
                                minWidth="58%"
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="5" />,
                                }}
                                mt={1}
                                placeholder="--Select Exam--"
                                borderColor={'muted.600'}
                                onValueChange={(itemValue) => {
                                    setLead({ ...lead, exam_id: itemValue })
                                }}
                                selectedValue={lead.exam_id}

                            >
                                {
                                    examListDetails.map((exam, index) => {
                                        return (<Select.Item label={exam.exam_name + ' - ' + exam.exam_code} value={exam.id} key={exam.id + Math.random(4000).toString() + index.toString()} />)
                                    })
                                }

                            </Select>
                        </VStack>
                    </FormController>
                    : <></>
            }


            <FormController isRequired={true} label="Exam Status" >
                <VStack alignItems="center" space={4} w={"80%"} >
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
                            setLead({ ...lead, exam_status: itemValue })
                        }}
                        selectedValue={lead.exam_status}

                    >
                        <Select.Item label={"Booked"} value={'booked'} />
                        <Select.Item label={"Complete"} value={'complete'} />
                        <Select.Item label={"Reschedule"} value={'reschedule'} />

                    </Select>
                </VStack>
            </FormController>
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

            {
                lead.exam_status === "booked" ||
                    lead.exam_status === "reschedule" ?
                    <FormController isRequired={true} label="Select Exam Date" >
                        <DismissKeyboard>
                            <Input
                                w={{
                                    base: "80%",
                                    md: "25%",
                                }}

                                onPressIn={showDatepicker}

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
                                value={lead.proposedDate}
                            />
                        </DismissKeyboard>
                    </FormController> : <></>
            }


            {
                lead.exam_status === "booked" ||
                    lead.exam_status === "reschedule" ?
                    <FormController isRequired={true} label="Select Exam Time" >

                        <DismissKeyboard>
                            <Input
                                w={{
                                    base: "80%",
                                    md: "25%",
                                }}

                                onPressIn={showTimepicker}

                                InputLeftElement={
                                    <Icon
                                        as={<MaterialIcons name="timer" />}
                                        size={5}
                                        ml="2"
                                        color="muted.400"
                                    />
                                }
                                placeholder="HH : MM"
                                borderColor={'muted.600'}
                                value={lead.proposedTime}
                            />
                        </DismissKeyboard>
                    </FormController> : <></>
            }

            <FormController isRequired={true} label="Payment Status" >
                <VStack alignItems="center" space={4} w={"80%"} >
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
                            setLead({ ...lead, payment_status: itemValue })
                        }}
                        selectedValue={lead.payment_status}

                    >
                        <Select.Item label={"Recieved"} value={'Recieved'} />
                        <Select.Item label={"Pending"} value={'Pending'} />

                    </Select>
                </VStack>
            </FormController>
            {
                lead.payment_status === 'Recieved' ?
                    <FormController isRequired={true} label="Confirmation Number" >
                        <Input

                            w={{
                                base: "80%",
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
                                setLead({ ...lead, confirmation_number: val })
                            }}
                            onBlur={() => {
                                setLead({ ...lead, confirmation_number: lead.confirmation_number.trim() })
                            }}
                            value={lead.confirmation_number}
                        />
                    </FormController>
                    : <></>
            }
            <FormController isRequired={true} label="Total Course Fees" >
                <Input

                    w={{
                        base: "80%",
                        md: "25%",
                    }}
                    InputLeftElement={
                        <Icon
                            as={<FontAwesome name="rupee" />}
                            size={5}
                            ml="2"
                            color="muted.400"
                        />
                    }
                    keyboardType='decimal-pad'
                    placeholder="Total Course Fees"
                    borderColor={'muted.600'}
                    onChangeText={(val) => {
                        setLead({ ...lead, total_course_fee: val })
                        calculateNetProfit(lead.total_course_fee, lead.trainer_charges)
                    }}
                    onBlur={() => {
                        setLead({ ...lead, total_course_fee: lead.total_course_fee.trim() })
                        calculateNetProfit(lead.total_course_fee, lead.trainer_charges)
                    }}
                    value={lead.total_course_fee}
                />
            </FormController>
            <FormController isRequired={true} label="Trainer Charges" >
                <Input

                    w={{
                        base: "80%",
                        md: "25%",
                    }}
                    InputLeftElement={
                        <Icon
                            as={<FontAwesome name="rupee" />}
                            size={5}
                            ml="2"
                            color="muted.400"
                        />
                    }
                    keyboardType='decimal-pad'
                    placeholder="Trainer Charges"
                    borderColor={'muted.600'}
                    onChangeText={(val) => {
                        setLead({ ...lead, trainer_charges: val })
                        calculateNetProfit(lead.total_course_fee, lead.trainer_charges)
                    }}
                    onBlur={() => {
                        setLead({ ...lead, trainer_charges: lead.trainer_charges.trim() })
                        calculateNetProfit(lead.total_course_fee, lead.trainer_charges)
                    }}
                    value={lead.trainer_charges}
                />
            </FormController>

            <FormController isRequired={true} label="Payment" >
                <Input

                    w={{
                        base: "80%",
                        md: "25%",
                    }}
                    InputLeftElement={
                        <Icon
                            as={<FontAwesome name="rupee" />}
                            size={5}
                            ml="2"
                            color="muted.400"
                        />
                    }
                    keyboardType='decimal-pad'
                    placeholder="Payment"
                    borderColor={'muted.600'}
                    value={lead.payment}
                    onChangeText={(val) => {
                        setLead({ ...lead, payment: val })
                    }}
                    onBlur={() => {
                        setLead({ ...lead, payment: lead.payment.trim() })
                    }}
                />
            </FormController>

            <FormController isRequired={true} label="Net Profit" >
                <Input

                    w={{
                        base: "80%",
                        md: "25%",
                    }}
                    InputLeftElement={
                        <Icon
                            as={<MaterialIcons name="money" />}
                            size={5}
                            ml="2"
                            color="muted.400"
                        />
                    }
                    keyboardType='decimal-pad'
                    placeholder="Net Profit"
                    borderColor={'muted.600'}
                    isDisabled={true}
                    value={'₹' + lead.net_profit}
                />
            </FormController>

        </>
    );
}
export default CreateLead;
