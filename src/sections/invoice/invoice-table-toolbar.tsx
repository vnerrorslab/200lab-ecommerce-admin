import Stack from '@mui/material/Stack'
import { DatePicker } from '@mui/x-date-pickers'
import React, { useCallback } from 'react'
import { IInvoiceTableFilters } from 'src/types/invoice'
import { IOrderTableFilterValue } from 'src/types/order'
import CustomPopover, { usePopover } from 'src/components/custom-popover'
import { Button, IconButton, InputAdornment, MenuItem, TextField } from '@mui/material'
import Iconify from 'src/components/iconify/iconify'

type Props = {
    filters: IInvoiceTableFilters
    onFilters: (name: string, value: IOrderTableFilterValue) => void
    canReset: boolean
    onResetFilters: VoidFunction
}

export default function InvoiceTableToolbar(props: Props) {
    const popover = usePopover()
    const handleFilterName = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            props.onFilters('name', event.target.value)
        },
        [props.onFilters]
    )
    const handleFilterStartDate = useCallback(
        (newValue: Date | null) => {
            props.onFilters('startDate', newValue)
        },
        [props.onFilters]
    )
    const handleFilterEndDate = useCallback(
        (newValue: Date | null) => {
            props.onFilters('endDate', newValue)
        },
        [props.onFilters]
    )

    return (
        <>
            <Stack
                spacing={2}
                alignItems={{ xs: 'flex-end', md: 'center' }}
                direction={{ xs: 'column', md: 'row' }}
                sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
            >
                <DatePicker
                    label="Start date"
                    value={props.filters.startDate}
                    onChange={handleFilterStartDate}
                    slotProps={{
                        textField: {
                            fullWidth: true,
                        },
                    }}
                    sx={{ maxWidth: { md: 200 } }}
                />

                <DatePicker
                    label="End date"
                    value={props.filters.endDate}
                    onChange={handleFilterEndDate}
                    slotProps={{ textField: { fullWidth: true } }}
                    sx={{
                        maxWidth: { md: 200 },
                    }}
                />

                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    flexGrow={1}
                    sx={{ width: 1 }}
                >
                    <TextField
                        fullWidth
                        value={props.filters.name}
                        onChange={handleFilterName}
                        placeholder="Search customer or order number..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Iconify
                                        icon="eva:search-fill"
                                        sx={{ color: 'text.disabled' }}
                                    />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <IconButton onClick={popover.onOpen}>
                        <Iconify icon="eva:more-vertical-fill" />
                    </IconButton>
                </Stack>
                {props.canReset && (
                    <Button
                        color="error"
                        sx={{ flexShrink: 0 }}
                        onClick={props.onResetFilters}
                        startIcon={
                            <Iconify icon="solar:trash-bin-trash-bold" />
                        }
                    >
                        Clear
                    </Button>
                )}
            </Stack>

            <CustomPopover open={popover.open}onClose={popover.onClose} arrow='right-top' sx={{width:140}}>
                <MenuItem onClick={()=>{popover.onClose}}>
                <Iconify icon="solar:printer-minimalistic-bold" />
                    Print
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        popover.onClose()
                    }}
                >
                    <Iconify icon="solar:import-bold" />
                    Import
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        popover.onClose()
                    }}
                >
                    <Iconify icon="solar:export-bold" />
                    Export
                </MenuItem>

            </CustomPopover>
        </>
    )
}
