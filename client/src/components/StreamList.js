import React, { useEffect } from 'react';
import { fetchStreams } from '../actions';
import { connect } from "react-redux"
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import { Link } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';



const StreamList = ({ fetchStreams, streams, currentUserId, isSignedIn }) => {

    useEffect(() => {
        fetchStreams()
        // eslint-disable-next-line
    }, [])

    const renderAdmin = (stream) => {
        if (stream.userId === currentUserId) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} style={{ textDecoration: "none" }}>
                        <Button variant="contained"
                            color="primary"
                            startIcon={<EditIcon />}>
                            Edit
                        </Button>
                    </Link>
                    <Link to={`/streams/delete/${stream.id}`} style={{ textDecoration: "none", marginLeft: "10px" }}>
                        <Button variant="contained"
                            color="secondary"
                            startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                    </Link>
                </div>
            )
        }
    }

    const renderCreate = () => {
        if (isSignedIn) {
            return (
                <div style={{ textAlign: "right", marginTop: "10px" }}>
                    <Link to="/streams/new" style={{ textDecoration: "none" }}>
                        <Button variant="contained" color="primary">
                            Create Stream
                        </Button>
                    </Link>
                </div>
            )
        }
    }

    const renderList = () => {
        return (
            <TableContainer component={Paper} >
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell >
                                <Typography variant="h6">
                                    Stream Title
                                </Typography>
                            </TableCell>
                            <TableCell >
                                <Typography variant="h6">
                                    Stream Description
                                </Typography>
                            </TableCell>
                            <TableCell >
                                <Typography variant="h6">
                                    Stream Options
                                </Typography>
                            </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {streams.map((stream) => (
                            <TableRow key={stream.id}>
                                <TableCell>
                                    <VideoLibraryIcon
                                        style={{
                                            marginRight: "20px",
                                            height: "20px",
                                            width: "20px",
                                        }}
                                    />
                                    <Link to={`/streams/${stream.id}`} style={{ textDecoration: "none", color: "black" }}>
                                        {stream.streamName}
                                    </Link>
                                </TableCell>
                                <TableCell align="left">{stream.streamDescription}</TableCell>

                                <TableCell >
                                    {renderAdmin(stream)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer >
        )
    }

    return (
        <div style={{ margin: "20px 0 20px 0", textAlign: "center" }}>
            <Typography variant="h4">
                Available Streams
            </Typography>
            <div style={{ width: "800px", margin: "auto", marginTop: "20px" }}>
                {renderList()}
                {renderCreate()}
            </div>

        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);
