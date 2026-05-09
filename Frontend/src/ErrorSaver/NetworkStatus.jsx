import { useEffect, useState } from "react";

const getConnectionInfo = () => {
    if (typeof navigator === "undefined") {
        return {
            isOnline: true,
            effectiveType: "unknown",
            downlink: 0,
            rtt: 0,
            saveData: false,
            networkType: "unknown",
            downlinkMax: 0,
            lastUpdated: "",
        };
    }

    const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;

    return {
        isOnline: navigator.onLine,
        effectiveType: connection?.effectiveType || "unknown",
        downlink: connection?.downlink || 0,
        rtt: connection?.rtt || 0,
        saveData: connection?.saveData || false,
        networkType: connection?.type || "unknown",
        downlinkMax: connection?.downlinkMax || 0,
        lastUpdated: new Date().toLocaleTimeString(),
    };
};

const useInternetStatus = () => {
    const [status, setStatus] = useState(getConnectionInfo);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const connection =
            navigator.connection ||
            navigator.mozConnection ||
            navigator.webkitConnection;

        const updateStatus = () => {
            setStatus((prev) => {
                const newStatus = getConnectionInfo();

                // Prevent unnecessary re-renders
                const isSame =
                    prev.isOnline === newStatus.isOnline &&
                    prev.effectiveType === newStatus.effectiveType &&
                    prev.downlink === newStatus.downlink &&
                    prev.rtt === newStatus.rtt &&
                    prev.saveData === newStatus.saveData &&
                    prev.networkType === newStatus.networkType &&
                    prev.downlinkMax === newStatus.downlinkMax;

                return isSame
                    ? prev
                    : newStatus;
            });
        };

        updateStatus();

        window.addEventListener("online", updateStatus);
        window.addEventListener("offline", updateStatus);

        connection?.addEventListener?.(
            "change",
            updateStatus
        );

        return () => {
            window.removeEventListener(
                "online",
                updateStatus
            );

            window.removeEventListener(
                "offline",
                updateStatus
            );

            connection?.removeEventListener?.(
                "change",
                updateStatus
            );
        };
    }, []);

    return status;
};

export default useInternetStatus;