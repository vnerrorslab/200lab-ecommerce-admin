import { useMemo } from 'react'

import { IProductItem } from 'src/types/product'
import { _productDetails, _productList } from 'src/_mock'
import useSWR from 'swr'
import { endpoints, fetcher } from 'src/utils/axios'

// ----------------------------------------------------------------------

interface GetProductsProps {
    page: number
    rowsPerPage: number
}

export function useGetProducts({ page, rowsPerPage }: GetProductsProps) {
    const url = endpoints.product.list
    const {
        data: response,
        error,
        isLoading,
        isValidating,
    } = useSWR(
        [url, { params: { limit: rowsPerPage * (page + 2) } }],
        fetcher,
        {
            revalidateOnFocus: false,
        }
    )

    const products: IProductItem[] = response?.data.map((dataItem: any) => ({
        id: dataItem.id,
        gender: 'Men',
        publish: 'published',
        category: 'Shose',
        available: 0,
        priceSale: dataItem.price,
        quantity: dataItem.quantity,
        sizes: [
            '6',
            '7',
            '8',
            '8.5',
            '9',
            '9.5',
            '10',
            '10.5',
            '11',
            '11.5',
            '12',
            '13',
        ],
        inventoryType: 'in stock',
        images: [
            dataItem.images[0]?.url,
            '/assets/images/product_2.jpg',
            '/assets/images/product_2.jpg',
            '/assets/images/product_2.jpg',
            '/assets/images/product_2.jpg',
            '/assets/images/product_2.jpg',
            '/assets/images/product_2.jpg',
            '/assets/images/product_2.jpg',
        ],
        tags: ['Shoes'],
        code: '38BEE271',
        description:
            '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li>\n    <p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort</p>\n    and durability.\n  </li>\n  <li>\n    <p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushio</p>\n    ning underfoot.\n  </li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n\n',
        newLabel: {
            enabled: true,
            content: 'NEW',
        },
        createdAt: new Date('2024-06-29T11:51:00.060Z'),
        saleLabel: {
            enabled: false,
            content: 'SALE',
        },
        name: dataItem.name,
        price: dataItem.price,
        coverUrl: dataItem.images[0]?.url,
        totalRatings: 3.7,
        totalSold: 684,
        totalReviews: 9124,
        subDescription: dataItem.description,
        colors: ['#000000', '#FFFFFF'],
    }))

    const memoizedValue = useMemo(
        () => ({
            products: (products as IProductItem[]) || [],
            productsLoading: isLoading,
            productsError: error,
            productsValidating: isValidating,
            productsEmpty: !false && !products?.length,
        }),
        [response, isLoading, error, isValidating] // eslint-disable-line
    )

    return memoizedValue
}

// ----------------------------------------------------------------------

export function useGetProduct(productId: string) {
    const url = endpoints.product.details

    const {
        data: res,
        error,
        isLoading,
        isValidating,
    } = useSWR(`${url}${productId}`, fetcher)

    const data = res?.data
    const product = {
        id: data?.id,
        gender: 'Men',
        publish: 'published',
        category: 'Shose',
        available: 0,
        priceSale: data?.price,
        quantity: data?.quantity,
        sizes: [
            '6',
            '7',
            '8',
            '8.5',
            '9',
            '9.5',
            '10',
            '10.5',
            '11',
            '11.5',
            '12',
            '13',
        ],
        inventoryType: 'in stock',
        images: [data?.images[0]?.url],
        tags: ['Shoes'],
        code: '38BEE271',
        description:
            '\n<h6>Specifications</h6>\n<br/>\n<ol>\n  <li>Category</li>\n  <li>Shoes</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Manufacturer</li>\n  <li>Nike</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Serial Number</li>\n  <li>358607726380311</li>\n</ol>\n\n<br/>\n<ol>\n  <li>Ships From</li>\n  <li>United States</li>\n</ol>\n\n<br/>\n<br/>\n\n<h6>Product Details</h6>\n<br/>\n<ul>\n  <li><p>The foam sockliner feels soft and comfortable</p></li>\n  <li><p>Pull tab</p></li>\n  <li><p>Not intended for use as Personal Protective Equipment</p></li>\n  <li><p>Colour Shown: White/Black/Oxygen Purple/Action Grape</p></li>\n  <li><p>Style: 921826-109</p></li>\n  <li><p>Country/Region of Origin: China</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Benefits</h6>\n<br/>\n<ul>\n  <li>\n    <p>Mesh and synthetic materials on the upper keep the fluid look of the OG while adding comfort</p>\n    and durability.\n  </li>\n  <li>\n    <p>Originally designed for performance running, the full-length Max Air unit adds soft, comfortable cushio</p>\n    ning underfoot.\n  </li>\n  <li><p>The foam midsole feels springy and soft.</p></li>\n  <li><p>The rubber outsole adds traction and durability.</p></li>\n</ul>\n\n<br/>\n<br/>\n\n<h6>Delivery and Returns</h6>\n<br/>\n<p>Your order of $200 or more gets free standard delivery.</p>\n<br/>\n<ul>\n  <li><p>Standard delivered 4-5 Business Days</p></li>\n  <li><p>Express delivered 2-4 Business Days</p></li>\n</ul>\n<br/>\n<p>Orders are processed and delivered Monday-Friday (excluding public holidays)</p>\n\n',
        newLabel: {
            enabled: true,
            content: 'NEW',
        },
        createdAt: new Date('2024-06-29T11:51:00.060Z'),
        saleLabel: {
            enabled: false,
            content: 'SALE',
        },
        name: data?.name,
        price: data?.price,
        coverUrl: data?.images[0]?.url,
        totalRatings: 3.7,
        totalSold: 684,
        totalReviews: 9124,
        subDescription: data?.description,
        colors: ['#000000', '#FFFFFF'],
    }

    const memoizedValue = useMemo(
        () => ({
            product: product as IProductItem,
            productLoading: error,
            productError: isLoading,
            productValidating: isValidating,
        }),
        [data, error, isLoading, isValidating] // eslint-disable-line
    )

    return memoizedValue
}
