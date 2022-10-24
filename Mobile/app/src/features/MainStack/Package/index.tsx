import React, { memo, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatListProduct } from '@/components/HOC';
import { useTranslation } from 'react-i18next';
import { DynamicHeader } from '@/components/Header';
import { navigate } from '@/utils/navigation';
import { useRoute } from '@react-navigation/native';
import { getProducts } from '@/services';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux';

const Products = memo(() => {
    const { t } = useTranslation();
    const route = useRoute<any>();
    let clinicId = route?.params?.clinicId;
    const token = useSelector((state: RootState) => state.accessTokenSlice.token);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        let data = {
            clinic_id: clinicId
        }
        getProducts(data, token, (res: any) => {
            setProducts(res.data.products.data)
        })
    }, [])

    return (
        <>
            <DynamicHeader title={t('products.head')} back />
        </>
    );
});

export default Products;