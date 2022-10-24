import { Alert, Dimensions } from "react-native";
import ImagePicker from 'react-native-image-crop-picker';

const { height: height_screen, width: width_screen } = Dimensions.get('window');
const isTablet = width_screen > 750;

const MAX_WIDTH = 150;
const MAX_HEIGHT = 150;

const convertObToUrl = (obj: any) => {
    var str = "";
    for (var key in obj) {
        if (str != "") {
            str += "&";
        }
        str += key + "=" + encodeURIComponent(obj[key]);
    };
    return str;
};

/**
 * Convert money number to beautiful format
 * Eg: formatMoney(123456789, 2, ".", ",");
 */

const convertMoney = (number: any) => {
    if (number == 0 || number == "NaN" || number == "") return 0 + 'đ';
    var value: any = Number(number).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    if (value == 0 || value == "NaN" || value == "") {
        return 0;
    }
    return value + 'đ';
};

export function removeDiacritical(str: string) {
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');
    str = str.replace(/(À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)/g, 'A');
    str = str.replace(/(È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)/g, 'E');
    str = str.replace(/(Ì|Í|Ị|Ỉ|Ĩ)/g, 'I');
    str = str.replace(/(Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)/g, 'O');
    str = str.replace(/(Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)/g, 'U');
    str = str.replace(/(Ỳ|Ý|Ỵ|Ỷ|Ỹ)/g, 'Y');
    str = str.replace(/(Đ)/g, 'D');
    return str;
};

const chooseImageFromCamera = async (cropping: boolean = false) => {
    return new Promise(async (resolve, reject) => {
        await ImagePicker.openCamera({
            width: MAX_WIDTH,
            height: MAX_HEIGHT,
            compressImageMaxWidth: MAX_WIDTH,
            compressImageMaxHeight: MAX_HEIGHT,
            waitAnimationEnd: true,
            cropping
        })
            .then(res => {
                return resolve(res);
            })
            .catch(err => {
                if (
                    err.code === 'E_PERMISSION_MISSING' ||
                    err.code === 'E_PICKER_NO_CAMERA_PERMISSION'
                ) {
                    Alert.alert('Err', 'Chưa cấp quyền');
                }
                if (err.code === 'E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR') {
                    //
                }
                return reject(err);
            });
    });
}

const chooseImageFromGallery = async (cropping: boolean = false, multiple: boolean = true) => {
    return new Promise(async (resolve, reject) => {
        await ImagePicker.openPicker({
            width: MAX_WIDTH,
            height: MAX_HEIGHT,
            compressImageMaxWidth: MAX_WIDTH,
            compressImageMaxHeight: MAX_HEIGHT,
            waitAnimationEnd: true,
            compressImageQuality: 0.8,
            cropping,
            multiple
        })
            .then(res => {
                return resolve(res);
            })
            .catch(err => {
                if (
                    err.code === 'E_PERMISSION_MISSING' ||
                    err.code === 'E_PICKER_NO_CAMERA_PERMISSION'
                ) {
                    Alert.alert('Err', 'Chưa cấp quyền');
                }
                if (err.code === 'E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR') {
                    //
                }
                return reject(err);
            });
    });
};

const htmltoText = (html: string) => {
    let text = html;
    text = text.replace(/\n/gi, "");
    text = text.replace(/<style([\s\S]*?)<\/style>/gi, "");
    text = text.replace(/<script([\s\S]*?)<\/script>/gi, "");
    text = text.replace(/<a.*?href="(.*?)[\?\"].*?>(.*?)<\/a.*?>/gi, " $2 $1 ");
    text = text.replace(/<\/div>/gi, "\n\n");
    text = text.replace(/<\/li>/gi, "\n");
    text = text.replace(/<li.*?>/gi, "  *  ");
    text = text.replace(/<\/ul>/gi, "\n\n");
    text = text.replace(/<\/p>/gi, "\n\n");
    text = text.replace(/<br\s*[\/]?>/gi, "\n");
    text = text.replace(/<[^>]+>/gi, "");
    text = text.replace(/^\s*/gim, "");
    text = text.replace(/ ,/gi, ",");
    text = text.replace(/ +/gi, " ");
    text = text.replace(/\n+/gi, "\n\n");
    return text;
};


export {
    isTablet,
    width_screen,
    height_screen,
    convertObToUrl,
    convertMoney,
    chooseImageFromCamera,
    chooseImageFromGallery,
    htmltoText
}