import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


export default function ControllableStates(props) {
    const [value, setValue] = React.useState(props.options[0]);
    const [inputValue, setInputValue] = React.useState('');
    function sendBackData(value) {
        props.parentCallback(value);
    }

    return (
        <div>
            {/*<div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>*/}
            {/*<div>{`inputValue: '${inputValue}'`}</div>*/}
            {/*<br />*/}
            <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    sendBackData(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                getOptionLabel={props.optionLabel}
                id="controllable-states-demo"
                options={props.options}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label={props.label} variant="outlined" />}
            />
        </div>
    );
}