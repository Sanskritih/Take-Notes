import { useContext } from 'react';

import { Card, CardContent, CardActions, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ClearOutlined , DeleteOutlineOutlined as Delete} from '@mui/icons-material';

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

const Archive = ({ archive, handlePopUp }) => {

    const { pinnedNotes, setNotes, setPinnedNotes, setDeleteNotes } = useContext(DataContext);

    const unPinNote = (pin) => {
        const updatedNotes = pinnedNotes.filter(data => data.id !== pin.id);
        setPinnedNotes(updatedNotes);
        setNotes(prevArr => [pin, ...prevArr]);
    }

    const deleteNote = (pin) => {
        const updatedNotes = pinnedNotes.filter(data => data.id !== pin.id);
        setPinnedNotes(updatedNotes);
        setDeleteNotes(prevArr => [pin, ...prevArr]);
    }

    const switchPopUp = ()=>{
        handlePopUp(archive);
    }

    return (
        <StyledCard >
                <CardContent onClick={switchPopUp}>
                    <Typography>{archive.heading}</Typography>
                    <Typography>{archive.text}</Typography>
                </CardContent>
                <CardActions>
                    <ClearOutlined
                        fontSize="small" 
                        style={{ marginLeft: 'auto' }} 
                        onClick={() => unPinNote(archive)}
                    />
                    <Delete 
                        fontSize="small"
                        onClick={() => deleteNote(archive)}
                    />
                </CardActions>
        </StyledCard>
    )
}

export default Archive;