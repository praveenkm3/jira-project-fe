import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useIssueDelete } from '../hooks/issues.hook';
import type{ IssueDeleteDialogProps } from '../utils/issue.types';
import { toast } from 'react-toastify';


export function IssueDeleteDialog({
  open,
  selectedValue,
  issueId,
  projectId,
  onClose,
}: IssueDeleteDialogProps) {
    const {mutate:deleteIssue}=useIssueDelete(projectId);
  const handleDelete = ()=>{
    if(!issueId) return;
    deleteIssue(issueId,{
        onSuccess:()=>{
            toast.success("Issue Deleted");
        },
        onError:()=>{
            toast.error("Issue not deleted");
        }
    })
    onClose();
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Delete Issue</DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete the issue:
        </Typography>
        <Typography sx={{fontWeight:700}}>
          {selectedValue}
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          onClick={handleDelete}
          color="error"
          variant="contained"
        >
          Delete Issue
        </Button>
      </DialogActions>
    </Dialog>
  );
}