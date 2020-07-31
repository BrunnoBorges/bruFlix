import React from "react";
import PropTypes from 'prop-types';

function FormField({ label, type, name, formValues, onChange }) {
    const fieldId = `id_${name}`

    return(
        <div>
            <label 
                htmlFor={fieldId}
            >
            {label} : 
            <input
                id={fieldId}
                type={type}
                value={formValues}
                name={name}
                onChange={onChange}
            />
            </label>
        </div>
    )

}

FormField.defaultProps = {
    type: 'text'
}

FormField.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    name: PropTypes.string.isRequired , 
    formValues: PropTypes.string.isRequired , 
    onChange: PropTypes.string.isRequired 
}

export default FormField;