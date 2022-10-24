import { convertObToUrl } from '@/utils';
import { API, APIFormData } from './request';

export const register = (data: object, callback: any) => {
    API('auth/register', 'post', null, data, (res: object) => callback(res));
};

export const login = (data: object, callback: any) => {
    API('auth/login', 'post', null, data, (res: object) => callback(res));
};

export const cities = (callback: any) => {
    API('location/cities', 'get', null, null, (res: object) => callback(res));
};

export const districts = (data: object, callback: any) => {
    API(`location/districts?${convertObToUrl(data)}`, 'get', null, null, (res: object) => callback(res));
};

export const wards = (data: object, callback: any) => {
    API(`location/wards?${convertObToUrl(data)}`, 'get', null, null, (res: object) => callback(res));
};

export const getProfile = (token: any, callback: any) => {
    API('profile', 'get', token, null, (res: object) => callback(res));
};

export const updateProfile = (token: any, data: any, callback: any) => {
    const bodyFormData = new FormData();
    for (let key in data) {
        if (data[key]) {
            if (typeof data[key] === 'object') {
                bodyFormData.append(key, data[key]);
            } else {
                bodyFormData.append(key, data[key].toString());
            }
        }
    }
    APIFormData('profile/update', 'post', token, bodyFormData, (res: object) => callback(res));
};

export const getClinics = (data: object, token: any, callback: any) => {
    API(`clinics?${convertObToUrl(data)}`, 'get', token, null, (res: object) => callback(res));
};

export const getClinicDetail = (id: any, token: any, callback: any) => {
    API(`clinics/${id}`, 'get', token, null, (res: object) => callback(res));
};

export const getProducts = (data: object, token: any, callback: any) => {
    API(`products?${convertObToUrl(data)}`, 'get', token, null, (res: object) => callback(res));
};

export const productDetails = (id: any, token: any, callback: any) => {
    API(`products/${id}`, 'get', token, null, (res: object) => callback(res));
};

export const getVaccines= (data: object, token: any, callback: any) => {
    API(`vaccines?${convertObToUrl(data)}`, 'get', token, null, (res: object) => callback(res));
};

export const vaccineDetails = (id: any, token: any, callback: any) => {
    API(`vaccines/${id}`, 'get', token, null, (res: object) => callback(res));
};

export const followClinics = (data: object, token: any, callback: any) => {
    API('follow', 'post', token, data, (res: object) => callback(res));
};

export const followingStatus = (clinicId: any, token: any, callback: any) => {
    API(`follow/status?clinic_id=${clinicId}`, 'get', token, null, (res: object) => callback(res));
};

export const followingClinic = (token: any, callback: any) => {
    API('follow/following', 'get', token, null, (res: object) => callback(res));
};

export const myOrders = (page: number, token: any, callback: any) => {
    API(`my-orders?page=${page}&orderBy=created_at,desc`, 'get', token, null, (res: object) => callback(res));
};

export const orders = (data: object, token: any, callback: any) => {
    API(`orders`, 'post', token, data, (res: object) => callback(res));
};

export const orderDetail = (id: any, token: any, callback: any) => {
    API(`orders/${id}`, 'get', token, null, (res: object) => callback(res));
};

export const getChildren = (id: any, token: any, callback: any) => {
    API(`user/${id}/children`, 'get', token, null, (res: object) => callback(res));
};

export const createChild = (data: any, token: any, callback: any) => {
    const bodyFormData = new FormData();
    for (let key in data) {
        if (data[key]) {
            if (typeof data[key] === 'object') {
                bodyFormData.append(key, data[key]);
            } else {
                bodyFormData.append(key, data[key].toString());
            }
        }
    }
    APIFormData(`child`, 'post', token, bodyFormData, (res: object) => callback(res));
};

export const updateChild = (id: any, data: any, token: any, callback: any) => {
    const bodyFormData = new FormData();
    for (let key in data) {
        if (data[key]) {
            if (typeof data[key] === 'object') {
                bodyFormData.append(key, data[key]);
            } else {
                bodyFormData.append(key, data[key].toString());
            }
        }
    }
    APIFormData(`child/${id}`, 'post', token, bodyFormData, (res: object) => callback(res));
};

export const listUserInfo = (uuids: any, token: any, callback: any) => {
    API(`clinics/info?${uuids}`, 'get', token, null, (res: object) => callback(res));
};

export const createAppoinment = (data: any, token: any, callback: any) => {
    API('appointments', 'post', token, data, (res: object) => callback(res));
};