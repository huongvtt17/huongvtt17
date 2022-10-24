import AsyncStorage from '@react-native-async-storage/async-storage';

export const ClinicsInCart = 'ClinicsInCart';
export const BuyerData = 'BuyerData';

// ClinicsInCart
// clinic_id
// items: [
//   {
//     "product_id": 2,
//     "quantity": 3
//   }
// ]


class Storage {
  setData = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // saving error
    }
  };

  getData = async (key: string) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      // error reading value
    }
  };

  getObject = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      // error reading value
    }
  };

  removeData = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      // error reading value
    }
  };
}

export default new Storage();
