import { useMemo } from 'react'

import { IProductItem } from 'src/types/product'
import { _productDetails, _productList } from 'src/_mock'

// ----------------------------------------------------------------------

export function useGetProducts() {
    const products = _productList

    const memoizedValue = useMemo(
        () => ({
            products: (products as IProductItem[]) || [],
            productsLoading: false,
            productsError: false,
            productsValidating: false,
            productsEmpty: !false && !products.length,
        }),
        [products]
    )

    return memoizedValue
}

// ----------------------------------------------------------------------

export function useGetProduct(productId: string) {
    const product = _productDetails

    const memoizedValue = useMemo(
        () => ({
            product: product as IProductItem,
            productLoading: false,
            productError: false,
            productValidating: false,
        }),
        [product]
    )

    return memoizedValue
}
