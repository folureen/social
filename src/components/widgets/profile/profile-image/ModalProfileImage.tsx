import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button,
} from '@mui/material';
import useDatabase from 'hooks/useDatabase/useDatabase';
import { Dispatch, SetStateAction, useState } from 'react';

type Props = {
    changeImageOpen: boolean;
    setChangeImageOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalProfileImage: React.FC<Props> = ({ changeImageOpen, setChangeImageOpen }) => {
    const [url, setUrl] = useState('');

    const { updateProfilePicture } = useDatabase();

    const handleChangeUrl: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (
        e
    ) => {
        setUrl(e.target.value);
    };

    const handleSaveURLtoPicture = () => {
        updateProfilePicture(url);
    };

    return (
        <Dialog open={changeImageOpen} onClose={() => setChangeImageOpen(false)}>
            <DialogTitle>Аватар</DialogTitle>
            <DialogContent>
                <DialogContentText>Укажите ссылку на фотографию для профиля</DialogContentText>
                <TextField
                    autoFocus
                    margin='dense'
                    id='name'
                    label='URL'
                    type='url'
                    fullWidth
                    variant='standard'
                    value={url}
                    onChange={handleChangeUrl}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setChangeImageOpen(false)}>Отменить</Button>
                <Button onClick={handleSaveURLtoPicture}>Сохранить</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalProfileImage;
