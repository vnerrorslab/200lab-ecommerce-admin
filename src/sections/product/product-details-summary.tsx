import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'

import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Rating from '@mui/material/Rating'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { formHelperTextClasses } from '@mui/material/FormHelperText'

import { fCurrency } from 'src/utils/format-number'

import Label from 'src/components/label'
import Iconify from 'src/components/iconify'
import { ColorPicker } from 'src/components/color-utils'
import FormProvider, { RHFSelect } from 'src/components/hook-form'

import { IProductItem } from 'src/types/product'

import IncrementerButton from './common/incrementer-button'

// ----------------------------------------------------------------------

type Props = {
    product: IProductItem
}

export default function ProductDetailsSummary({ product, ...other }: Props) {
    const {
        id,
        name,
        sizes,
        price,
        coverUrl,
        colors,
        newLabel,
        available,
        priceSale,
        saleLabel,
        inventoryType,
        subDescription,
    } = product

    const defaultValues = {
        id,
        name,
        coverUrl,
        available,
        price,
        colors: colors[0],
        size: sizes[4],
        quantity: available < 1 ? 0 : 1,
    }

    const methods = useForm({
        defaultValues,
    })

    const { reset, watch, control, setValue, handleSubmit } = methods

    const values = watch()

    useEffect(() => {
        if (product) {
            reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [product])

    const renderPrice = (
        <Box sx={{ typography: 'h5' }}>
            {priceSale && (
                <Box
                    component="span"
                    sx={{
                        color: 'text.disabled',
                        textDecoration: 'line-through',
                        mr: 0.5,
                    }}
                >
                    {fCurrency(priceSale)}
                </Box>
            )}

            {fCurrency(price)}
        </Box>
    )

    const renderColorOptions = (
        <Stack direction="row">
            <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
                Color
            </Typography>

            <Controller
                name="colors"
                control={control}
                render={({ field }) => (
                    <ColorPicker
                        colors={colors}
                        selected={field.value}
                        onSelectColor={(color) =>
                            field.onChange(color as string)
                        }
                        limit={4}
                    />
                )}
            />
        </Stack>
    )

    const renderSizeOptions = (
        <Stack direction="row">
            <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
                Size
            </Typography>

            <RHFSelect
                name="size"
                size="small"
                helperText={
                    <Link underline="always" color="textPrimary">
                        Size Chart
                    </Link>
                }
                sx={{
                    maxWidth: 88,
                    [`& .${formHelperTextClasses.root}`]: {
                        mx: 0,
                        mt: 1,
                        textAlign: 'right',
                    },
                }}
            >
                {sizes.map((size) => (
                    <MenuItem key={size} value={size}>
                        {size}
                    </MenuItem>
                ))}
            </RHFSelect>
        </Stack>
    )

    const renderQuantity = (
        <Stack direction="row">
            <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
                Quantity
            </Typography>

            <Stack spacing={1}>
                <IncrementerButton
                    name="quantity"
                    quantity={values.quantity}
                    disabledDecrease={values.quantity <= 1}
                    disabledIncrease={values.quantity >= available}
                    onIncrease={() => setValue('quantity', values.quantity + 1)}
                    onDecrease={() => setValue('quantity', values.quantity - 1)}
                />

                <Typography
                    variant="caption"
                    component="div"
                    sx={{ textAlign: 'right' }}
                >
                    Available: {available}
                </Typography>
            </Stack>
        </Stack>
    )

    const renderActions = (
        <Stack direction="row" spacing={2}>
            <Button
                fullWidth
                disabled
                size="large"
                color="warning"
                variant="contained"
                startIcon={<Iconify icon="solar:cart-plus-bold" width={24} />}
                sx={{ whiteSpace: 'nowrap' }}
            >
                Add to Cart
            </Button>

            <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                disabled
            >
                Buy Now
            </Button>
        </Stack>
    )

    const renderSubDescription = (
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {subDescription}
        </Typography>
    )

    const renderRating = (
        <Stack
            direction="row"
            alignItems="center"
            sx={{
                color: 'text.disabled',
                typography: 'body2',
            }}
        >
            <Rating
                size="small"
                value={5}
                precision={0.1}
                readOnly
                sx={{ mr: 1 }}
            />
        </Stack>
    )

    const renderLabels = (newLabel.enabled || saleLabel.enabled) && (
        <Stack direction="row" alignItems="center" spacing={1}>
            {newLabel.enabled && <Label color="info">{newLabel.content}</Label>}
            {saleLabel.enabled && (
                <Label color="error">{saleLabel.content}</Label>
            )}
        </Stack>
    )

    const renderInventoryType = (
        <Box
            component="span"
            sx={{
                typography: 'overline',
                color:
                    (inventoryType === 'out of stock' && 'error.main') ||
                    (inventoryType === 'low stock' && 'warning.main') ||
                    'success.main',
            }}
        >
            {inventoryType}
        </Box>
    )

    return (
        <FormProvider methods={methods} onSubmit={() => {}}>
            <Stack spacing={3} sx={{ pt: 3 }} {...other}>
                <Stack spacing={2} alignItems="flex-start">
                    {renderLabels}

                    {renderInventoryType}

                    <Typography variant="h5">{name}</Typography>

                    {renderRating}

                    {renderPrice}

                    {renderSubDescription}
                </Stack>

                <Divider sx={{ borderStyle: 'dashed' }} />

                {renderColorOptions}

                {renderSizeOptions}

                {renderQuantity}

                <Divider sx={{ borderStyle: 'dashed' }} />

                {renderActions}
            </Stack>
        </FormProvider>
    )
}
