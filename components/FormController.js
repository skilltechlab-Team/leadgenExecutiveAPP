import React from 'react';
import { Box, FormControl, Stack } from 'native-base';
const FormController = ({ children, isRequired = false, label, isCenter = 'center' }) => {
    return (
        <FormControl isRequired={isRequired} my={3} >
            <Stack w={'100%'}>
                <FormControl.Label mx={10} >{label}</FormControl.Label>
                <Box justifyContent={isCenter} alignItems={isCenter}>
                    {children}
                </Box>
            </Stack>
        </FormControl>
    );
}
export default FormController;