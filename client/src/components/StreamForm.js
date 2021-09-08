import { Button, makeStyles, TextField } from '@material-ui/core';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Alert from "@material-ui/lab/Alert";


const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
    streamName: {
        width: "600px",
        marginBottom: "10px"
    },
    streamDescription: {
        width: "600px",
        marginBottom: "10px"
    },
    cssLabel: {
        color: 'white',
    },

    alert: {
        margin: "10px 0 10px 0"
    }

}))

let StreamForm = (props) => {

    const classes = useStyles();

    const renderError = ({ error, touched }) => {
        if (touched && error) {
            return (
                <div className='ui error message'>
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    const StreamName = ({ label, input, meta }) => (
        <div className={`field ${meta.error && meta.touched ? 'error' : ''}`}  >
            <label>{label}</label>
            <TextField
                label="Stream Name"
                {...input}
                variant="outlined"
                className={classes.streamName}
            />
            {renderError(meta)}
        </div>
    )

    const StreamDescription = ({ label, input, meta }) => (
        <div className="input-row">
            <label>{label}</label>
            <TextField id="outlined-basic" label="Stream Description"  {...input} variant="outlined" className={classes.streamDescription} />
            {renderError(meta)}
        </div>
    )

    const onSubmit = (formValues) => {
        props.onSubmit(formValues)
    }



    return (
        <form onSubmit={props.handleSubmit(onSubmit)} className={classes.root}>
            <div style={{ alignItems: "left" }}>
                <Field name="streamName" component={StreamName} type="text" />
                <Field name="streamDescription" component={StreamDescription} type="text" />
                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </div>
        </form>
    )
}

const validate = formValues => {
    const errors = {};

    if (!formValues.streamName) {
        errors.streamName = <Alert variant="filled" severity="error" style={{ margin: "10px 0 10px 0" }} >
            You have to enter Stream Title
        </Alert>
    }
    if (!formValues.streamDescription) {
        errors.streamDescription = <Alert variant="filled" severity="error" style={{ margin: "10px 0 10px 0" }} >
            You have to enter Stream Description
        </Alert>
    }
    return errors;
}

export default reduxForm({
    form: 'streamForm',
    validate: validate
})(StreamForm);