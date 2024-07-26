'use client'

import { useState, useCallback } from 'react'

import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Container from '@mui/material/Container'
import TableBody from '@mui/material/TableBody'
import IconButton from '@mui/material/IconButton'
import TableContainer from '@mui/material/TableContainer'

import { paths } from 'src/routes/paths'
import { useRouter } from 'src/routes/hooks'
import { useBoolean } from 'src/hooks/use-boolean'

import Iconify from 'src/components/iconify'
import Scrollbar from 'src/components/scrollbar'
import { ConfirmDialog } from 'src/components/custom-dialog'
import { useSettingsContext } from 'src/components/settings'
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs'
import {
    useTable,
    emptyRows,
    TableNoData,
    getComparator,
    TableEmptyRows,
    TableHeadCustom,
    TableSelectedAction,
    TablePaginationCustom,
} from 'src/components/table'
import {
    IInvoiceItem,
    IInvoiceTableFilters,
    IInvoiceTableFilterValue,
} from 'src/types/invoice'

//TODO: import mockdata
import { _invoices } from 'src/_mock'

import { fTimestamp } from 'src/utils/format-time'
import InvoiceTableToolbar from '../invoice-table-toolbar'
import InvoiceTableFilterResult from '../invoice-table-filter-result'
import InvoiceTableRow from '../invoice-table-row'

const TABLE_HEAD = [
    { id: 'invoiceNumber', label: 'Invoice', width: 116 },
    { id: 'name', label: 'Customer' },
    { id: 'createdAt', label: 'Issued time', width: 140 },
    { id: 'expiredAt', label: 'Due time', width: 140 },
    { id: 'totalQuantity', label: 'Items', width: 120, align: 'center' },
    { id: 'totalAmount', label: 'Price', width: 140 },
    { id: '', width: 88 },
]

const defaultFilters: IInvoiceTableFilters = {
    invoiceNumber: '',
    name: '',
    startDate: null,
    endDate: null,
}

