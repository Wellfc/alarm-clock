'use strict';

import { onEvent, select, print } from './utils.js';

const currentHour = select('.current-hour');
const currentMinute = select('.current-minute');
let alarmHour = select('.alarm-hour');
let alarmMinute = select('.alarm-minute');
const alarmBtn = select('.alarm-btn');
const alarm = new Audio('./assets/audio/alarm.mp3');

// Set current time
function setTime() {
    const date = new Date();
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');

    currentHour.textContent = hour;
    currentMinute.textContent = minute;

    setTimeout(setTime, 1000);
}

// Set alarm time from input
function setAlarmTime() {
    let userHour = select('.input-hour').value;
    let userMinute = select('.input-minute').value;
    let alarmColon = select('.alarm-colon');

    alarmHour.textContent = userHour;
    alarmColon.textContent = ':';
    alarmMinute.textContent = userMinute;
    select('.input-hour').value = '';
    select('.input-minute').value = '';
}

// Check alarm
function checkAlarm() {
    let alarmInterval = setInterval(() => {
        const date = new Date();
        const hour = date.getHours();
        const minute = date.getMinutes();

        if (parseInt(hour) === parseInt(alarmHour.textContent) && parseInt(minute) === parseInt(alarmMinute.textContent)) {
            alarm.play();
            select('.current-time').style.color = '#459b65';
            select('.current-time').classList.add('blinking');

            // Clear interval
            clearInterval(alarmInterval);
            
            // Stop alarm after 8 seconds
            setTimeout(() => {
                alarm.pause();
                alarm.currentTime = 0;
                select('.current-time').style.color = '#fff';
                select('.current-time').classList.remove('blinking');
            }, 8000);
        }
    }, 1000);
}

// Validate Alarm Hour
function validateAlarmHour() {
    const timeRegex = /^\d{2}$/;
    let userHour = select('.input-hour');
    
    if (userHour.value === '' || !timeRegex.test(userHour.value)) {
        return false;
    } else if (userHour.value > 23) {
        return false;
    }

    return true;
}

// Validate Alarm Minute
function validateAlarmMinute() {
    const timeRegex = /^\d{2}$/;
    let userMinute = select('.input-minute');

    if (userMinute.value === '' || !timeRegex.test(userMinute.value)) {
        return false;
    } else if (userMinute.value > 59) {
        return false;
    }

    return true;
}

onEvent('click', alarmBtn, () => {
    if (!validateAlarmHour()) {
        select('.input-hour').value = '';
        select('.input-hour').focus();
        return;
    } else if (!validateAlarmMinute()) {
        select('.input-minute').value = '';
        select('.input-minute').focus();
        return;
    }

    setAlarmTime();
    checkAlarm();
});

onEvent('load', window, () => {
    setTime();
});

