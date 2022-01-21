export const showMode = (currentMode, setMode, setShow) => {
    setShow(true);
    setMode(currentMode);
};


export const showDatepicker = (setMode, setShow) => {
    showMode('date', setMode, setShow);
};

export const showTimepicker = (setMode, setShow) => {
    showMode('time', setMode, setShow);
};