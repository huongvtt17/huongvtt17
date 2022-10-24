import React, { memo } from 'react';
import { View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import { DynamicHeader } from '../Header';
import { goBack } from '@/utils/navigation';
import { useRoute } from '@react-navigation/core';
import moment from 'moment';

// @ts-ignore

LocaleConfig.locales['vi'] = {
    monthNames: ['Tháng Một', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư', 'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', 'Tháng Tám', 'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Mười Hai'],
    monthNamesShort: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    dayNames: ['Chủ Nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    today: 'Hôm nay'
};
LocaleConfig.defaultLocale = 'vi';

const CalendarPicker = memo(() => {
    const route = useRoute<any>();
    let selectDay = moment(route.params?.selectedDay).format('YYYY-MM-DD');
    let now = moment(new Date()).format('YYYY-MM-DD');

    return (
        <View style={styles.container}>
            <DynamicHeader back title={'Chọn ngày'} />
            <CalendarList
                firstDay={1}
                // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={20}
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={20}
                // Enable or disable scrolling of calendar list
                scrollEnabled={true}
                // Enable or disable vertical scroll indicator. Default = false
                showScrollIndicator={false}
                markedDates={{ 
                    [selectDay]: { selected: true, selectedColor: 'green' }
                }}
                onDayPress={(day: any) => {
                    route.params?.onPressDay(day);
                    goBack();
                }}
            />
        </View>
    )
});

export default CalendarPicker;

const styles = ScaledSheet.create({
    container: {
        flex: 1
    }
})

