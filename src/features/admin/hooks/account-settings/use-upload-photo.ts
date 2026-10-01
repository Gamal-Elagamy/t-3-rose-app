import uploadPhotoAction from '@/features/account-settings/actions/upload-photo.action';
import { useMutation } from '@tanstack/react-query';

export default function useUploadPhoto() {
  const { mutateAsync, isPending, error } = useMutation({
    mutationFn: uploadPhotoAction,
  });
  return { uploadPhotoAction: mutateAsync, isPending, error };
}
