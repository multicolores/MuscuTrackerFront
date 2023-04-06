import React from "react";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Slide, { SlideProps } from "@mui/material/Slide";

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="down" />;
}

export default function Notification(props: any) {
    const { notify, setNotify } = props;

    const handleClose = () => {
        setNotify({ ...notify, isOpen: false });
    };

    return (
        <Snackbar
            open={notify.isOpen}
            autoHideDuration={3500}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            TransitionComponent={SlideTransition}
        >
            <Alert
                severity={notify.type}
                onClose={handleClose}
                className="notification"
            >
                {notify.message}
            </Alert>
        </Snackbar>
    );
}
