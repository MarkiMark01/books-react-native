import { useState } from "react";

export const useModal = () => {
    const [modalWindow, setModalWindow] = useState(false);

    const toggleModalOpen = () => {
        setModalWindow(true);
    };

    const toggleModalClose = () => {
        setModalWindow(false);
    };

    return [modalWindow, toggleModalOpen, toggleModalClose];
};