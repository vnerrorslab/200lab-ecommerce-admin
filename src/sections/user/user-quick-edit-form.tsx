import * as Yup from 'yup'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import MenuItem from '@mui/material/MenuItem'
import LoadingButton from '@mui/lab/LoadingButton'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'

import { USER_STATUS_OPTIONS } from 'src/_mock'

import { useSnackbar } from 'src/components/snackbar'
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form'

import { IUserItem } from 'src/types/user'

// ----------------------------------------------------------------------

type Props = {
    open: boolean
    onClose: VoidFunction
    currentUser?: IUserItem
}

export default function UserQuickEditForm({
    currentUser,
    open,
    onClose,
}: Props) {
    const { enqueueSnackbar } = useSnackbar()

    const NewUserSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
            .required('Email is required')
            .email('Email must be a valid email address'),
        phoneNumber: Yup.string().required('Phone number is required'),
        address: Yup.string().required('Address is required'),
        role: Yup.string().required('Role is required'),
    })

    const defaultValues = useMemo(
        () => ({
            name: currentUser?.name || '',
            email: currentUser?.email || '',
            phoneNumber: currentUser?.phoneNumber || '',
            address: currentUser?.address || '',
            status: currentUser?.status,
            role: currentUser?.role || '',
        }),
        [currentUser]
    )

    const methods = useForm({
        resolver: yupResolver(NewUserSchema),
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
                    <Alert variant="outlined" severity="info" sx={{ mb: 3 }}>
                        Account is waiting for confirmation
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
                        <RHFSelect name="status" label="Status">
                            {USER_STATUS_OPTIONS.map((status) => (
                                <MenuItem
                                    key={status.value}
                                    value={status.value}
                                >
                                    {status.label}
                                </MenuItem>
                            ))}
                        </RHFSelect>

                        <Box sx={{ display: { xs: 'none', sm: 'block' } }} />

                        <RHFTextField name="name" label="Full Name" />
                        <RHFTextField name="email" label="Email Address" />
                        <RHFTextField name="phoneNumber" label="Phone Number" />
                        <RHFTextField name="address" label="Address" />
                        <RHFTextField name="company" label="Company" />
                        <RHFTextField name="role" label="Role" />
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
