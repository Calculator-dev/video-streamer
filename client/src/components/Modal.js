import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import ReactDOM from 'react-dom'

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        position: "relative",
        top: "200px",
    },

}))

const Modal = ({ actionButtons, onCancel, content, title }) => {

    const classes = useStyles()

    return ReactDOM.createPortal(
        <div
            onClick={() => onCancel()}
            className={classes.root}
        >
            <div
                onClick={(e) => e.stopPropagation()}
            >
                <div className="header">
                    <Typography variant="button" style={{ fontSize: "20px" }}>
                        {title}
                    </Typography>
                </div>
                <div className="content">
                    <Typography variant="h6">
                        {content}
                    </Typography>
                </div>
                <div className="actions">
                    {actionButtons}
                </div>
            </div>
        </div>,
        document.querySelector('#root')
    )
}

export default Modal

/*
The modal is rendered on the body element, but not on the root div, but in the modal div in
the public html file. This avoids having to render the modal in the sreamDelete component
because we'd have to render in all parent elements
-on clicking parent modal div, go home. on clicking the child to main modal parent div( anywhere in
    the modal that is not a button) we want to stop bubbling up of that click event to the
    parent div(ie the one thats taking us back to home)
*/