export default function InvoiceListView() {
    const table = useTable({ defaultOrderBy: 'invoiceNumber' })

    const settings = useSettingsContext()

    const router = useRouter()

    const confirm = useBoolean()
    const [tableData, setTableData] = useState(_invoices)
    const [filters, setFilters] = useState(defaultFilters)
    const isDateError =
        filters.startDate && filters.endDate
            ? filters.startDate.getTime() > filters.endDate.getTime()
            : false
    const dataFiltered = applyFilter({
        inputData: tableData,
        comparator: getComparator(table.order, table.orderBy),
        filters,
        isDateError,
    })

    const dataInPage = dataFiltered.slice(
        table.page * table.rowsPerPage,
        table.page * table.rowsPerPage + table.rowsPerPage
    )

    const denseHeight = table.dense ? 52 : 72

    const canReset =
        !!filters.name ||
        !!filters.invoiceNumber ||
        (!!filters.endDate && !!filters.startDate)

    const isNotFound =
        (!dataFiltered.length && canReset) || !dataFiltered.length

    const handleFilters = useCallback(
        (name: string, value: IInvoiceTableFilterValue) => {
            table.onResetPage()
            setFilters((prev) => ({ ...prev, [name]: value }))
        },
        [table]
    )

    const handleResetFilters = useCallback(() => {
        setFilters(defaultFilters)
    }, [])

    const handleDeleteRow = useCallback(
        (id: string) => {
            const updatedData = tableData.filter((r) => r.id !== id)
            setTableData(updatedData)
            table.onUpdatePageDeleteRow(dataInPage.length)
        },
        [dataInPage.length, table, tableData]
    )

    const handleDeleteRows = useCallback(() => {
        const updateData = tableData.filter(
            (r) => !table.selected.includes(r.id)
        )
        setTableData(updateData)

        table.onUpdatePageDeleteRows({
            totalRows: tableData.length,
            totalRowsInPage: dataInPage.length,
            totalRowsFiltered: dataFiltered.length,
        })
    }, [dataFiltered.length, dataInPage.length, table, tableData])

    const handleViewRow = useCallback(
        (id: string) => {
            router.push(paths.dashboard.invoice.details(id))
        },
        [router]
    )

    return (
        <>
            <Container maxWidth={settings.themeStretch ? false : 'lg'}>
                {/* TODO: explore this */}
                <CustomBreadcrumbs
                    heading="List"
                    links={[
                        {
                            name: 'Dashboard',
                            href: paths.dashboard.root,
                        },
                        {
                            name: 'Invoice',
                            href: paths.dashboard.invoice.root,
                        },
                        { name: 'List' },
                    ]}
                    sx={{
                        mb: { xs: 3, md: 5 },
                    }}
                />
                <Card>
                    <InvoiceTableToolbar
                        filters={filters}
                        onFilters={handleFilters}
                        canReset={canReset}
                        onResetFilters={handleResetFilters}
                    />
                    {canReset && (
                        // TODO:
                        <InvoiceTableFilterResult
                            filters={filters}
                            onFilters={handleFilters}
                            onResetFilters={handleResetFilters}
                            results={dataFiltered.length}
                            sx={{ p: 2.5, pt: 0 }}
                        />
                    )}
                    <TableContainer
                        sx={{ position: 'relative', overflow: 'unset' }}
                    >
                        <TableSelectedAction
                            dense={table.dense}
                            numSelected={table.selected.length}
                            rowCount={tableData.length}
                            onSelectAllRows={(checked) => {
                                table.onSelectAllRows(
                                    checked,
                                    tableData.map((row) => row.id)
                                )
                            }}
                            action={
                                <Tooltip title="Delete">
                                    <IconButton
                                        color="primary"
                                        onClick={confirm.onTrue}
                                    >
                                        <Iconify icon="solar:trash-bin-trash-bold" />
                                    </IconButton>
                                </Tooltip>
                            }
                        />

                        <Scrollbar>
                            <Table>
                                <TableHeadCustom
                                    order={table.order}
                                    orderBy={table.orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={tableData.length}
                                    numSelected={table.selected.length}
                                    onSort={table.onSort}
                                    onSelectAllRows={(checked) =>
                                        table.onSelectAllRows(
                                            checked,
                                            tableData.map((row) => row.id)
                                        )
                                    }
                                />
                                <TableBody>
                                    {dataInPage.map((row) => (
                                        <InvoiceTableRow
                                            key={row.id}
                                            row={row}
                                            selected={table.selected.includes(
                                                row.id
                                            )}
                                            onSelectRow={() =>
                                                table.onSelectRow(row.id)
                                            }
                                            onDeleteRow={() =>
                                                handleDeleteRow(row.id)
                                            }
                                            onViewRow={() =>
                                                handleViewRow(row.id)
                                            }
                                        />
                                    ))}
                                    <TableEmptyRows
                                        height={denseHeight}
                                        emptyRows={emptyRows(
                                            table.page,
                                            table.rowsPerPage,
                                            tableData.length
                                        )}
                                    />
                                    <TableNoData notFound={isNotFound} />
                                </TableBody>
                            </Table>
                        </Scrollbar>
                    </TableContainer>
                    <TablePaginationCustom
                        count={dataFiltered.length}
                        page={table.page}
                        rowsPerPage={table.rowsPerPage}
                        onPageChange={table.onChangePage}
                        onRowsPerPageChange={table.onChangeRowsPerPage}
                        dense={table.dense}
                        onChangeDense={table.onChangeDense}
                    />
                </Card>
            </Container>
            <ConfirmDialog
                open={confirm.value}
                onClose={confirm.onFalse}
                title="Delete"
                action={
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            handleDeleteRows()
                            confirm.onFalse()
                        }}
                    >
                        Delete
                    </Button>
                }
                content={
                    <>
                        Are you sure want to delete {'  '}
                        <strong> {table.selected.length}</strong> items?
                    </>
                }
            />
        </>
    )
}

// ----------------------------------

function applyFilter({
    inputData,
    comparator,
    filters,
    isDateError,
}: {
    inputData: IInvoiceItem[]
    comparator: (a: any, b: any) => number
    filters: IInvoiceTableFilters
    isDateError: boolean
}) {
    const { invoiceNumber, name, startDate, endDate } = filters

    const stabilizedThis = inputData.map((el, index) => [el, index] as const)

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })

    inputData = stabilizedThis.map((el) => el[0])

    if (name) {
        inputData = inputData.filter(
            (invoice) =>
                invoice.invoiceNumber
                    .toLowerCase()
                    .indexOf(name.toLowerCase()) !== -1 ||
                invoice.customer.name
                    .toLowerCase()
                    .indexOf(name.toLowerCase()) !== -1 ||
                invoice.customer.email.toLowerCase().indexOf(name) !== -1
        )
    }

    if (invoiceNumber) {
        inputData = inputData.filter(
            (invoice) => invoice.invoiceNumber === invoiceNumber
        )
    }

    if (!isDateError) {
        if (startDate && endDate) {
            inputData = inputData.filter(
                (invoiceNumber) =>
                    fTimestamp(invoiceNumber.createdAt) >=
                        fTimestamp(startDate) &&
                    fTimestamp(invoiceNumber.createdAt) <= fTimestamp(endDate)
            )
        }
    }
    return inputData
}
