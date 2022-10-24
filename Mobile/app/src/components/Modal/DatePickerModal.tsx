import React, { useState, memo } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import Modal from "react-native-modalbox";
import DatePicker from "react-native-date-picker";
import { font, font_size } from "@/configs/fonts";
import { ScaledSheet } from "react-native-size-matters";
import { useTranslation } from "react-i18next";

interface Props {
    isDatePickerVisible: boolean;
    setDatePickerVisibility: any;
    value: any;
    setValue: any;
    minDate?: Date;
    maxDate?: Date
}

export const DatePickerModal = memo((
    { isDatePickerVisible, setDatePickerVisibility, value, setValue, minDate, maxDate }: Props) => {
    const { t } = useTranslation();
    const [date, setDate] = useState(value);
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    }

    const handleConfirm = () => {
        setDatePickerVisibility(false);
        setValue(date);
    };

    return (
        <Modal
            onClosed={hideDatePicker}
            backdrop={true}
            position={'bottom'}
            style={styles.containerModal}
            isOpen={isDatePickerVisible}
            backdropPressToClose={true}
            swipeToClose={false}
            coverScreen
        >
            <View>
                <View style={styles.viewHeader}>
                    <Text style={styles.txtHeader}>{t('chooseTime')}</Text>
                    <TouchableOpacity style={styles.btnConfirm} onPress={handleConfirm}>
                        <Text style={styles.txtConfirm}>{t('confirm')}</Text>
                    </TouchableOpacity>
                </View>
                <DatePicker
                    mode="date"
                    style={{ alignSelf: 'center' }}
                    onDateChange={(value: Date) => setDate(value)}
                    date={date}
                    minimumDate={minDate ? minDate : undefined}
                    maximumDate={maxDate ? maxDate : undefined}
                    androidVariant="nativeAndroid"
                    locale={'vi'}
                />
            </View>
        </Modal >)
});

const styles = ScaledSheet.create({
    containerModal: {
        zIndex: 2,
        width: '100%',
        backgroundColor: 'white',
        height: 300
    },
    viewHeader: {
        borderBottomWidth: '0.25@ms0.3',
        borderBottomColor: '#CCCCCC',
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtHeader: {
        color: '#000000',
        padding: '15@ms0.3',
        fontFamily: font.SFProTextBold,
        fontSize: font_size.VERY_LARGE,
        flex: 1
    },
    btnConfirm: {
        padding: '15@ms0.3'
    },
    txtConfirm: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.NORMAL,
        color: '#0060E1'
    }
});