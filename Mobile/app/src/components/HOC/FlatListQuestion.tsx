import React, { memo } from 'react';
import { TouchableOpacity, Text, FlatList, View, Image } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
// @ts-ignore
import { font, font_size } from '@/configs/fonts';
import icons from '@/assets/icons';
import { width_screen } from '@/utils';
import { navigate } from '@/utils/navigation';

interface Props {
    data: Array<any>
};

export const FlatListQuestion = memo(function FlatListCart({
    data
}: Props) {
    console.log("in cart", data)
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (<RenderItem item={item} key={index} />)}
            />
        </View>
    );
});

const RenderItem = memo(({ item }: { item: any }) => {
    return (
        <TouchableOpacity style={styles.containerItem} activeOpacity={0.7}onPress={() => navigate('QuestionDetail')}>
            <View style={styles.viewItem}>
                <View style={styles.viewNumber}>
                    <View style={styles.viewRow}>
                        <Text style={styles.txtNumber} numberOfLines={1}>{'Câu hỏi 1:'}</Text>
                        <Text style={styles.txtCorrect} numberOfLines={1}>{'Đáp án đúng'}</Text>
                    </View>
                    <View style={styles.viewRow}>
                        <Image
                            source={icons.question.heart}
                            style={styles.icoHeart}
                        />
                        <Image
                            source={icons.question.menu}
                            style={styles.icoHeart}
                        />
                    </View>
                </View>
                <Text style={styles.txtQuestion}>Customer reviews indicate that many modern mobile devices are often unnecessarily</Text>
            </View>
            <FlatList
                data={[1, 2, 3, 4]}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
                numColumns={2}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (<RenderQuestion item={item} index={index} />)}
                style={{marginLeft: 20}}
            />
            <View style={styles.viewExplain}>
                <Text style={styles.txtExplain}>Giải thích</Text>
                <Text style={styles.txtExplain1}>Lorem ipsum</Text>
            </View>
        </TouchableOpacity>
    )
});

const RenderQuestion = memo(({ item, index }: { item: any, index: any }) => {
    return (
        index == 1 ?
        <Text style={styles.txtCorrectAnswer}>A. complication</Text>
        : <Text style={styles.txtAnswer}>A. complication</Text>
    )
});

const styles = ScaledSheet.create({
    container: {
        // marginBottom: '20@ms'
    },
    containerItem: {
        marginBottom: '10@ms',
        backgroundColor: 'white',
        padding: '15@ms'
    },
    viewItem: {
        borderRadius: '10@ms',
        borderWidth: 0.5,
        borderColor: '#314C1C'
    },
    viewNumber: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    txtNumber: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.NORMAL,
        color: 'white',
        backgroundColor: '#314C1C',
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: '20@ms'
    },
    txtCorrect: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.NORMAL,
        color: '#54A019',
        marginVertical: '5@ms',
        marginLeft: '10@ms'
    },
    viewRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icoHeart: {
        width: '20@ms',
        height: '20@ms',
        marginRight: '5@ms'
    },
    txtQuestion: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.NORMAL,
        color: '#314C1C',
        marginVertical: '5@ms',
        marginHorizontal: '10@ms'
    },
    txtAnswer: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.NORMAL,
        color: '#314C1C',
        paddingVertical: '6@ms',
        paddingHorizontal: '15@ms',
        borderWidth: 1,
        borderColor: '#314C1C',
        borderRadius: '20@ms',
        flex: 1,
        marginRight: '20@ms',
        textAlign: 'center',
        marginTop: '10@ms'
    },
    txtCorrectAnswer: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.NORMAL,
        color: 'white',
        paddingVertical: '6@ms',
        marginRight: '20@ms',
        paddingHorizontal: '15@ms',
        backgroundColor: '#54A019',
        borderRadius: '20@ms',
        flex: 1,
        textAlign: 'center',
        marginTop: '10@ms'
    },
    viewExplain: {
        backgroundColor: 'rgba(218, 226, 213, 0.8)',
        paddingHorizontal: '10@ms',
        paddingVertical: '6@ms',
        borderRadius: '10@ms',
        marginTop: '15@ms',
        borderWidth: 0.25,
        borderColor: '#314C1C'
    },
    txtExplain: {
        fontFamily: font.SFProTextSemibold,
        fontSize: font_size.NORMAL,
        color: '#314C1C',

    },
    txtExplain1: {
        fontFamily: font.SFProTextRegular,
        fontSize: font_size.NORMAL,
        color: '#314C1C'
    }
})