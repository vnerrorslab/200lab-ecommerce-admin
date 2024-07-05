import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputAdornment,
} from '@mui/material'
import { Box } from '@mui/system'
import { DatePicker } from '@mui/x-date-pickers'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { RHFTextField } from 'src/components/hook-form'
import FormProvider from 'src/components/hook-form/form-provider'
import { useSnackbar } from 'src/components/snackbar'
import { IInvoiceItem } from 'src/types/invoice'
import * as Yup from 'yup'

type Props = {
    open: boolean
    onClose: VoidFunction
    currentInvoice?: IInvoiceItem
}

export default function InvoiceQuickEditForm({
    currentInvoice,
    open,
    onClose,
}: Props) {
    const { enqueueSnackbar } = useSnackbar()

    const NewInvoiceSchema = Yup.object().shape({
        invoiceNumber: Yup.string().required('Invoice number is required'),
        name: Yup.string().required('Name is required'),
        createAt: Yup.date(),
        expiredAt: Yup.date(),
        quantity: Yup.number()
            .moreThan(0, 'Quantity must by greater than 0')
            .required('Quantity is required'),
        price: Yup.number().moreThan(0, 'Price should not be $0.00'),
    })

    const defaultValues = useMemo(
        () => ({
            invoiceNumber: currentInvoice?.invoiceNumber || '',
            name: currentInvoice?.customer.name || '',
            createAt: currentInvoice?.createdAt || new Date(),
            expiredAt: currentInvoice?.expiredAt || new Date(),
            quantity: currentInvoice?.totalQuantity || 0,
            price: currentInvoice?.totalAmount || 0,
        }),
        [currentInvoice]
    )

    const methods = useForm({
        resolver: yupResolver(NewInvoiceSchema),
        defaultValues,
    })

    const {
        reset,
        handleSubmit,
        formState: { isSubmitting },
    } = methods

    const onSubmit = handleSubmit(async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500))
            reset()
            onClose()
            enqueueSnackbar('Update success!')
            console.info('DATA', data)
        } catch (error) {
            console.error(error)
        }
    })

    return (
        <Dialog
            fullWidth
            maxWidth={false}
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: { maxWidth: 720 },
            }}
        >
            <FormProvider methods={methods} onSubmit={onSubmit}>
                <DialogTitle>Quick Update</DialogTitle>
                <DialogContent>
                    <Alert variant="outlined" severity="warning" sx={{ mb: 3 }}>
                        This Invoice is Expired
                    </Alert>
                    <Box
                        rowGap={3}
                        columnGap={2}
                        display="grid"
                        gridTemplateColumns={{
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                        }}
                    >
                        <RHFTextField
                            name="invoiceNumber"
                            label="Invoice Number"
                        />
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }} />
                        <DatePicker
                            name="createAt"
                            label="Creation Date"
                            value={currentInvoice?.createdAt}
                            onChange={() => {}}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                },
                            }}
                        />
                        <DatePicker
                            name="expiredAt"
                            label="Expiration Date"
                            value={currentInvoice?.expiredAt}
                            onChange={() => {}}
                            slotProps={{ textField: { fullWidth: true } }}
                        />
                        <RHFTextField
                            name="quantity"
                            label="Total Quantity"
                            placeholder="0"
                            type="number"
                            InputLabelProps={{ shrink: true }}
                        />
                        <RHFTextField
                            name="price"
                            label="Regular Price"
                            placeholder="0.00"
                            type="number"
                            InputLabelProps={{ shrink: true }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Box
                                            component="span"
                                            sx={{ color: 'text.disabled' }}
                                        >
                                            $
                                        </Box>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>

                    <LoadingButton
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                    >
                        Update
                    </LoadingButton>
                </DialogActions>
            </FormProvider>
        </Dialog>
    )
}
