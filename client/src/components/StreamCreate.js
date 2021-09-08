import { Typography } from '@material-ui/core';
import { connect } from 'react-redux'
import { createStream } from '../actions'
import StreamForm from './StreamForm';

const StreamCreate = ({ createStream }) => {

    const onSubmit = formValues => {
        createStream(formValues)
    }

    return (
        <div >
            <Typography variant="button" component="h2" style={{ textAlign: "center", margin: "20px 0 20px 0", fontSize: "30px" }}>
                Create a stream
            </Typography>
            <StreamForm onSubmit={onSubmit} />
        </div >
    );
}

export default connect(null, { createStream })(StreamCreate);