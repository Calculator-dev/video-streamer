import React, { useEffect } from 'react'
import flv from 'flv.js'
import { connect } from 'react-redux'
import { fetchStream } from '../actions'

const StreamShow = (props) => {

    const videoRef = React.createRef();
    let player;

    useEffect(() => {
        const id = props.match.params.id;
        props.fetchStream(id);
        buildPlayer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const buildPlayer = () => {
        if (player || !props.stream) {
            return;
        }
        const id = props.match.params.id
        player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        })
        player.attachMediaElement(videoRef.current)
        player.load();

    }
    if (!props.stream) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <video ref={videoRef} style={{ width: '100%' }} controls="true" />
            <h1>{props.stream.streamName}</h1>
            <h5>{props.stream.streamDescription}</h5>
        </div>
    )

}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(
    mapStateToProps, { fetchStream }
)(StreamShow)