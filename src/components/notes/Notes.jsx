import React, { useContext, useState } from 'react';

import { Box, Grid, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { DataContext } from '../../context/DataProvider';
import { reorder } from '../../utils/common-utils';

//components
import Form from './Form';
import Note from './Note';
import EmptyNotes from './EmptyNotes';
import Archive from '../archives/Archive';
import { useEffect } from 'react';
import Pagination from '../Pagination';

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const Notes = () => {

    const { notes, setNotes, pinnedNotes, setPinnedNotes } = useContext(DataContext);
    
    const [currentPage,setCurrentPage] = useState(1);
    const [currentNotes, setCurrentNotes] = useState([]);
    const [currentPinnedNotes, setCurrentPinnedNotes] = useState([]);
    const [open, setOpen] = React.useState(false);
    let [selectedNote, setSelectedNote] = useState({});
    
    const handleClickOpen  = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);

        let newPinnedNotes = [];
        pinnedNotes.forEach(element => {
            if(element.id===selectedNote.id){
                newPinnedNotes.push(selectedNote);
            }
            else{
                newPinnedNotes.push(element);
            }
        });
        setPinnedNotes(newPinnedNotes);

        let newNotes = [];
        notes.forEach(element => {
            if(element.id===selectedNote.id){
                newNotes.push(selectedNote);
            }
            else{
                newNotes.push(element);
            }
        });
        setNotes(newNotes);
      };

      const descriptionElementRef = React.useRef(null);
      React.useEffect(() => {
        if (open) {
          const { current: descriptionElement } = descriptionElementRef;
          if (descriptionElement !== null) {
            descriptionElement.focus();
          }
        }
      }, [open]);

    React.useEffect(
        ()=>{
            let tempNotes = [];
            let i=0;
            pinnedNotes.forEach(element => {
                if(i>=currentPage*6-6 && i<=currentPage*6){
                    tempNotes.push(element);
                }
                i++;
            });
            setCurrentPinnedNotes(tempNotes);
            tempNotes = [];
            notes.forEach(element => {
                if(i>=currentPage*6-6 && i<currentPage*6){
                    tempNotes.push(element);
                }
                i++;
            });
            setCurrentNotes(tempNotes);
        },[notes,currentPage,pinnedNotes]
    );

    const handlePopUp = (note)=>{
        setSelectedNote(note);
        handleClickOpen();
    }
    
    const onTextChange = (e)=>{
        let newNote = {};
        newNote.id = selectedNote.id;
        newNote.heading = selectedNote.heading;
        newNote.tagline = selectedNote.tagline;
        newNote.text = selectedNote.text;
        if(e.target.name=='heading'){
            newNote.heading = e.target.value;
        }
        if(e.target.name=='text'){
            newNote.text = e.target.value;
        }
        if(e.target.name=='tagline'){
            newNote.tagline = e.target.value;
        }
        setSelectedNote(newNote);
    }
    
    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ p: 3, width: '100%' }}>
                <DrawerHeader />
                <Form />
                <Dialog
                  open={open}
                  onClose={handleClose}
                  scroll={'paper'}
                  aria-labelledby="scroll-dialog-title"
                  aria-describedby="scroll-dialog-description"
                >
                  <DialogTitle id="scroll-dialog-title">{
                    <TextField
                        placeholder="Title"
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        style={{ marginBottom: 10 }}
                        onChange={(e) => onTextChange(e)}
                        name='heading'
                        value={selectedNote.heading}
                    />}</DialogTitle>    
                  <DialogContent dividers={true}>
                    <TextField
                        placeholder="Take a note..."
                        multiline
                        maxRows={Infinity}
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        onChange={(e) => onTextChange(e)}
                        name='text'
                        value={selectedNote.text}
                    />
                  </DialogContent>
                  <DialogActions>
                  <TextField 
                        placeholder="Tagline"
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        style={{ marginBottom: 10 }}
                        onChange={(e) => onTextChange(e)}
                        name='tagline'
                        value={selectedNote.tagline}
                    />
                    <Button onClick={handleClose} color='success'>Save</Button>
                  </DialogActions>
                </Dialog>
                { currentNotes.length > 0 ? 
                            
                                <Grid container style={{ marginTop: 16}}>
                                {
                                    currentPinnedNotes.map(archive => (
                                        <Grid item>
                                            <Archive archive={archive} handlePopUp={handlePopUp}/>
                                        </Grid>
                                    ))
                                }
                                { currentNotes.map((note, index) => (
                                    <Grid item>
                                        <Note note={note} handlePopUp={handlePopUp}/>
                                    </Grid>))
                                }
                                </Grid>
                : <EmptyNotes /> }
                <Pagination totalPosts={pinnedNotes.length+notes.length} postsPerPage={6} setCurrentPage={setCurrentPage} currentPage={currentPage} />
            </Box>
            {/* {showPopUp && <h>hey this is popop</h>} */}
        </Box>
    )
}

export default Notes;