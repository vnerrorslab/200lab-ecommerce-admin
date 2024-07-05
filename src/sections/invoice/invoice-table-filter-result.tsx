import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { Stack, StackProps } from "@mui/system";
import { shortDateLabel } from "src/components/custom-date-range-picker/utils";
import Iconify from "src/components/iconify/iconify";
import { typography } from "src/theme/overrides/components/typography";
import { IInvoiceTableFilters, IInvoiceTableFilterValue } from "src/types/invoice";

type Props = StackProps & {
    filters: IInvoiceTableFilters
    onFilters: (name: string, value: IInvoiceTableFilterValue)=> void
    onResetFilters: VoidFunction
    results: number
}

export default function InvoiceTableFilterResult({filters,onFilters,onResetFilters,results,...other}:Props){
    const shortLabel = shortDateLabel(filters.startDate, filters.endDate)
    const handleRemoveDate = () => {
        onFilters('startDate', null)
        onFilters('endDate', null)
    }

   return (
    <Stack spacing={1.5} {...other}>
        <Box sx={{typography:'body2'}}>
            <strong>
                {results}
            </strong>
            <Box component= "span" sx={{color:"text.secondary",ml:0.25}}>
                results found
            </Box>
        </Box>
        <Stack
            flexGrow={1}
            spacing={1}
            direction='row'
            flexWrap='wrap'
            alignItems='center'
        >
              {filters.startDate && filters.endDate && (
                    <Block label="Date:">
                        <Chip
                            size="small"
                            label={shortLabel}
                            onDelete={handleRemoveDate}
                        />
                    </Block>
                )}

                <Button
                    color="error"
                    onClick={onResetFilters}
                    startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                >
                    Clear
                </Button>
        </Stack>
    </Stack>
   )
}


// TODO: [explore]
type BlockProps = StackProps & {
    label: string
}

function Block({ label, children, sx, ...other }: BlockProps) {
    return (
        <Stack
            component={Paper}
            variant="outlined"
            spacing={1}
            direction="row"
            sx={{
                p: 1,
                borderRadius: 1,
                overflow: 'hidden',
                borderStyle: 'dashed',
                ...sx,
            }}
            {...other}
        >
            <Box component="span" sx={{ typography: 'subtitle2' }}>
                {label}
            </Box>

            <Stack spacing={1} direction="row" flexWrap="wrap">
                {children}
            </Stack>
        </Stack>
    )
}