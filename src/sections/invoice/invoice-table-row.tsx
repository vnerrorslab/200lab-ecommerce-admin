import {
    Avatar,
    Box,
    Button,
    Checkbox,
    IconButton,
    ListItemText,
    MenuItem,
    TableCell,
    TableRow,
    Tooltip,
} from '@mui/material'
import { ConfirmDialog } from 'src/components/custom-dialog'
import CustomPopover from 'src/components/custom-popover'
import usePopover from 'src/components/custom-popover/use-popover'
import Iconify from 'src/components/iconify'
import { useBoolean } from 'src/hooks/use-boolean'
import { IInvoiceItem } from 'src/types/invoice'

import { format } from 'date-fns'
import { fCurrency } from 'src/utils/format-number'
import InvoiceQuickEditForm from './invoice-quick-edit-form'

type Props = {
    row: IInvoiceItem
    selected: boolean
    onViewRow: VoidFunction
    onSelectRow: VoidFunction
    onDeleteRow: VoidFunction
}

export default function InvoiceTableRow({
    row,
    selected,
    onViewRow,
    onSelectRow,
    onDeleteRow,
}: Props) {
    const {
        invoiceNumber,
        createdAt,
        expiredAt,
        customer,
        totalQuantity,
        totalAmount,
    } = row

    const confirmBool = useBoolean()

    const popover = usePopover()

    const quickEdit = useBoolean()

    const renderPrimary = (
        <TableRow>
            {/* Select cell */}
            <TableCell padding="checkbox">
                <Checkbox checked={selected} onClick={onSelectRow} />
            </TableCell>

            {/* number cell */}
            <TableCell>
                <Box
                    onClick={onViewRow}
                    sx={{
                        cursor: 'pointer',
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    }}
                >
                    {invoiceNumber}
                </Box>
            </TableCell>

            {/* customer cell */}
            <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                    alt={customer.name}
                    src={customer.avatarUrl}
                    sx={{ mr: 2 }}
                />

                <ListItemText
                    primary={customer.name}
                    secondary={customer.email}
                    primaryTypographyProps={{ typography: 'body2' }}
                    secondaryTypographyProps={{
                        component: 'span',
                        color: 'text.disabled',
                    }}
                />
            </TableCell>
            {/* issue day cell */}
            <TableCell>
                <ListItemText
                    primary={format(new Date(createdAt), 'dd MMM yyyy')}
                    secondary={format(new Date(createdAt), 'p')}
                    primaryTypographyProps={{
                        typography: 'body2',
                        noWrap: true,
                    }}
                    secondaryTypographyProps={{
                        mt: 0.5,
                        component: 'span',
                        typography: 'caption',
                    }}
                />
            </TableCell>
            {/* expirer day cell  */}
            <TableCell>
                <ListItemText
                    primary={format(new Date(expiredAt), 'dd MMM yyyy')}
                    secondary={format(new Date(expiredAt), 'p')}
                    primaryTypographyProps={{
                        typography: 'body2',
                        noWrap: true,
                    }}
                    secondaryTypographyProps={{
                        mt: 0.5,
                        component: 'span',
                        typography: 'caption',
                    }}
                />
            </TableCell>

            {/* quantity cell */}
            <TableCell align="center"> {totalQuantity} </TableCell>

            {/* price cell */}
            <TableCell> {fCurrency(totalAmount)} </TableCell>

            {/* TODO: view more of this */}
            <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
                <Tooltip title="Quick Edit" placement="top" arrow>
                    <IconButton
                        color={quickEdit.value ? 'inherit' : 'default'}
                        onClick={quickEdit.onTrue}
                    >
                        <Iconify icon="solar:pen-bold" />
                    </IconButton>
                </Tooltip>
                <IconButton
                    color={popover.open ? 'inherit' : 'default'}
                    onClick={popover.onOpen}
                >
                    <Iconify icon="eva:more-vertical-fill" />
                </IconButton>
            </TableCell>
        </TableRow>
    )

    return (
        <>
            {renderPrimary}
            <InvoiceQuickEditForm
                currentInvoice={row}
                open={quickEdit.value}
                onClose={quickEdit.onFalse}
            />
            <CustomPopover
                open={popover.open}
                onClose={popover.onClose}
                arrow="right-top"
                sx={{ width: 140 }}
            >
                <MenuItem
                    onClick={() => {
                        confirmBool.onTrue()
                        popover.onClose()
                    }}
                    sx={{ color: 'error.main' }}
                >
                    <Iconify icon="solar:trash-bin-trash-bold" />
                    Delete
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        onViewRow()
                        popover.onClose()
                    }}
                >
                    <Iconify icon="solar:eye-bold" />
                    View
                </MenuItem>
            </CustomPopover>
            <ConfirmDialog
                open={confirmBool.value}
                onClose={confirmBool.onFalse}
                title="Delete"
                content="Are you sure want to delete?"
                action={
                    <Button
                        variant="contained"
                        color="error"
                        onClick={onDeleteRow}
                    >
                        Delete
                    </Button>
                }
            />
        </>
    )
}
