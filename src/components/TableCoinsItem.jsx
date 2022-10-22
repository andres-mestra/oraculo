import {
  Stack,
  IconButton,
  TableRow,
  TableCell,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import { distanceColor } from '../helpers/distanceUtils'
import { binanceFuture } from '../helpers/urls'

export function TableCoinsItem({ coin, type, isLong, onDelete }) {
  const { symbol, lastPrice } = coin
  const points = isLong ? coin.longPoints : coin.shortPoints

  const { entry, buyBack, distanceEntry, distanceBuyBack } = points
  const distanceEntryString = distanceEntry.toPrecision(3)
  const distanceBuyBackString = distanceBuyBack.toPrecision(3)

  const ratio = isLong
    ? (coin.shortPoints.entry - entry) / (entry - buyBack)
    : (entry - coin.longPoints.entry) / (buyBack - entry)

  const dColorEntry = distanceColor(distanceEntry, type)
  const dColorBuyBack = distanceColor(distanceBuyBack, type)
  const url = `${binanceFuture}/${symbol}`

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell scope="row">
        <Stack>
          <a target="_blank" href={url}>
            <Typography textTransform="uppercase">{symbol}</Typography>
          </a>
          <Typography variant="caption" color={ratio > 1.66 && '#d500f9'}>
            {ratio.toPrecision(3)}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell align="right">{lastPrice.toPrecision(7)}</TableCell>
      <TableCell align="right">{entry}</TableCell>
      <TableCell align="right">
        <Typography color={dColorEntry}>{distanceEntryString}</Typography>
      </TableCell>
      <TableCell align="right">{buyBack}</TableCell>
      {distanceEntry < 0 ? (
        <TableCell align="right">
          <Typography color={dColorBuyBack}>{distanceBuyBackString}</Typography>
        </TableCell>
      ) : (
        <TableCell />
      )}
      <TableCell align="right">
        <IconButton color="error" onClick={() => onDelete(symbol)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
