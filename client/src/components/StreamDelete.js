import React, { useEffect } from 'react'
import Modal from './Modal'
import history from '../history'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchStream, deleteStream } from '../actions'
import { useParams } from 'react-router-dom'
import { Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';

const StreamDelete = ({ fetchStream, deleteStream, stream }) => {
    const { id } = useParams()

    useEffect(() => {
        fetchStream(id)
        // eslint-disable-next-line
    }, [])

    const onCancel = () => history.push('/')

    const renderContent = !stream
        ? 'Are you sure you want to delete this stream'
        : `Are you sure you want to delete this stream with title: ${stream.streamName} ?`

    const renderActionButtons = (
        <>
            <Button
                onClick={() => deleteStream(id)}
                variant="outlined"
                color="secondary"
                startIcon={<DeleteIcon />}
            >
                Delete
            </Button>
            <Link to={'/'} onClick={() => onCancel()} style={{ textDecoration: "none" }} >
                <Button variant="contained" color="primary" style={{ margin: "10px 10px" }}>
                    Cancel
                </Button>
            </Link>
        </>
    )

    return (
        <Modal
            title="Delete Stream"
            content={renderContent}
            actionButtons={renderActionButtons}
            onCancel={onCancel}
        />
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}
export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete)

/*
reat fragment is an invisible element that doesnt have any impact on the DOM
-this saves us from having to introduce a new div that changes button styling(
    the buttons were right against the edge of the modal
)
*/
