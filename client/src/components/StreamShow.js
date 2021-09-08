import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchStream } from '../actions'
import flv from 'flv.js'
import { Grid, Typography } from '@material-ui/core'

class StreamShow extends Component {
    constructor(props) {
        super(props)

        this.videoRef = React.createRef()
    }

    componentDidMount() {
        const { id } = this.props.match.params
        this.props.fetchStream(id)
        this.buildPlayer()
    }

    componentDidUpdate() {
        this.player.destroy()
    }

    componentWillUnmount() {
        this.buildPlayer()
    }

    buildPlayer() {
        if (this.player || !this.props.stream) {
            return
        }

        const { id } = this.props.match.params
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        })
        this.player.attachMediaElement(this.videoRef.current)
        this.player.load()
    }

    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>
        }

        const { streamName, streamDescription } = this.props.stream
        return (
            <Grid style={{ textAlign: "center" }}>
                <Grid>
                    <video
                        ref={this.videoRef}
                        style={{ width: '60%', height: "40%", position: "relative", top: "20px" }}
                        controls={true}

                    />
                </Grid>
                <br />
                <Grid item >
                    <Grid sm><Typography variant="button" style={{ fontSize: "30px" }}>{streamName}</Typography></Grid>
                    <Grid sm><Typography variant="button" style={{ fontSize: "15px" }}>{streamDescription}</Typography></Grid>
                </Grid>
            </Grid >
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow)