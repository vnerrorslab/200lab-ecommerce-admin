import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Avatar from '@mui/material/Avatar'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import ListItemText from '@mui/material/ListItemText'

import { fCurrency } from 'src/utils/format-number'

import Iconify from 'src/components/iconify'
import Scrollbar from 'src/components/scrollbar'

import { IOrderProductItem } from 'src/types/order'

// ----------------------------------------------------------------------

type Props = {
    shipping: number
    subTotal: number
    totalAmount: number
    items: IOrderProductItem[]
}

export default function OrderDetailsItems({
    items,
    shipping,
    subTotal,
    totalAmount,
}: Props) {
    const renderTotal = (
        <Stack
            spacing={2}
            alignItems="flex-end"
            sx={{ my: 3, textAlign: 'right', typography: 'body2' }}
        >
            <Stack direction="row">
                <Box sx={{ color: 'text.secondary' }}>Subtotal</Box>
                <Box sx={{ width: 160, typography: 'subtitle2' }}>
                    {fCurrency(subTotal) || '-'}
                </Box>
            </Stack>

            <Stack direction="row">
                <Box sx={{ color: 'text.secondary' }}>Shipping</Box>
                <Box
                    sx={{
                        width: 160,
                        ...(shipping && { color: 'error.main' }),
                    }}
                >
                    {shipping ? `- ${fCurrency(shipping)}` : '-'}
                </Box>
            </Stack>

            <Stack direction="row" sx={{ typography: 'subtitle1' }}>
                <Box>Total</Box>
                <Box sx={{ width: 160 }}>{fCurrency(totalAmount) || '-'}</Box>
            </Stack>
        </Stack>
    )

    return (
        <Card>
            <CardHeader title="Details" />

            <Stack
                sx={{
                    px: 3,
                }}
            >
                <Scrollbar>
                    {items.map((item) => (
                        <Stack
                            key={item.id}
                            direction="row"
                            alignItems="center"
                            sx={{
                                py: 3,
                                minWidth: 640,
                                borderBottom: (theme) =>
                                    `dashed 2px ${theme.palette.background.neutral}`,
                            }}
                        >
                            <Avatar
                                src={item.coverUrl}
                                variant="rounded"
                                sx={{ width: 48, height: 48, mr: 2 }}
                            />

                            <ListItemText
                                primary={item.name}
                                primaryTypographyProps={{
                                    typography: 'body2',
                                }}
                                secondaryTypographyProps={{
                                    component: 'span',
                                    color: 'text.disabled',
                                    mt: 0.5,
                                }}
                            />

                            <Box sx={{ typography: 'body2' }}>
                                x{item.quantity}
                            </Box>

                            <Box
                                sx={{
                                    width: 110,
                                    textAlign: 'right',
                                    typography: 'subtitle2',
                                }}
                            >
                                {fCurrency(item.price)}
                            </Box>
                        </Stack>
                    ))}
                </Scrollbar>

                {renderTotal}
            </Stack>
        </Card>
    )
}
