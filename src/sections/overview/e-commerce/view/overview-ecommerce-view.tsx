'use client'

import { useTheme } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Unstable_Grid2'

import { _ecommerceSalesOverview } from 'src/_mock'

import { useSettingsContext } from 'src/components/settings'

import EcommerceYearlySales from '../ecommerce-yearly-sales'
import EcommerceProductSales from '../ecommerce-product-sales'
import EcommerceSalesOverview from '../ecommerce-sales-overview'
import EcommerceWidgetSummary from '../ecommerce-widget-summary'
import EcommerceCurrentBalance from '../ecommerce-current-balance'

// ----------------------------------------------------------------------

export default function OverviewEcommerceView() {
    const theme = useTheme()

    const settings = useSettingsContext()

    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
            <Grid container spacing={3}>
                <Grid xs={12} md={4}>
                    <EcommerceWidgetSummary
                        title="Product Sold"
                        percent={2.6}
                        total={765}
                        chart={{
                            series: [22, 8, 35, 50, 82, 84, 77, 12, 87, 43],
                        }}
                    />
                </Grid>

                <Grid xs={12} md={4}>
                    <EcommerceWidgetSummary
                        title="Total Balance"
                        percent={-0.1}
                        total={18765}
                        chart={{
                            colors: [
                                theme.palette.info.light,
                                theme.palette.info.main,
                            ],
                            series: [56, 47, 40, 62, 73, 30, 23, 54, 67, 68],
                        }}
                    />
                </Grid>

                <Grid xs={12} md={4}>
                    <EcommerceWidgetSummary
                        title="Sales Profit"
                        percent={0.6}
                        total={4876}
                        chart={{
                            colors: [
                                theme.palette.warning.light,
                                theme.palette.warning.main,
                            ],
                            series: [40, 70, 75, 70, 50, 28, 7, 64, 38, 27],
                        }}
                    />
                </Grid>

                <Grid xs={12} md={6} lg={4}>
                    <EcommerceProductSales
                        title="Product Sales"
                        total={2324}
                        chart={{
                            series: [
                                { label: 'Perfume', value: 44 },
                                { label: 'Shoes', value: 75 },
                            ],
                        }}
                    />
                </Grid>

                <Grid xs={12} md={6} lg={8}>
                    <EcommerceYearlySales
                        title="Yearly Sales"
                        subheader="(+43%) than last year"
                        chart={{
                            categories: [
                                'Jan',
                                'Feb',
                                'Mar',
                                'Apr',
                                'May',
                                'Jun',
                                'Jul',
                                'Aug',
                                'Sep',
                                'Oct',
                                'Nov',
                                'Dec',
                            ],
                            series: [
                                {
                                    year: '2019',
                                    data: [
                                        {
                                            name: 'Total Income',
                                            data: [
                                                10, 41, 35, 51, 49, 62, 69, 91,
                                                148, 35, 51, 49,
                                            ],
                                        },
                                        {
                                            name: 'Total Expenses',
                                            data: [
                                                10, 34, 13, 56, 77, 88, 99, 77,
                                                45, 13, 56, 77,
                                            ],
                                        },
                                    ],
                                },
                                {
                                    year: '2020',
                                    data: [
                                        {
                                            name: 'Total Income',
                                            data: [
                                                51, 35, 41, 10, 91, 69, 62, 148,
                                                91, 69, 62, 49,
                                            ],
                                        },
                                        {
                                            name: 'Total Expenses',
                                            data: [
                                                56, 13, 34, 10, 77, 99, 88, 45,
                                                77, 99, 88, 77,
                                            ],
                                        },
                                    ],
                                },
                            ],
                        }}
                    />
                </Grid>

                <Grid xs={12} md={6} lg={8}>
                    <EcommerceSalesOverview
                        title="Sales Overview"
                        data={_ecommerceSalesOverview}
                    />
                </Grid>

                <Grid xs={12} md={6} lg={4}>
                    <EcommerceCurrentBalance
                        title="Current Balance"
                        currentBalance={187650}
                        sentAmount={25500}
                    />
                </Grid>
            </Grid>
        </Container>
    )
}
