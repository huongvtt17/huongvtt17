import React, { memo, useState } from 'react';
import { ScaledSheet } from 'react-native-size-matters';
import { View, ViewProps, Text, TouchableHighlight, TextInput, Image } from 'react-native';
import { font_size, font } from '@/configs/fonts';
import { Modalize } from 'react-native-modalize';
import { removeDiacritical } from '@/utils';
import icons from '@/assets/icons';
import { useTranslation } from 'react-i18next';
import { EmptyState } from '../HOC';

interface Props extends ViewProps {
    modalRef: any,
    data: {
        title: string,
        content?: string,
        options: Array<any>,
        header?: boolean,
        keyword?: any,
        setKeyword?: (item: any) => void
    },
    onPress: (data: any) => void
}

export const SelectModal = memo(function SelectModal({
    modalRef, data, onPress
}: Props) {
    const { t } = useTranslation();
    const [list, setList] = useState(data.options);
    let optionData = (data.keyword != '' && data.keyword) ? list : data.options;
    const [showFullContent, setShowFullContent] = useState(false);

    const onChoose = (item: any) => {
        onPress(item);
        modalRef.current.close();
    }

    const onSearch = (term: any) => {
        data.setKeyword ? data.setKeyword(term) : console.log('term')

        if (term && (term + '').trim() !== '') {
            term = (term + '').trim().toLowerCase();
            console.log('term keywor', term)
            const searchResult = data.options.filter((d: any) => {
                return removeDiacritical(d.type + d.name).toLowerCase().indexOf(removeDiacritical(term)) >= 0;
            });
            setList(searchResult)
            console.log("searching ...", searchResult)
        } else {
            setList(data.options)
        }
    }
    return (
        <Modalize
            ref={modalRef}
            snapPoint={400}
            handlePosition={'inside'}
            onPositionChange={(position: any) => {
                if (position == 'top') {
                    setShowFullContent(true);
                }
            }}
            HeaderComponent={
                <View style={styles.viewHeader}>
                    <Text style={styles.txtHeader}>{data.title}</Text>
                    {data.content ?
                        <Text style={styles.txtContent}>{data.content}</Text> : <></>
                    }
                    {data.header &&
                        <View style={styles.viewInput}>
                            <Image
                                source={icons.header.search}
                                style={styles.icon}
                            />
                            <TextInput
                                placeholder={t('clinic.content')}
                                style={styles.txtInput}
                                value={data.keyword}
                                onChangeText={(value: any) => onSearch(value)}
                            />
                        </View>
                    }
                </View>}
        >
            <View style={styles.flex}>
                <View style={styles.flex}>
                    {optionData.length > 0 ?
                        (optionData.map((item, index) => {
                            return (
                                <TouchableHighlight key={index} onPress={() => onChoose(item)}>
                                    <View style={styles.btnOption}>
                                        <Text style={styles.txtOption}>{`${item.type ? item.type : ''} ${item.name}`}</Text>
                                    </View>
                                </TouchableHighlight>
                            )
                        })) : (
                            <EmptyState content={'Chưa có dữ liệu'} />
                        )
                    }
                </View>
            </View>
        </Modalize>
    );
});

const styles = ScaledSheet.create({
    flex: {
        // flex: 1
    },
    container: {

    },
    viewInput: {
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: '8@ms',
        alignItems: 'center',
        marginHorizontal: '15@ms',
        borderColor: '#E3E5E6',
        height: '45@ms'
    },
    icon: {
        width: '24@ms',
        height: '24@ms',
        paddingVertical: 0,
        marginLeft: '10@ms',
        marginRight: '5@ms'
    },
    txtInput: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.VERY_LARGE,
        color: '#090A0A',
        paddingVertical: 0,
        flex: 1
    },
    viewHeader: {
        paddingVertical: '15@ms0.3',
    },
    txtHeader: {
        fontFamily: font.SFProTextBold,
        color: '#000000',
        fontSize: 20,
        marginTop: 20,
        marginHorizontal: '15@ms'
    },
    txtContent: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.NORMAL,
        color: '#798295',
        marginTop: '5@ms0.3'
    },
    btnOption: {
        paddingVertical: '15@ms0.3'
    },
    txtOption: {
        color: '#000000',
        marginLeft: '15@ms0.3',
        fontSize: font_size.VERY_LARGE
    }
});