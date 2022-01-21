import React from 'react';
import { Button } from 'native-base';
const LoadingButton = ({ size = 'full' }) => {
    return (
        <Button isLoading
            size={size}
            mt={10}
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
    );
}
export default LoadingButton;