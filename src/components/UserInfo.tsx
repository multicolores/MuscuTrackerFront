import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import all_badges from "../images/badges/all_badges_info.png";
import badge_level_1 from "../images/badges/level-1.png";
import badge_level_2 from "../images/badges/level-2.png";
import badge_level_3 from "../images/badges/level-3.png";
import badge_level_4 from "../images/badges/level-4.png";
import badge_level_5 from "../images/badges/level-5.png";
import CloseIcon from "@mui/icons-material/Close";

const UserInfo = (props: any) => {
    const [data, setData] = useState({ trainingsNumber: 0 });
    const [user, setUser] = useState(props.user);
    const [showUserInfoModal, setShowUserInfoModal] = useState(false);

    useEffect(() => {
        let i = 0;
        let trainings = 0;
        props.workouts.map((workout: any) => {
            i++;
            workout.exercise.forEach((exercise: any) => {
                exercise.repetition.forEach((repetition: any) => {
                    trainings += 1;
                });
                trainings -= 1;
            });
            if (i >= props.workouts.length) {
                setData({ trainingsNumber: trainings });
            }
        });
    }, []);

    return (
        <>
            <Button
                variant="contained"
                className="main-page--userInfo-button"
                onClick={() => {
                    setShowUserInfoModal(!showUserInfoModal);
                }}
            >
                {data.trainingsNumber < 50 ? (
                    <img src={badge_level_1} alt="user badge" />
                ) : data.trainingsNumber < 150 ? (
                    <img src={badge_level_2} alt="user badge" />
                ) : data.trainingsNumber < 300 ? (
                    <img src={badge_level_3} alt="user badge" />
                ) : data.trainingsNumber < 500 ? (
                    <img src={badge_level_4} alt="user badge" />
                ) : (
                    <img src={badge_level_5} alt="user badge" />
                )}
            </Button>

            {user && data && (
                <div
                    className={
                        "user-info--container " +
                        (showUserInfoModal ? "show" : "hidden")
                    }
                >
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    <div className="user-info--user-badge">
                        {data.trainingsNumber < 50 ? (
                            <img src={badge_level_1} alt="user badge" />
                        ) : data.trainingsNumber < 150 ? (
                            <img src={badge_level_2} alt="user badge" />
                        ) : data.trainingsNumber < 300 ? (
                            <img src={badge_level_3} alt="user badge" />
                        ) : data.trainingsNumber < 500 ? (
                            <img src={badge_level_4} alt="user badge" />
                        ) : (
                            <img src={badge_level_5} alt="user badge" />
                        )}
                    </div>

                    <img src={all_badges} alt="Level for badges info" />

                    <Button
                        variant="contained"
                        className="user-info--close-button"
                        onClick={() => {
                            setShowUserInfoModal(!showUserInfoModal);
                        }}
                    >
                        <CloseIcon />
                    </Button>
                </div>
            )}
        </>
    );
};

export default UserInfo;
