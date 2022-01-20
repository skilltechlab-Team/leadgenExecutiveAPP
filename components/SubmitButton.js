import React from 'react';
import { Button } from 'native-base';
const SubmitButton = ({ btnText, onSubmit }) => {
    return (
        <Button size={'full'} mt={10} colorScheme='rose' onPress={onSubmit} >{btnText}</Button>
    );
}
export default SubmitButton;