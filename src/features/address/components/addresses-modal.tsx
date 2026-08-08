'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';

import { IAddress } from '../types/address';
import { useDeleteAddress } from '../hooks/use-delete-address';

import { Trash2, X } from 'lucide-react';

import { AddressList } from './address-list';
import AddressStepper from './address-stepper';
import AddAddressDialog from './add-address-dialog';

import { cn } from '@/shared/lib/utils/tailwind-cn';

type View = 'list' | 'add' | 'edit';

interface AddressesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  addresses: IAddress[];
}

export default function AddressesModal({ open, onOpenChange, addresses }: AddressesModalProps) {
  const t = useTranslations('address');
  const router = useRouter();

  const [view, setView] = useState<View>('list');

  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);

  const [addressToDelete, setAddressToDelete] = useState<IAddress | null>(null);

  /*
   * Keep track of addresses deleted locally while
   * waiting for the refreshed server data.
   */
  const [deletedAddressIds, setDeletedAddressIds] = useState<string[]>([]);

  const deleteAddressMutation = useDeleteAddress();

  /*
   * Same behavior as the old localAddresses state:
   * deleted addresses disappear immediately from the UI.
   */
  const localAddresses = addresses.filter((address) => !deletedAddressIds.includes(address.id));

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleAdd = () => {
    setSelectedAddress(null);
    setView('add');
  };

  const handleEdit = (address: IAddress) => {
    setSelectedAddress(address);
    setView('edit');
  };

  const handleDelete = (address: IAddress) => {
    setAddressToDelete(address);
  };

  const handleCancelDelete = () => {
    if (deleteAddressMutation.isPending) return;

    setAddressToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (!addressToDelete) return;

    deleteAddressMutation.mutate(addressToDelete.id, {
      onSuccess: () => {
        toast.success(t('deleted'));

        /*
         * Remove the address immediately from the UI
         * without waiting for router.refresh().
         */
        setDeletedAddressIds((prev) => [...prev, addressToDelete.id]);

        setAddressToDelete(null);

        router.refresh();
      },

      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const isListView = view === 'list';
  const isFormView = view === 'add' || view === 'edit';

  return (
    <>
      {/* Main Addresses Modal */}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          showCloseButton={false}
          className={cn(
            'w-[calc(100%-32px)] max-w-[850px] gap-0 overflow-hidden rounded-2xl bg-white p-0 ring-0'
          )}
        >
          {isListView && (
            <>
              {/* Header */}
              <DialogHeader
                className="
                  flex
                  flex-row
                  items-center
                  justify-between
                  px-6
                  py-5
                "
              >
                <DialogTitle className="text-[26px] font-bold leading-none">
                  {t('modal.title')}
                </DialogTitle>

                <Button
                  type="button"
                  onClick={handleAdd}
                  className="
                    rounded-lg
                    bg-red-50
                    px-5
                    text-sm
                    font-medium
                    text-red-700
                    shadow-none
                    hover:bg-red-100
                    dark:bg-red-950/30
                    dark:text-red-400
                    dark:hover:bg-red-950/50
                  "
                >
                  {t('add.title')}
                </Button>
              </DialogHeader>

              {/* Address List */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <AddressList
                  variant="modal"
                  addresses={localAddresses}
                  onAdd={handleAdd}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            </>
          )}

          {isFormView && (
            <>
              {/* Form Header */}
              <DialogHeader
                className="
                  flex
                  flex-row
                  items-center
                  justify-between
                  border-b
                  border-ds-border-subtle
                  px-6
                  py-5
                "
              >
                <DialogTitle className="text-[26px] font-bold leading-none">
                  {view === 'add' ? t('add.title') : t('edit')}
                </DialogTitle>
              </DialogHeader>

              {/* Form Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <AddressStepper
                  steps={[
                    {
                      step: 1,
                      title: t('add.step1Title'),
                    },
                    {
                      step: 2,
                      title: t('add.step2Title'),
                    },
                  ]}
                >
                  <AddAddressDialog mode={view} address={selectedAddress} onClose={handleClose} />
                </AddressStepper>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={!!addressToDelete}
        onOpenChange={(isOpen) => {
          if (!isOpen && !deleteAddressMutation.isPending) {
            setAddressToDelete(null);
          }
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="
            w-[calc(100%-32px)]
            max-w-[332px]
            gap-0
            overflow-hidden
            rounded-xl
            bg-white
            p-0
          "
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={handleCancelDelete}
            disabled={deleteAddressMutation.isPending}
            aria-label="Close"
            className="
              absolute
              right-4
              top-4
              z-10
              flex
              h-6
              w-6
              items-center
              justify-center
              rounded-full
              text-gray-400
              transition-colors
              hover:bg-gray-100
              hover:text-gray-700
              disabled:pointer-events-none
              disabled:opacity-50
            "
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex flex-col items-center px-4 pb-6 pt-8">
            {/* Delete Icon */}
            <div
              className="
                mb-7
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                bg-gray-100
              "
            >
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-gray-200
                "
              >
                <Trash2 className="h-6 w-6 text-gray-700" />
              </div>
            </div>

            {/* Confirmation Message */}
            <p
              className="
                mb-8
                text-center
                text-sm
                font-medium
                leading-5
                text-gray-800
              "
            >
              {t('deleteConfirmation')}
            </p>

            {/* Actions */}
            <div className="flex w-full gap-2">
              {/* Cancel */}
              <Button
                type="button"
                variant="outline"
                disabled={deleteAddressMutation.isPending}
                onClick={handleCancelDelete}
                className="
                  h-8
                  flex-1
                  rounded-md
                  border-gray-300
                  bg-white
                  text-xs
                  font-medium
                  text-gray-800
                  shadow-none
                  hover:bg-gray-50
                "
              >
                {t('cancelDelete')}
              </Button>

              {/* Confirm */}
              <Button
                type="button"
                variant="destructive"
                isLoading={deleteAddressMutation.isPending}
                disabled={deleteAddressMutation.isPending}
                onClick={handleConfirmDelete}
                className="
                  h-8
                  flex-1
                  rounded-md
                  bg-red-600
                  text-xs
                  font-medium
                  text-white
                  shadow-none
                  hover:bg-red-700
                "
              >
                {t('confirmDelete')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
