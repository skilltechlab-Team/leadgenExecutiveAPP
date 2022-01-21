import React from 'react';
import { Button } from 'native-base';
const SubmitButton = ({ btnText, onSubmit, size = 'full' }) => {
    return (
        <Button size={size} mt={10} colorScheme='rose' onPress={onSubmit} >{btnText}</Button>
    );
}
export default SubmitButton;