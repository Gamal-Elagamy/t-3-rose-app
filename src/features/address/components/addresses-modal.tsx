'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Trash2, X } from 'lucide-react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils/tailwind-cn';

import { IAddress } from '../types/address';
import { useDeleteAddress } from '../hooks/use-delete-address';

import { AddressList } from './address-list';
import AddressStepper from './address-stepper';
import AddAddressDialog from './add-address-dialog';

type AddressView = 'list' | 'add' | 'edit';

interface AddressesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  addresses: IAddress[];
}

export default function AddressesModal({ open, onOpenChange, addresses }: AddressesModalProps) {
  // Translation
  const t = useTranslations('address');

  // Navigation
  const router = useRouter();

  // State
  const [view, setView] = useState<AddressView>('list');
  const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
  const [addressToDelete, setAddressToDelete] = useState<IAddress | null>(null);
  const [deletedAddressIds, setDeletedAddressIds] = useState<string[]>([]);

  // Mutation
  const deleteAddressMutation = useDeleteAddress();

  // Variables
  const visibleAddresses = addresses.filter((address) => !deletedAddressIds.includes(address.id));

  const isListView = view === 'list';
  const isFormView = view === 'add' || view === 'edit';
  const isDeleting = deleteAddressMutation.isPending;

  // Functions
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
    if (isDeleting) return;

    setAddressToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (!addressToDelete) return;

    deleteAddressMutation.mutate(addressToDelete.id, {
      onSuccess: () => {
        toast.success(t('deleted'));

        // Keep the deleted address hidden until the server data refreshes.
        setDeletedAddressIds((currentIds) => [...currentIds, addressToDelete.id]);

        setAddressToDelete(null);
        router.refresh();
      },

      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <>
      {/* Addresses Modal */}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          showCloseButton={false}
          className={cn(
            'w-[calc(100%-32px)] max-w-212.5 gap-0 overflow-hidden rounded-2xl bg-ds-bg-plain p-0 ring-0'
          )}
        >
          {/* Addresses List */}
          {isListView && (
            <>
              <DialogHeader className="flex flex-row items-center justify-between px-6 py-5 border-b border-ds-border-soft">
                <DialogTitle
                  className="
                    text-[26px]
                    font-bold
                    leading-none
                    text-ds-text-default
                  
                  "
                >
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

              <div className="flex-1 overflow-y-auto px-6 py-6">
                <AddressList
                  variant="modal"
                  addresses={visibleAddresses}
                  onAdd={handleAdd}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            </>
          )}

          {/* Add / Edit Address */}
          {isFormView && (
            <>
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
                <DialogTitle
                  className="
                    text-[26px]
                    font-bold
                    leading-none
                    text-ds-text-default
                  "
                >
                  {view === 'add' ? t('add.title') : t('edit')}
                </DialogTitle>
              </DialogHeader>

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
          if (!isOpen && !isDeleting) {
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
            bg-ds-bg-plain
            p-0
          "
        >
          {/* Close */}
          <button
            type="button"
            onClick={handleCancelDelete}
            disabled={isDeleting}
            aria-label={t('cancelDelete')}
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
              text-ds-text-muted
              transition-colors
              hover:bg-ds-bg-muted
              hover:text-ds-text-default
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
                bg-ds-bg-muted
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
                  bg-ds-border-soft
                "
              >
                <Trash2 className="h-6 w-6 text-ds-text-default" />
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
                text-ds-text-default
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
                disabled={isDeleting}
                onClick={handleCancelDelete}
                className="
                  h-8
                  flex-1
                  rounded-md
                  border-ds-border-soft
                  bg-ds-bg-plain
                  text-xs
                  font-medium
                  text-ds-text-default
                  shadow-none
                  hover:bg-ds-bg-muted
                "
              >
                {t('cancelDelete')}
              </Button>

              {/* Confirm */}
              <Button
                type="button"
                variant="destructive"
                isLoading={isDeleting}
                disabled={isDeleting}
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
