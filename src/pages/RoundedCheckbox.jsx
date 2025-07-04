import React, { useState } from "react";

const ToggleSwitch = () => {
    const [isOn, setIsOn] = useState(false);

    const handleToggle = () => {
        setIsOn(!isOn);
    };

    // Styles
    const switchContainerStyle = {
        display: "inline-block",
        position: "relative",
        width: "50px",
        height: "24px",
    };

    const trackStyle = {
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: isOn ? "#007bff" : "#ccc",
        borderRadius: "24px",
        transition: "background-color 0.3s ease",
    };

    const thumbStyle = {
        position: "absolute",
        top: "2px",
        left: isOn ? "26px" : "2px",
        width: "20px",
        height: "20px",
        backgroundColor: "#fff",
        borderRadius: "50%",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        transition: "left 0.3s ease",
        cursor: "pointer",
    };

    const labelStyle = {
        marginLeft: "10px",
        fontSize: "16px",
        color: "#333",
        fontFamily: "Arial, sans-serif",
    };

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
                style={switchContainerStyle}
                onClick={handleToggle}
                role="button"
                aria-label="Toggle Switch"
            >
                <div style={trackStyle}></div>
                <div style={thumbStyle}></div>
            </div>
            <span style={labelStyle}>{isOn ? "On" : "Off"}</span>
        </div>
    );
};

export default ToggleSwitch;
