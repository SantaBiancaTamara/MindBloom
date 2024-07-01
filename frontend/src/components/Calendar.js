import * as React from 'react';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { DatePickerToolbar } from '@mui/x-date-pickers/DatePicker';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function CustomToolbar(props) {
  return (
    <Box
      className={props.className}
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
    >
      <DatePickerToolbar {...props} />
      <RocketLaunchIcon fontSize="large" sx={{ m: 5 }} />
    </Box>
  );
}

export default function Calendar() {
  const [selectedDate, setSelecteddate] = React.useState(dayjs());
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log('Calendar component mounted');
  }, []);

  const handleDataChange = (newValue) => {
    setSelecteddate(newValue);
    localStorage.setItem("date", newValue.toISOString()); 
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleSeeDayEntries = () => {
    navigate(`/entries/${selectedDate.format('YYYY-MM-DD')}`);
    setOpen(false);
  }

  const handleJournal = () => {
    navigate('/journal', { state: { selectedDate } });
    setOpen(false);
  }

  const handleNote = () => {
    navigate('/note', { state: { selectedDate } });
    setOpen(false);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        openTo="day"
        value={selectedDate}
        onChange={handleDataChange}
        defaultValue={dayjs()}
        slots={{
          toolbar: CustomToolbar,
        }}
        slotProps={{
          toolbar: {
            toolbarFormat: 'YYYY',
            toolbarPlaceholder: '??',
          },
        }}
        sx={{
          '& .MuiPickersDay-root': {
            color: 'black', // default text color for days
          },
          '& .Mui-selected': {
            backgroundColor: 'blue', // selected day background color
          },
          '& .MuiPickersDay-today': {
            borderColor: 'red', // border color for today's date
          },
          '& .MuiPickersDay-root:not(.Mui-selected)': {
            '&.MuiPickersDay-dayOutsideMonth': {
              color: 'gray', // color for days outside the current month
            },
          },
        }}
      />
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Select an option</DialogTitle>
        <DialogActions>
          <Button onClick={handleSeeDayEntries}>See Day Entries</Button>
          <Button onClick={handleJournal}>Journal</Button>
          <Button onClick={handleNote}>Note</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}
