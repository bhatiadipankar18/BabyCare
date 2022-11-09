import { useState } from "react";

export const useLocalStorage = (keyName, defaultValue) => {
    // console.log(keyName,"进入useLocalStorage");
    const [storedValue, setStoredValue] = useState(() => {
        // console.log(keyName,"进入useLocalStorage 创建了新的user state 或set default后返回 或从json读")
        try {
            const value = window.localStorage.getItem(keyName);

            if (value) {
                // console.log(keyName,"从json读")
                return JSON.parse(value);
            } else {
                // console.log(keyName,"set default后返回")

                window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch (err) {
            return defaultValue;
        }
    });

    const setValue = (newValue) => {
        // console.log(keyName,"user setValue in local stotrage")
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (err) {}
        setStoredValue(newValue);
    };

    return [storedValue, setValue];
};
