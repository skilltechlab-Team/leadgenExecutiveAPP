import React from 'react';
import { Box, FormControl, Spinner, Stack } from 'native-base';
const FormController = ({ children, isRequired = false, label, isCenter = 'center', isSpinnerVisible = false }) => {
    return (
        <FormControl isRequired={isRequired} my={3} >
            <Stack w={'100%'}>
                <Box flexDir={'row'} justifyContent={'flex-start'} alignItems={'center'}  >
                    <FormControl.Label mx={10} >{label}</FormControl.Label>
                    {
                        !isSpinnerVisible ? <></> : <Spinner size={'sm'} color="indigo.500" mt={-2} ml={-7} />
                    }
                </Box>
                <Box justifyContent={isCenter} alignItems={isCenter}>
                    {children}
                </Box>
            </Stack>
        </FormControl>
    );
}
export default FormController;