import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";


const GoogleAuth = ({ dispatch, isSignedIn, userId }) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const params = {
            clientId:
                "262729366522-lvl4ejcb76fakci10vqbo5gv6sv3vri3.apps.googleusercontent.com",
            scope: "email",
        };

        window.gapi.load("client:auth2", () => {
            window.gapi.client.init(params).then(() => {
                setAuth(window.gapi.auth2.getAuthInstance());
                onAuthChange(window.gapi.auth2.getAuthInstance().isSignedIn.get());
                window.gapi.auth2.getAuthInstance().isSignedIn.listen(onAuthChange);
            });
        });
        // eslint-disable-next-line
    }, []);

    const onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            dispatch(
                signIn(
                    window.gapi.auth2.getAuthInstance().currentUser.get().getId()
                )
            );
        } else {
            dispatch(signOut());
        }
    };

    const onSignInClick = () => {
        auth.signIn();
    };

    const onSignOutClick = () => {
        auth.signOut();
    };

    const renderAuthButton = () => {
        if (isSignedIn === null) {
            return null;
        } else if (isSignedIn) {
            return (
                <div>
                    <Button variant="contained" color="secondary" onClick={onSignOutClick}>Signout</Button>
                </div>
            );
        } else {
            return <Button variant="contained" color="secondary" onClick={onSignInClick}>Sign In with Google</Button>;
        }
    };

    return <div>{renderAuthButton()}</div>;
};

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

export default connect(mapStateToProps)(GoogleAuth);