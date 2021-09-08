import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { fetchStream, editStream } from '../actions'
import StreamForm from './StreamForm'
import { useParams } from 'react-router-dom'
import { Typography } from '@material-ui/core'

const StreamEdit = ({ fetchStream, editStream, stream }) => {

    const { id } = useParams()

    useEffect(() => {
        fetchStream(id)
        // eslint-disable-next-line
    }, [])

    const onSubmit = (formValues) => {
        editStream(id, formValues)
    }

    return (
        <div>
            {!stream ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <Typography variant="button" component="h2" style={{ textAlign: "center", margin: "20px 0 20px 0", fontSize: "30px" }} >
                        Edit a Stream
                    </Typography>
                    <StreamForm
                        initialValues={_.pick(stream, 'streamName', 'streamDescription')}
                        onSubmit={onSubmit}
                    />
                </div>
            )
            }
        </div >
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit)

/*
- fetchStream gets imported from actions. it is taken into props(just the function),
after going thru the connect function(bottom of page), then used in useEffect(with id)
 to fetch stream(as a callback to fetchStream in actions). this loads the stream into state.
  state.streams[ownProps.match.params.id] picks the stream from state
and loads it into props . this makes the component independent from streamList and other components.
it can fetch its own data and edit it. otherwise if a user bookmarked this page they'd come back and find no data.
- the props are coming from the Route component, from react-router-dom
- useParams can also be used here to extract id directly from match object
-initialValues are coming from the values with the same name in the
Field component
- we only want to pick title and desc and not the id.
- using a PUT request in the api(editStream) replaces the entire stream object with just
the new title and description we supplied. the stream.userId from auth reducer gets removed
from the object. stream.id is immune to this, so is still included.
Hence we use a patch request. it only replaces SOME key value pairs ie just the ones we need
and leaves the others intact

*/
