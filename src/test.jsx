const filteredTimeIntervals = timeIntervals.filter(time => {
    const [hour, minute] = time.split(':');
    const [startHour, startMinute] = selectedAddressData.time.split(' - ')[0].split(':');
    const [endHour, endMinute] = selectedAddressData.time.split(' - ')[1].split(':');

    const formattedSelectedDate = selectedDate instanceof Date ? selectedDate : new Date(selectedDate);

    if (isToday(formattedSelectedDate)) {
        if (
            (hour >= currentHour && (hour === startHour || minute >= currentMinuteRounded || hour >= startHour)) &&
            (hour >= startHour && (hour !== startHour || minute >= startMinute)) &&
            (hour <= endHour && (hour !== endHour || minute <= endMinute))
        ) {
            return true;
        }
    } else {
        if (
            (hour >= startHour && (hour !== startHour || minute >= startMinute)) &&
            (hour <= endHour && (hour !== endHour || minute <= endMinute))
        ) {
            return true;
        }
    }

    return false;
});
