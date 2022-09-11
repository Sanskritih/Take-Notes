import { useContext } from 'react';

import { Card, CardContent, CardActions, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArchiveOutlined as Archive, DeleteOutlineOutlined as Delete, PinDropSharp, PushPinOutlined as Pin  } from '@mui/icons-material';

import { DataContext } from '../../context/DataProvider';

const StyledCard = styled(Card)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 400px;
    height: 200px;
    margin: 8px;
    margin-left:2rem;
    border: #bcf79a solid 2px;
    background-color: white;
    box-shadow: black 5px;
`

const Note = ({ note, handlePopUp }) => {

    const { notes, setNotes, setPinnedNotes, setDeleteNotes } = useContext(DataContext);

    const pinNote = (note) => {
        const updatedNotes = notes.filter(data => data.id !== note.id);
        setNotes(updatedNotes);
        setPinnedNotes(prevArr => [note, ...prevArr]);
    }

    const deleteNote = (note) => {
        const updatedNotes = notes.filter(data => data.id !== note.id);
        setNotes(updatedNotes);
        setDeleteNotes(prevArr => [note, ...prevArr]);
    }

    const switchPopUp = ()=>{
        handlePopUp(note);
    }

    return (
        <StyledCard >
                <CardContent onClick={switchPopUp}>
                    <Typography>{note.heading}</Typography>
                    <Typography>{note.text}</Typography>
                </CardContent>
                <CardActions>
                    <Typography>{note.tagline}</Typography>
                    <Pin
                        fontSize="small" 
                        style={{ marginLeft: 'auto' }} 
                        onClick={() => pinNote(note)}
                    />
                    <Delete 
                        fontSize="small"
                        onClick={() => deleteNote(note)}
                    />
                </CardActions>
        </StyledCard>
    )
}

export default Note;