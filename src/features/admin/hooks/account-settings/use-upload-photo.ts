import { useMutation } from '@tanstack/react-query';
import uploadPhotoAction from '../../account-settings-action/upload-photo.action';

export default function useUploadPhoto() {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: uploadPhotoAction,
  });
  return { uploadPhotoAction: mutateAsync, isPending, error };
}
